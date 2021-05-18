<template>
  <div class="login">
    <van-nav-bar
      title="登陆"
      safe-area-inset-top
      left-arrow
      @click-left="$router.push({ name: 'home' })"
    />
    <div class="ct">
      <h1 class="login__title">欢迎登陆新蜂商城</h1>
      <van-form @submit="onRegisterOrLogin">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="verificationCode"
          name="verificationCode"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <VerificationImg ref="verifyRef" />
          </template>
        </van-field>

        <p class="change-submit-type">
          <span @click="changeSubmitType">{{ register ? '已有账号？立即登陆' : '立即注册' }}</span>
        </p>

        <div style="margin: 16px">
          <van-button round block type="primary" color="#1baeae" native-type="submit">
            {{ register ? '注册' : '登陆' }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import VerificationImg from '/cpn/VerificationImg'
import { reactive, ref, toRefs } from 'vue'
import md5 from 'js-md5'
import { Toast } from 'vant'

import { loginRequest, registerRequest } from '/@/api/user'
import { setLocal } from '/@/utils'

export default {
  name: 'login',

  components: { VerificationImg },

  setup() {
    const state = reactive({
      username: '',
      password: '',
      verificationCode: '',
      register: false,
    })

    const verifyRef = ref(null)

    const changeSubmitType = () => {
      state.register = !state.register
      state.username = ''
      state.password = ''
      state.verificationCode = ''
      verifyRef.value.handDraw()
    }

    const onRegisterOrLogin = async (value) => {
      const { username, password, verificationCode } = value
      const imgCode = verifyRef.value.imgCode

      if (imgCode.toLocaleUpperCase() !== verificationCode.toLocaleUpperCase()) {
        Toast({ type: 'fail', message: '验证码有误！' })
        verifyRef.value.handDraw()
        return
      }

      const loginParams = { loginName: username, passwordMd5: md5(password) }
      const registerParams = { loginName: username, password }

      if (!state.register) {
        const { data } = await loginRequest(loginParams)

        setLocal('token', data)
        window.location.href = '/'
      }

      if (state.register) {
        await registerRequest(registerParams)

        Toast.success('注册成功！')
        verifyRef.value.handDraw()
        state.register = false
      }
    }

    return { ...toRefs(state), verifyRef, onRegisterOrLogin, changeSubmitType }
  },
}
</script>

<style lang="less" scoped>
@import '../../theme/mixin';

.login {
  &__title {
    text-align: center;
    .fc(20px, @primary);
  }

  .change-submit-type {
    padding: 0 16px;
    .fc(12px, @primary);
  }
}
</style>

<template>
  <div class="setting">
    <van-nav-bar
      title="账号管理"
      fixed
      safe-area-inset-top
      left-arrow
      @click-left="$router.back()"
    />

    <div class="setting-content">
      <van-field v-model="nickName" label="个人昵称" />
      <van-field v-model="introduceSign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
    </div>

    <div class="setting-opt">
      <van-button round color="#1baeae" @click="handSave" block>保存</van-button>
      <van-button round type="danger" @click="handLogout" block>退出登录</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { Dialog, Toast } from 'vant'
import md5 from 'js-md5'

import { userInfoRequest, userLogoutRequest, editUserInfoRequest } from '/@/api/user'
import { setLocal } from '/@/utils'

export default {
  name: 'setting',

  components: {},

  setup() {
    const state = reactive({
      nickName: '',
      introduceSign: '',
      password: '',
    })

    onMounted(() => {
      initMineDetail()
    })

    const initMineDetail = async () => {
      const { data } = await userInfoRequest()

      const { introduceSign, nickName } = data

      state.nickName = nickName
      state.introduceSign = introduceSign
    }
    const handSave = async () => {
      const params = {
        introduceSign: state.introduceSign,
        nickName: state.nickName,
      }
      if (state.password) {
        params.passwordMd5 = md5(state.password)
      }

      await editUserInfoRequest(params)
      Toast.success('保存成功')
    }

    const handLogout = () => {
      Dialog.confirm({ message: '确定退出？' }).then(async () => {
        const { resultCode } = await userLogoutRequest()

        if (resultCode === 200) {
          setLocal('token', '')
          window.location.href = '/home'
        }
      })
    }

    return {
      ...toRefs(state),
      handSave,
      handLogout,
    }
  },
}
</script>

<style lang="less" scoped>
.setting {
  &-content {
    margin-top: 46px;
  }

  &-opt {
    padding: 0 20px;
  }

  .van-button {
    margin: 10px 0;
  }
}
</style>

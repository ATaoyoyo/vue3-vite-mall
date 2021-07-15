<template>
  <div class="Header">
    <router-link tag="i" class="Header__menu" to="../../page/category">
      <van-icon name="wap-nav"></van-icon>
    </router-link>
    <div class="Header__search" @click="$router.push('/product-list?form=home')">
      <span class="Header__search__app-name">新蜂商城</span>
      <i class="divider" />
      <router-link tag="span" class="Header__search__title" to="/">
        山河无恙，人间皆安
      </router-link>
    </div>
    <router-link v-if="!isLogin" tag="a" class="Header__login" to="/login">
      <span>登陆</span>
    </router-link>
    <router-link v-else to="/mine" class="Header__login">
      <van-icon color="#fff" name="manager-o" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'

import { getLocal } from 'src/utils'

export default {
  name: 'Header',

  components: {},

  setup() {
    const state = reactive({
      isLogin: false,
    })

    onMounted(() => {
      const token = getLocal('token')

      state.isLogin = !!token
    })

    return { ...toRefs(state) }
  },
}
</script>

<style lang="less" scoped>
.Header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  top: 0;
  left: 0;
  right: 0;
  height: 35px;
  background: #1baeae;
  z-index: 99;

  &__menu {
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-size: 26px;
    font-weight: bold;
    color: #fff;
  }

  &__search {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.7);

    .divider {
      width: 1px;
      height: 15px;
      background: #333;
    }

    &__app-name {
      font-size: 20px;
      font-weight: bold;
      color: #1baeae;
    }

    &__title {
      font-size: 12px;
      font-weight: 400;
      color: #666;
    }
  }

  &__login {
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-size: 13px;
    color: #fff;

    i {
      font-size: 16px;
      line-height: 1.5;
    }
  }
}
</style>

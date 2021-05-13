<template>
  <div class="NavBar">
    <van-tabbar v-model="active" active-color="#1baeae">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="bars">分类</van-tabbar-item>
      <van-tabbar-item to="/shopCar" icon="shopping-cart-o" badge="5">购物车</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Toast } from 'vant'

export default {
  name: 'NavBar',

  components: {},

  setup() {
    const active = ref(0)

    return { active }
  },
}
</script>

<style lang="less" scoped>
.NavBar {
}
</style>

<template>
  <div class="NavBar">
    <van-tabbar v-model="active" active-color="#1baeae" route safe-area-inset-bottom>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="bars">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o" :badge="count ? count : ''">
        购物车
      </van-tabbar-item>
      <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { getLocal } from '/@/utils'

export default {
  name: 'NavBar',

  components: {},

  setup() {
    const store = useStore()
    const route = useRoute()

    const active = ref(0)

    const count = computed(() => {
      return store.state.cartCount.count
    })

    onMounted(async () => {
      const token = getLocal('token')
      const { path } = route

      if (token && !['/home', '/category'].includes(path)) {
        await store.dispatch('updateCart')
      }
    })

    return { active, count }
  },
}
</script>

<style lang="less" scoped>
.NavBar {
}
</style>

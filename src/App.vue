<template>
  <router-view class="router-view" v-slot="{ Component }">
    <!-- 开启顶部安全区适配 -->
    <van-nav-bar safe-area-inset-top />
    <transition :name="transitionName">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
    <NavBar v-if="show" />
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </router-view>
</template>

<script>
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

import NavBar from '/cpn/NavBar'

import { toRefs, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: { NavBar },

  setup() {
    const router = useRouter()

    const route = useRoute()

    const state = reactive({
      transitionName: 'slide-left',
    })

    const path = toRefs(route).path.value

    const show = computed(() => {
      const route = ['/', '/mine', '/home', '/category', '/cart']
      return route.includes(path)
    })

    router.beforeEach((to, from) => {
      if (to.meta.index > from.meta.index) {
        state.transitionName = 'slide-left'
      } else if (to.meta.index < from.meta.index) {
        state.transitionName = 'slide-right'
      } else {
        state.transitionName = ''
      }
    })

    return { ...toRefs(state), show }
  },
}
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.van-badge--fixed {
  z-index: 1000;
}
</style>

<template>
  <div class="home">
    <Header />
    <Swiper :list="swiperList" />
  </div>
</template>

<script>
import Header from '/view/Header'
import Swiper from '/cpn/Swiper'
import { onMounted, reactive, toRefs } from 'vue'

import { getHomeRequest } from '../../api/home'

export default {
  name: 'home',

  components: { Header, Swiper },

  setup() {
    const state = reactive({
      swiperList: [],
      recommends: [],
    })

    onMounted(async () => {
      const { data } = await getHomeRequest()
      const { carousels, hotGoodses, newGoodses, recommendGoodses } = data

      state.swiperList = carousels.map((item) => {
        return {
          id: item.carouselUrl,
          src: item.carouselUrl,
          url: item.redirectUrl,
        }
      })

      state.recommends = recommendGoodses

      console.log(carousels, hotGoodses, newGoodses, recommendGoodses)
    })

    return { ...toRefs(state) }
  },
}
</script>

<style lang="less" scoped>
.home {
}
</style>

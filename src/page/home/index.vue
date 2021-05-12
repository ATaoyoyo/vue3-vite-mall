<template>
  <div class="home">
    <Header />
    <div class="home-container">
      <Swiper :list="swiperList" />
      <Category :category-list="categoryList" />
      <van-skeleton title :row="3" :loading="loading">
        <GoodsList title="新品上线" :list="newGoods" />
      </van-skeleton>
      <van-skeleton title :row="3" :loading="loading">
        <GoodsList title="热门商品" :list="hotGoods" />
      </van-skeleton>
      <van-skeleton title :row="3" :loading="loading">
        <GoodsList title="最新推荐" :list="recommends" />
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import Header from '/cpn/Header'
import Swiper from '/cpn/Swiper'
import Category from '/cpn/Category'
import GoodsList from '/cpn/GoodsList'

import { getHomeRequest } from '/@/api/home'
import categoryList from '/@/data/category'

import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'home',

  components: { GoodsList, Header, Swiper, Category },

  setup() {
    const { ctx } = getCurrentInstance()
    const state = reactive({
      swiperList: [],
      recommends: [],
      categoryList: categoryList,
      newGoods: [],
      hotGoods: [],
      loading: true,
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

      state.newGoods = ctx.formatGoods(newGoodses)

      state.hotGoods = ctx.formatGoods(hotGoodses)

      state.recommends = ctx.formatGoods(recommendGoodses)

      state.loading = false
    })

    return { ...toRefs(state) }
  },

  methods: {
    formatGoods(goods) {
      return goods.map((item) => {
        const { goodsId, goodsCoverImg, goodsIntro, goodsName, sellingPrice, tag } = item

        return {
          id: goodsId,
          // src: this.$filter.prefix(goodsCoverImg),
          src: goodsCoverImg,
          name: goodsName,
          prince: sellingPrice,
          goodsIntro,
          tag,
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  &-container {
    margin-top: 45px;
  }
}
</style>

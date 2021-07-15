<template>
  <div class="home">
    <Header />
    <div class="home-container">
      <Swiper :list="swiperList" />
      <Category :category-list="categoryList" />
      <van-skeleton title :row="3" :loading="loading">
        <GoodsList title="新品上线" :list="newGoods" @on-goods-click="handToProduct" />
      </van-skeleton>
      <van-skeleton title :row="3" :loading="loading">
        <GoodsList title="热门商品" :list="hotGoods" @on-goods-click="handToProduct" />
      </van-skeleton>
      <van-skeleton title :row="3" :loading="loading">
        <GoodsList title="最新推荐" :list="recommends" @on-goods-click="handToProduct" />
      </van-skeleton>
    </div>

    <NavBar />
  </div>
</template>

<script lang="ts">
import Header from 'cpn/Header'
import Swiper from 'cpn/Swiper/index'
import Category from 'cpn/Category/index'
import GoodsList from 'cpn/GoodsList/index'
import NavBar from 'cpn/NavBar/index'

import {getHomeRequest} from 'api/home'
import categoryList from 'src/data/category'

import {getCurrentInstance, onMounted, reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'

export default {


  name: 'home',

  components: {GoodsList, Header, Swiper, Category, NavBar},

  setup() {
    const {ctx} = getCurrentInstance()
    const router = useRouter()
    const state = reactive({
      swiperList: [],
      recommends: [],
      categoryList: categoryList,
      newGoods: [],
      hotGoods: [],
      loading: true,
    })

    onMounted(async () => {
      const {data} = await getHomeRequest()
      const {carousels, hotGoodses, newGoodses, recommendGoodses} = data

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

    const handToProduct = (id: string) => {
      router.push({path: `/product/${id}`})
    }

    const formatGoods = (goods) => {
      return goods.map((item) => {
        const {goodsId, goodsCoverImg, goodsIntro, goodsName, sellingPrice, tag} = item

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
    }

    return {...toRefs(state), handToProduct}
  }
}
</script>

<style lang="less" scoped>
.home {
  &-container {
    margin-top: 45px;
    padding-bottom: 55px;

    .van-skeleton {
      margin-bottom: 20px;
      padding-top: 20px;
    }
  }
}
</style>

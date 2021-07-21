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

import categoryList from 'src/data/category'
import { getHomeRequest } from 'api/home'
import { ILink } from "src/data/category";

import { onMounted, reactive, toRefs, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

interface IGoods {
  goodsId: string
  goodsCoverImg: string
  goodsIntro: string
  goodsName: string
  sellingPrice: string
  tag: string
}

interface IGoodsRes {
  id: string
  src: string
  name: string
  prince: string
  goodsIntro: string
  tag: string
}

interface ICarousels {
  carouselUrl: string
  redirectUrl: string
}

interface IState {
  swiperList: []
  recommends: IGoodsRes[]
  categoryList: ILink[]
  newGoods: IGoodsRes[]
  hotGoods: IGoodsRes[]
  loading: boolean
}

export default defineComponent({
  name: 'home',

  components: { GoodsList, Header, Swiper, Category, NavBar },

  setup() {
    // const {ctx} = getCurrentInstance()
    const router = useRouter()
    const state = reactive<IState>({
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

      state.swiperList = carousels.map((item: ICarousels) => {
        return {
          id: item.carouselUrl,
          src: item.carouselUrl,
          url: item.redirectUrl,
        }
      })

      state.newGoods = formatGoods(newGoodses)

      state.hotGoods = formatGoods(hotGoodses)

      state.recommends = formatGoods(recommendGoodses)

      state.loading = false
    })

    const handToProduct = (id: string) => {
      router.push({ path: `/product/${id}` })
    }

    const formatGoods = (goods: IGoods[]) : IGoodsRes[] => {
      return goods.map((item: IGoods) => {
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
    }

    return { ...toRefs(state), handToProduct }
  }
})
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

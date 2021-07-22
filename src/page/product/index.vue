<template>
  <div class="product">
    <van-nav-bar
      title="商品详情"
      fixed
      left-arrow
      safe-area-inset-top
      @click-left="$router.back()"
    />

    <div class="product__content">
      <div class="product__content-img">
        <Swiper :list="productDetail.goodsCarouselList || []" />
      </div>
      <div class="product__content-desc">
        <div class="product__content-desc__title">
          <h3>{{ productDetail.goodsIntro || '' }}</h3>
          <h3>{{ productDetail.goodsName || '' }}</h3>
        </div>
        <div class="product__content-desc__params">
          <span>概述</span>
          <span>参数</span>
          <span>安装服务</span>
          <span>常见问题</span>
        </div>
        <div
          class="product__content-desc__pics"
          v-html="productDetail.goodsDetailContent || ''"
        ></div>
      </div>
    </div>

    <van-action-bar safe-area-inset-bottom>
      <van-action-bar-icon icon="chat-o" text="客服" @click="handService" />
      <van-action-bar-icon
        icon="cart-o"
        :badge="count ? count : ''"
        text="购物车"
        @click="$router.push({ name: 'cart' })"
      />
      <van-action-bar-button type="warning" text="加入购物车" @click="handToAddCart" />
      <van-action-bar-button type="danger" text="立即购买" @click="handToBuy" />
    </van-action-bar>
  </div>
</template>

<script lang="ts">
import Swiper from 'cpn/Swiper'

import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, reactive, toRefs, defineComponent } from 'vue'

import { productDetail } from 'api/product'
import { addCartRequest } from 'api/cart'
import { Toast } from 'vant'

export default defineComponent({
  name: 'product',

  components: { Swiper },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      productDetail: { goodsId: '' },
    })

    const count = computed(() => {
      return store.state.cartCount.count
    })

    onMounted(async () => {
      const { id } = route.params

      const { data } = await productDetail(id as string)

      data.goodsCarouselList = data.goodsCarouselList.map((item: any, index: number) => {
        console.log(item);
        return { src: item, id: index, url: '' }
      })

      state.productDetail = data
      await store.dispatch('updateCart')
    })

    const handService = () => {
      Toast('建设中！')
    }

    const handToAddCart = async () => {
      const { resultCode } = await addCartRequest({
        goodsCount: 1,
        goodsId: state.productDetail.goodsId,
      })

      if (resultCode === 200) Toast.success('添加成功！')

      await store.dispatch('updateCart')
    }

    const handToBuy = async () => {
      await addCartRequest({ goodsCount: 1, goodsId: state.productDetail.goodsId })

      await store.dispatch('updateCart')

      await router.push({ name: 'cart' })
    }

    return { ...toRefs(state), handToAddCart, handService, handToBuy, count }
  },
})
</script>

<style lang="less" scoped>
@import '../../theme/mixin';

.product {
  &__content {
    padding: 46px 0;

    &-img {
      img {
        width: 100%;
      }
    }

    &-desc {
      padding: 10px;

      &__title {
        .fc(14px, #333);

        h3 {
          margin: 0;
          padding: 2px 0;
          line-height: 20px;
          font-weight: normal;
        }
      }

      &__params {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding: 0 10px;

        span {
          flex: 1;
          .fc(12px, #333);
          text-align: center;
          border-right: 1px solid #ddd;

          &:first-child {
            border-left: 1px solid #ddd;
          }
        }
      }

      &__pics {
        padding: 0 20px;

        img {
          width: 100%;
        }
      }
    }
  }

  .van-action-bar-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }

  .van-action-bar-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
</style>

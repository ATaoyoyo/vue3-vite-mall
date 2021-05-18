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
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" badge="6" text="购物车" />
      <van-action-bar-button type="warning" text="加入购物车" />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script>
import Swiper from '/cpn/Swiper'

import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'

import { productDetail } from '/@/api/product'

export default {
  name: 'product',

  components: { Swiper },

  setup() {
    const route = useRoute()

    const state = reactive({
      productDetail: {},
    })

    onMounted(async () => {
      const { id } = route.params

      const { data } = await productDetail(id)

      data.goodsCarouselList = data.goodsCarouselList.map((item, index) => {
        return { src: item, id: index, url: '' }
      })

      state.productDetail = data
    })

    return { ...toRefs(state) }
  },
}
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

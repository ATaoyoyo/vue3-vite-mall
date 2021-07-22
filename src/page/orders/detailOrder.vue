<template>
  <div class="order-detail">
    <van-nav-bar
      title="订单详情"
      fixed
      left-arrow
      @click-left="$router.back()"
      safe-area-inset-top
    />
    <div class="order-detail__info first">
      <p class="order-detail__info-text">
        <span class="order-detail__info-text-label">订单状态:</span>
        <span class="order-detail__info-text-value">{{ orderDetail.orderStatusString }}</span>
      </p>
      <p class="order-detail__info-text">
        <span class="order-detail__info-text-label">订单编号:</span>
        <span class="order-detail__info-text-value">{{ orderDetail.orderNo }}</span>
      </p>
      <p class="order-detail__info-text">
        <span class="order-detail__info-text-label">下单时间:</span>
        <span class="order-detail__info-text-value">{{ orderDetail.createTime }}</span>
      </p>
    </div>
    <div class="order-detail__info">
      <p class="order-detail__info-text">
        <span class="order-detail__info-text-label">商品金额:</span>
        <span class="order-detail__info-text-value">
          {{ orderDetail.totalPrice && orderDetail.totalPrice.toFixed(2) }}
        </span>
      </p>
      <p class="order-detail__info-text">
        <span class="order-detail__info-text-label">配送方式:</span>
        <span class="order-detail__info-text-value">普通快递</span>
      </p>
    </div>
    <div class="order-detail__card">
      <van-card
        v-for="item in orderDetail.newBeeMallOrderItemVOS"
        :key="item.goodsId"
        :num="item.goodsCount"
        :price="item.sellingPrice.toFixed(2)"
        :title="item.goodsName"
        :thumb="$filter.prefix(item.goodsCoverImg)"
        tag="促销"
        desc="全场包邮"
      />
    </div>

    <div class="order-detail__opt">
      <van-button
        v-if="orderDetail.orderStatus === 0"
        style="margin-bottom: 10px"
        color="#1baeae"
        block
        @click="handPay"
      >
        去支付
      </van-button>
      <van-button
        v-if="!(orderDetail.orderStatus < 0 || orderDetail.orderStatus === 4)"
        block
        type="danger"
        @click="handleCancelOrder(orderDetail.orderNo)"
      >
        取消订单
      </van-button>
    </div>

    <!--支付-->
    <van-popup v-model:show="showPay" position="bottom" :style="{ height: '24%' }">
      <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
        <van-button
          :style="{ marginBottom: '10px' }"
          color="#1989fa"
          block
          @click="handlePayOrder(orderDetail.orderNo, 1)"
        >
          支付宝支付
        </van-button>
        <van-button color="#4fc08d" block @click="handlePayOrder(orderDetail.orderNo, 2)"
        >微信支付
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { Dialog, Toast } from 'vant'

import { queryOrderDetailRequest, cancelOrderRequest, payOrderRequest } from 'api/order'

export default {
  name: 'order-detail',

  components: {},

  setup() {
    const route = useRoute()

    const state = reactive({
      orderDetail: {},
      showPay: false,
    })

    onMounted(() => {
      initOrderDetail()
    })

    const initOrderDetail = async () => {
      const { id } = route.query

      const { data } = await queryOrderDetailRequest(id as string)

      state.orderDetail = data
    }

    const handPay = () => {
      state.showPay = true
    }

    const handleCancelOrder = (id: string) => {
      Dialog.confirm({ title: '确定取消订单？' }).then(async () => {
        const { resultCode } = await cancelOrderRequest(id)

        resultCode === 200 ? Toast('订单取消成功！') : Toast.fail('订单取消失败！')

        await initOrderDetail()
      })
    }

    const handlePayOrder = async (id: string, type: string) => {
      state.showPay = false
      Toast.loading({ message: '支付中...' })
      const params = { orderNo: id, payType: type }
      const { resultCode } = await payOrderRequest(params)

      setTimeout(async () => {
        Toast.clear()

        resultCode === 200 ? Toast('支付成功！') : Toast.fail('支付失败！')

        await initOrderDetail()
      }, 1500)
    }

    return {
      ...toRefs(state),
      handPay,
      handleCancelOrder,
      handlePayOrder,
    }
  },
}
</script>

<style lang="less" scoped>
.order-detail {
  background-color: #f7f7f7;

  &__info {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #fff;

    &.first {
      margin-top: 46px;
    }

    &-text {
      font-size: 16px;
      color: #333333;

      &-label {
        margin-right: 3px;
        color: #949494;
      }
    }
  }

  &__opt {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    background-color: #f7f7f7;
  }

  .van-card {
    margin: 0;
    border-bottom: 1px solid #eee;
    background-color: #fff;
  }
}
</style>

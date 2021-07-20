<template>
  <div class="orders">
    <van-nav-bar title="订单" safe-area-inset-top left-arrow @click-left="$router.back()" />

    <!--{ address.provinceName }} {{ address.cityName }} {{ address.regionName }} {{ address.detailAddress }}-->
    <van-contact-card
      type="edit"
      :name="address.userName"
      :tel="address.userPhone"
      @click="handEditAddress"
    />

    <van-card
      v-for="item in cartList"
      :num="item.goodsCount"
      :price="item.sellingPrice.toFixed(2)"
      :desc="item.goodsName"
      :title="item.goodsName"
      :thumb="item.goodsCoverImg"
      :origin-price="(item.sellingPrice + 500).toFixed(2)"
    />

    <div class="orders__total">
      <p class="orders__total-price">
        <span>商品总额：</span>
        <span>¥{{ computedTotalPrice }}</span>
      </p>

      <van-button block round color="#1baeae" @click="handCreateOrder">生成订单</van-button>
    </div>

    <van-popup
      v-model:show="showPay"
      position="bottom"
      closeable
      :close-on-click-overlay="false"
      :style="{ height: '30%' }"
      @close="handClosePopup"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="handPayOrder(1)"
          >支付宝支付
        </van-button>
        <van-button color="#4fc08d" block @click="handPayOrder(2)">微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

import { queryBuyCartItemIds } from 'api/cart'
import { queryDefaultAddressRequest, queryAddressDetailRequest } from 'api/address'
import { getLocal, setLocal } from 'src/utils'
import { createOrderRequest, payOrderRequest } from 'api/order'

export default {
  name: 'orders',

  components: {},

  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      address: {},
      cartList: [],
      orderNo: '',
      showPay: false,
    })

    onMounted(() => {
      initOrder()
    })

    const computedTotalPrice = computed(() => {
      let price = 0
      state.cartList.forEach((item) => {
        price += item.sellingPrice * item.goodsCount
      })

      return price.toFixed(2)
    })

    const initOrder = async () => {
      Toast.loading({ message: '加载中...', forbidClick: true })

      const { cartItemIds, addressId } = route.query

      const _cartItemIds = cartItemIds
        ? JSON.parse(cartItemIds)
        : JSON.parse(getLocal('cartItemIds'))

      setLocal('cartItemIds', JSON.stringify(_cartItemIds))

      const { data: list } = await queryBuyCartItemIds({ cartItemIds: _cartItemIds.join(',') })
      const { data: address } = addressId
        ? await queryAddressDetailRequest(addressId)
        : await queryDefaultAddressRequest()

      if (!address) {
        Toast.loading({ message: '请先添加地址！', forbidClick: true })
        await router.push({ name: 'address' })
        Toast.clear()
        return
      }

      state.address = address
      state.cartList = list

      Toast.clear()
    }

    const handEditAddress = () => {
      router.push({ name: 'address' })
    }

    const handCreateOrder = async () => {
      const params = {
        addressId: state.address.addressId,
        cartItemIds: state.cartList.map(({ cartItemId }) => cartItemId),
      }

      const { data } = await createOrderRequest(params)

      setLocal('cartItemIds', '')
      state.orderNo = data
      state.showPay = true
    }

    const handPayOrder = async (type) => {
      const params = { orderNo: state.orderNo, payType: type }
      await payOrderRequest(params)

      Toast.success('支付成功！')

      setTimeout(() => {
        router.push({ name: 'mine-order' })
      }, 1500)
    }

    const handClosePopup = () => {
      router.push({ name: 'mine-order' })
    }

    return {
      ...toRefs(state),
      handEditAddress,
      handPayOrder,
      handClosePopup,
      handCreateOrder,
      computedTotalPrice,
    }
  },
}
</script>

<style lang="less" scoped>
.orders {
  background-color: #eeeeee;

  .van-card {
    box-shadow: 0 -1px 1px 10px 10px #333;
    background-color: #fff;
  }

  &__total {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    background-color: #fff;

    &-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0 20px 0;
      text-align: right;
      //font-size: 18px;
      color: #333;

      span {
        &:last-child {
          font-weight: bold;
          color: #f60;
        }
      }
    }
  }
}
</style>

<style>
.van-card__price {
  color: #f60;
}
</style>

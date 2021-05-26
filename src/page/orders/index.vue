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

      <van-button block round color="#1baeae">生成订单</van-button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

import { queryBuyCartItemIds } from '/@/api/cart'
import { queryDefaultAddressRequest, queryAddressDetailRequest } from '/@/api/address'
import { getLocal, setLocal } from '/@/utils'

export default {
  name: 'orders',

  components: {},

  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      address: {},
      cartList: [],
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

    return { ...toRefs(state), handEditAddress, computedTotalPrice }
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

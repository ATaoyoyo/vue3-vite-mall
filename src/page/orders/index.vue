<template>
  <div class="orders">
    <van-nav-bar title="订单" safe-area-inset-top left-arrow @click-left="$router.back()" />
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

import { queryBuyCartItemIds } from '/@/api/cart'
import { queryDefaultAddress, queryAddressDetail } from '/@/api/address'
import { getLocal, setLocal } from '/@/utils'

export default {
  name: 'orders',

  components: {},

  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      addressList: {},
      cartList: [],
    })

    onMounted(() => {
      initOrder()
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
        ? await queryAddressDetail(addressId)
        : await queryDefaultAddress()

      if (!address) {
        Toast.loading({ message: '请先添加地址！', forbidClick: true })
        await router.push({ name: 'address' })
        Toast.clear()
        return
      }

      state.addressList = address
      state.cartList = list

      Toast.clear()
      console.log(_cartItemIds, list, address)
    }
  },
}
</script>

<style lang="less" scoped>
.orders {
}
</style>

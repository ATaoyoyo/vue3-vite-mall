<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <van-empty
      class="empty"
      v-if="cartList.length === 0"
      image="https://s.yezgea02.com/1604028375097/empty-car.png"
      description="购物车空空如也"
    >
      <van-button to="/home" round color="#1baeae">去逛逛</van-button>
    </van-empty>

    <template v-else>
      <van-checkbox-group class="cart__goods-content" v-model="checkedGoods">
        <van-swipe-cell
          class="cart__goods-content-item"
          v-for="item in cartList"
          :key="item.cartItemId"
        >
          <div class="cart__goods-item">
            <div class="cart__goods-item-check">
              <van-checkbox :name="item.cartItemId" checked-color="#1baeae" />
            </div>

            <div class="cart__goods-item-card">
              <van-card
                :num="item.goodsCount"
                :price="item.sellingPrice.toFixed(2)"
                :desc="item.goodsName"
                :title="item.goodsName"
                :thumb="$filter.prefix(item.goodsCoverImg)"
              >
                <template #footer>
                  <van-stepper
                    v-model="item.goodsCount"
                    :name="item.cartItemId"
                    :min="1"
                    :max="5"
                    @change="handChangeGoodsCount"
                  />
                </template>
              </van-card>
            </div>
          </div>

          <template #right>
            <van-button
              @click="handDeleteGoods(item.cartItemId)"
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>

      <van-submit-bar
        class="submit-bar"
        :price="totalPrice"
        button-text="提交订单"
        @submit="handSubmit"
      >
        <van-checkbox v-model="checkedAll" checked-color="#1baeae" @click="handChangeCheckedAll">
          全选
        </van-checkbox>
      </van-submit-bar>
    </template>

    <NavBar />
  </div>
</template>

<script lang="ts">
import NavBar from 'cpn/NavBar'
import { computed, onMounted, reactive, toRefs } from 'vue'

import { getCartRequest, modifyGoodsRequest, deleteGoodsRequest } from 'api/cart'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'cart',

  components: { NavBar },

  setup() {
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      checkedGoods: [],
      cartList: [],
      checkedAll: false,
    })

    onMounted(() => {
      initCartData()
    })

    const totalPrice = computed(() => {
      let price = 0
      const checkedList = state.cartList.filter((item) => {
        return state.checkedGoods.includes(item.cartItemId)
      })

      checkedList.forEach((item) => {
        price += item.sellingPrice * item.goodsCount
      })

      return price * 100
    })

    const initCartData = async () => {
      Toast.loading({ message: '加载中...', forbidClick: true })
      const { data } = await getCartRequest({ pageNumber: 1 })

      state.cartList = data

      Toast.clear()
    }

    const handChangeGoodsCount = async (val, { name }) => {
      const cartItem = state.cartList.filter(({ cartItemId }) => cartItemId === name)

      if (!(cartItem[0] && cartItem[0].goodsCount === val)) return

      Toast.loading({ message: '正在调整...', forbidClick: true })

      const params = { cartItemId: name, goodsCount: val }

      await modifyGoodsRequest(params)

      state.cartList.forEach((item) => {
        if (item.cartItemId === name) {
          item.goodsCount = val
        }
      })

      Toast.clear()
    }

    const handChangeCheckedAll = () => {
      if (state.checkedAll) {
        state.checkedGoods = state.cartList.map(({ cartItemId }) => cartItemId)
      } else {
        state.checkedGoods = []
      }
    }

    const handDeleteGoods = async (id) => {
      await deleteGoodsRequest(id)

      await store.dispatch('updateCart')

      await initCartData()
    }

    const handSubmit = async () => {
      if (state.checkedGoods.length === 0) {
        Toast.fail('请先选择需要购买的商品～')
        return
      }

      const params = JSON.stringify(state.checkedGoods)
      await router.push({ name: 'create-order', query: { cartItemIds: params } })
    }

    return {
      ...toRefs(state),
      handChangeGoodsCount,
      handSubmit,
      handDeleteGoods,
      handChangeCheckedAll,
      totalPrice,
    }
  },
}
</script>

<style lang="less" scoped>
.cart {
  padding: 10px;
  box-sizing: border-box;

  &__goods-content {
    margin-top: 46px;
    padding-bottom: 100px;
  }

  &__goods-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    overflow: hidden;

    &-check {
      margin-right: 10px;
    }

    &-card {
      flex: 1;
      display: inline-block;
      margin-right: 10px;
      border-radius: 10px;
      overflow: hidden;
    }
  }

  .delete-button {
    height: 100%;
    border-radius: 10px;
  }

  .submit-bar {
    margin-bottom: 51px;
  }

  .empty {
    margin-top: 180px;

    .van-button {
      width: 220px;
    }
  }
}
</style>

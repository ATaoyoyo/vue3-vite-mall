<template>
  <div class="mine-order">
    <van-nav-bar title="我的订单" fixed left-arrow @click-left="handBack" safe-area-inset-top />
    <van-tabs v-model:active="active" @click="handChangeTab">
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>

    <div class="mine-order-box">
      <van-pull-refresh v-model="loading" @refresh="handRefresh">
        <!--        <van-list-->
        <!--          v-model:loading="listLoading"-->
        <!--          :finished="finished"-->
        <!--          finished-text="没有更多了"-->
        <!--          @load="handLoad"-->
        <!--        >-->
        <div
          class="mine-order__box"
          v-for="item in orderList"
          :key="item.orderNo"
          @click="handToDetail(item.orderNo)"
        >
          <div class="mine-order__box-title">
            <span>订单时间：{{ item.createTime }}</span>
            <span>{{ item.orderStatusString }}</span>
          </div>
          <div class="mine-order__box-content">
            <van-card
              v-for="goods in item.newBeeMallOrderItemVOS"
              :key="goods.goodsId"
              :num="goods.goodsCount"
              :price="goods.sellingPrice.toFixed(2)"
              :desc="goods.goodsName"
              :title="goods.goodsName"
              :thumb="goods.goodsCoverImg"
              :origin-price="(goods.sellingPrice + 500).toFixed(2)"
            />
          </div>
        </div>
        <!--        </van-list>-->
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'

import { queryOrderListRequest } from 'api/order'
import { useRouter } from 'vue-router'

export default {
  name: 'mine-order',

  components: {},

  setup() {
    const router = useRouter()

    const state = reactive({
      active: '',
      loading: false,
      listLoading: false,
      finished: false,
      page: 1,
      status: '',
      orderList: [],
    })

    onMounted(async () => {
      await initOrderList()
    })

    const initOrderList = async () => {
      const params = { pageNumber: state.page, status: state.status }

      const { data } = await queryOrderListRequest(params)

      const { list } = data

      state.loading = false
      state.listLoading = false
      state.finished = true

      state.orderList = list
    }

    const handRefresh = () => {
      state.loading = true
      initOrderList()
    }

    const handLoad = () => {
      state.listLoading = true
      initOrderList()
    }

    const handChangeTab = (name) => {
      state.status = name
      handRefresh()
    }

    const handToDetail = (id) => {
      router.push({ name: 'detail-order', query: { id } })
    }

    const handBack = () => {
      router.push({ name: 'mine' })
    }

    return { ...toRefs(state), handBack, handChangeTab, handRefresh, handLoad, handToDetail }
  },
}
</script>

<style lang="less" scoped>
.mine-order {
  &-box {
    position: absolute;
    top: 90px;
    overflow: hidden;
    left: 0;
    right: 0;
  }

  .van-tabs {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .van-pull-refresh {
    padding-bottom: 100px;
    min-height: calc(100vh - 80px);
  }

  &__box {
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: #fbfbfb;

    &-title {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 13px;
      border-bottom: 1px dashed #fff;
    }
  }
}
</style>

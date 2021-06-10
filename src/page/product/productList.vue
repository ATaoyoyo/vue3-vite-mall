<template>
  <div class="product-list">
    <div class="product-list__nav">
      <van-icon @click="$router.back()" class="product-list__nav__icon" name="arrow-left" />
      <van-search
        class="product-list__nav__input"
        v-model="search"
        placeholder="请输入搜索关键词"
        @search="handSearch"
      />
      <van-button
        class="product-list__nav__button"
        color="#1baeae"
        size="mini"
        type="primary"
        @click="handSearch"
      >
        搜索
      </van-button>
      <!--      <van-field class="product-list__nav__input" v-model="search" />-->
    </div>

    <van-tabs v-model:active="active">
      <van-tab title="推荐"></van-tab>
      <van-tab title="新品"></van-tab>
      <van-tab title="价格"></van-tab>
    </van-tabs>

    <img class="empty" src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="搜索" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'product-list',

  components: {},

  setup() {
    const state = reactive({
      search: '',
      orderBy: '',
      page: '',
      categoryId: '',
      active: '',
    })

    const getSearch = async () => {
      const params = {
        pageNumber: state.page,
        goodsCategoryId: categoryId,
        keyword: state.search,
        orderBy: state.orderBy,
      }
      const data = await querySearch()
    }

    const handSearch = () => {}

    return { ...toRefs(state), handSearch }
  },
}
</script>

<style lang="less" scoped>
.product-list {
  position: relative;

  &__nav {
    //position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //height: 45px;
    border-bottom: 1px solid #eeeeee;

    &__input {
      flex: 2;
    }

    &__icon {
      font-size: 20px;
      color: #333333;
    }
  }

  /deep/ .van-tabs--line .van-tabs__wrap {
    height: 30px;
  }

  /deep/ .van-tabs {
    margin: 10px;
    border-radius: 3px;
    border: 1px solid #1baeae;
    overflow: hidden;

    .van-tab {
      &:nth-child(2n) {
        border-left: 1px solid #1baeae;
        border-right: 1px solid #1baeae;
      }
    }
  }

  /deep/ .van-tab--active {
    color: #fff;
    background-color: #1baeae;
  }

  /deep/ .van-tabs__line {
    background-color: transparent;
  }

  .empty {
    display: block;
    width: 150px;
    margin: 50px auto 20px;
  }
}
</style>

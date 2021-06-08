<template>
  <div class="product-list">
    <div class="product-list__nav">
      <van-icon class="product-list__nav__icon" name="arrow-left" />
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
        icon="search"
        type="primary"
        @click="handSearch"
      >
        搜索
      </van-button>
      <!--      <van-field class="product-list__nav__input" v-model="search" />-->
    </div>
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
}
</style>

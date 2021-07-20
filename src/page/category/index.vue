<template>
  <div class="category">
    <van-nav-bar fixed title="商品分类" />

    <van-tree-select
      v-model:active-id="categoryId"
      v-model:main-active-index="categoryIndex"
      :items="category"
      @click-nav="handClickCategory"
    >
      <template #content v-if="category.length > 0">
        <div
          class="category-content"
          v-for="item in category[categoryIndex].children"
          :key="item.categoryId"
        >
          <h3 class="category-title">{{ item.text }}</h3>
          <div class="category-goods">
            <div class="category-goods-item" v-for="child in item.children" :key="child.categoryId">
              <van-icon name="cart-circle-o" class="category-goods-item-icon" />
              <span class="category-goods-item-text">{{ child.text }}</span>
            </div>
            <div></div>
          </div>
        </div>
      </template>
    </van-tree-select>

    <NavBar />
  </div>
</template>

<script lang="ts">
import NavBar from 'cpn/NavBar'

import { queryCategoryRequest } from 'api/product'
import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'category',

  components: { NavBar },

  setup() {
    const state = reactive({
      category: [],
      categoryId: 1,
      categoryIndex: 0,
    })

    onMounted(() => {
      getCategory()
    })

    const getCategory = async () => {
      const { data } = await queryCategoryRequest()

      state.category = formatCategory(data)

      console.log(state.category[0])
    }

    const handClickCategory = (index) => {
      state.categoryIndex = index
    }

    const formatCategory = (category) => {
      if (!Array.isArray(category)) return
      return category.map((item) => {
        return {
          text: item.categoryName,
          id: item.categoryId,
          categoryLevel: item.categoryLevel,
          children: formatCategory(item.secondLevelCategoryVOS || item.thirdLevelCategoryVOS),
        }
      })
    }

    return { ...toRefs(state), handClickCategory }
  },
}
</script>

<style lang="less" scoped>
.category {
  position: relative;
  height: 100%;

  .van-tree-select {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    height: 100% !important;
  }

  .van-tree-select__content {
    .category-content {
      &:last-child {
        margin-bottom: 150px;
      }
    }
  }

  .category-title {
    margin: 0;
    padding: 10px;
    text-align: center;
    color: #1baeae;
    border-bottom: 1px solid #eee;
  }

  .category-goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    height: 100% !important;

    &-item {
      margin-bottom: 10px;
      padding: 5px;
      width: 28%;
      text-align: center;
      border-radius: 5px;

      &:hover {
        background-color: #f9f9f9;
      }

      .van-icon {
        font-size: 35px;
        color: #1baeae;
      }

      &-text {
        display: block;
        text-align: center;
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>

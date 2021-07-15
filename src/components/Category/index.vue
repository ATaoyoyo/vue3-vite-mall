<template>
  <div class="Category">
    <div class="Category-item" v-for="item in categoryList" :key="item.id" @click="handShowTip">
      <img :src="item.src" :alt="item.name" />
      <span class="Category-item-name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Toast} from 'vant'
import {defineComponent, SetupContext} from "vue";

export default defineComponent({
  name: 'Category',

  emits: ['on-category-item-click'],

  props: {
    categoryList: {
      type: Array,
      default: [],
      required: true,
    },
  },

  components: { [Toast.name]: Toast },

  setup(props, { emit }: SetupContext) {
    const handShowTip = () => {
      Toast('敬请期待！')
      emit('on-category-item-click')
    }

    return { handShowTip }
  },
})
</script>

<style lang="less" scoped>
.Category {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    width: 20%;
    //padding: 5px;

    img {
      width: 35px;
      height: 35px;
    }

    &-name {
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>

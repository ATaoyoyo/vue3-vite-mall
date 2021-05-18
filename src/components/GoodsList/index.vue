<template>
  <div class="GoodsList">
    <p class="GoodsList__title">{{ title }}</p>
    <div class="GoodsList__item">
      <GoodsItem v-for="item in list" :key="item.id" :info="item" @on-to-product="handToProduct" />
    </div>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: 'GoodsList',

  emits: ['on-goods-click'],

  props: {
    title: {
      type: String,
      default: 'title',
    },
    list: {
      type: Array,
      default: [
        {
          src: '',
          name: '',
          prince: '',
        },
      ],
    },
  },

  components: { GoodsItem },

  setup(prop, { emit }) {
    const handToProduct = (id) => {
      emit('on-goods-click', id)
    }

    return { handToProduct }
  },
}
</script>

<style lang="less" scoped>
@import '../../theme/mixin';

.GoodsList {
  &__title {
    margin: 0;
    padding: 15px 0;
    .wh(100%, 20px);
    .fc(16px, @primary);
    text-align: center;
    font-weight: bold;
    background-color: #eee;
  }

  &__item {
    .fj(flex-start);
    padding: 0 10px;
    flex-wrap: wrap;

    .GoodsItem {
      width: 50%;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;

      &:nth-child(2n - 1) {
        border-right: 1px solid #eeeeee;
      }
    }
  }
}
</style>

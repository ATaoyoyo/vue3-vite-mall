<template>
  <div class="GoodsItem" @click="handToProduct">
    <img :src="$filter.prefix(info.src)" :alt="info.name" />
    <div class="GoodsItem__desc">
      <p class="GoodsItem__desc-name">{{ info.name }}</p>
      <p class="GoodsItem__desc-prince">¥ {{ info.prince }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',

  emits: ['on-to-product'],

  props: {
    info: {
      type: Object,
      default: () => {
        return {
          src: '',
          name: '',
          prince: '',
        }
      },
    },
  },

  components: {},

  computed: {
    formatSrc() {
      return (src) => (src ? this.$filter.prefix(src) : '')
    },
  },

  setup(prop, { emit }) {
    const handToProduct = () => {
      emit('on-to-product', prop.info.id)
    }

    return { handToProduct }
  },
}
</script>

<style lang="less" scoped>
@import '../../../theme/mixin';

.GoodsItem {
  padding: 10px 0;
  .wh(100%, 200px);
  //.fj();
  //flex-direction: column;
  background: @fc;

  img {
    display: block;
    margin: 0 auto;
    width: 120px;
  }

  &__desc {
    &-name {
      margin: 3px;
      text-align: center;
      padding: 0 10px;
      .fc(14px, #333);
    }

    &-prince {
      text-align: center;
      .fc(14px, @primary);
    }
  }
}
</style>

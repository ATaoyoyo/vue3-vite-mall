<template>
  <van-swipe class="Swiper" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in list" :key="item.id">
      <img :src="item.src" alt="" @click="handToPage(item.url)" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'Swiper',

  props: {
    list: {
      type: Array,
      default: [],
      isRequire: true,
    },
  },

  components: {},

  setup() {},

  methods: {
    handToPage(url) {
      window.open(url)
    },
  },
}
</script>

<style lang="less" scoped>
.Swiper {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

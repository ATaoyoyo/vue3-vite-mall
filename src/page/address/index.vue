<template>
  <div class="address">
    <van-nav-bar title="地址管理" safe-area-inset-top left-arrow @click-left="$router.back()" />

    <div class="address__content">
      <van-button class="address-btn" color="#1baeae" round @click="handIncremenAddress"
        >新增地址</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'address',

  components: {},

  setup() {},
}
</script>

<style lang="less" scoped>
.address {
  &__content {
    padding: 10px;

    .address-btn {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 10px;
      margin: 0 auto;
      width: 90%;
    }
  }
}
</style>

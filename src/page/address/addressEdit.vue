<template>
  <div class="address-edit">
    <van-address-edit :area-list="areaList" show-postal show-set-default @save="handSaveAddress" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'address-edit',

  components: {},

  setup() {
    const state = reactive({
      areaList: {},
    })

    const handSaveAddress = async () => {}

    return { ...toRefs(state), handSaveAddress }
  },
}
</script>

<style lang="less" scoped>
.address-edit {
}
</style>

<template>
  <div class="address-edit">
    <van-nav-bar title="编辑地址" safe-area-inset-top left-arrow @click-left="$router.back()" />
    <van-address-edit :area-list="areaList" show-set-default @save="handSaveAddress" />
  </div>
</template>

<script>
import { tdist } from '../../data/address'

import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'address-edit',

  components: {},

  setup() {
    const state = reactive({
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
    })

    onMounted(() => {
      initCountry()
    })

    const initCountry = () => {
      // 省市区列表构造
      let _province_list = {}
      let _city_list = {}
      let _county_list = {}
      tdist.getLev1().forEach((p) => {
        _province_list[p.id] = p.text
        tdist.getLev2(p.id).forEach((c) => {
          _city_list[c.id] = c.text
          tdist.getLev3(c.id).forEach((q) => (_county_list[q.id] = q.text))
        })
      })
      state.areaList.province_list = _province_list
      state.areaList.city_list = _city_list
      state.areaList.county_list = _county_list
    }

    const handSaveAddress = async (val) => {
      console.log(val)
    }

    return { ...toRefs(state), handSaveAddress }
  },
}
</script>

<style lang="less" scoped>
.address-edit {
}
</style>

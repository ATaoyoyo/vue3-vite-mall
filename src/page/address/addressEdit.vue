<template>
  <div class="address-edit">
    <van-nav-bar title="编辑地址" safe-area-inset-top left-arrow @click-left="$router.back()" />
    <van-address-edit
      show-set-default
      :area-list="areaList"
      :show-delete="type === 'edit'"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="handSaveAddress"
      @delete="handDeleteAddress"
    />
  </div>
</template>

<script lang="ts">
import { tdist } from '../../data/address'

import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  queryAddressDetailRequest,
  addAddressRequest,
  editAddressRequest,
  deleteAddressRequest,
} from 'api/address'
import { Toast } from 'vant'

export default {
  name: 'address-edit',

  components: {},

  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      searchResult: [],
      addressId: '',
      addressInfo: {},
      type: 'add',
      from: route.query.from,
    })

    onMounted(() => {
      initCountry()
      initParams()
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

    const initParams = async () => {
      const { addressId, type, from } = route.query

      state.addressId = addressId
      state.type = type
      state.from = from || ''

      if (type === 'edit') {
        const { data: addressDetail } = await queryAddressDetailRequest(addressId)
        let _areaCode = ''
        const province = tdist.getLev1()
        Object.entries(state.areaList.county_list).forEach(([id, text]) => {
          // 先找出当前对应的区
          if (text === addressDetail.regionName) {
            // 找到区对应的几个省份
            const provinceIndex = province.findIndex(
              (item) => item.id.substr(0, 2) === id.substr(0, 2)
            )
            // 找到区对应的几个市区
            // eslint-disable-next-line no-unused-vars
            const cityItem = Object.entries(state.areaList.city_list).filter(
              ([cityId, cityName]) => cityId.substr(0, 4) === id.substr(0, 4)
            )[0]
            // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
            if (
              province[provinceIndex].text === addressDetail.provinceName &&
              cityItem[1] === addressDetail.cityName
            ) {
              _areaCode = id
            }
          }
        })
        state.addressInfo = {
          id: addressDetail.addressId,
          name: addressDetail.userName,
          tel: addressDetail.userPhone,
          province: addressDetail.provinceName,
          city: addressDetail.cityName,
          county: addressDetail.regionName,
          addressDetail: addressDetail.detailAddress,
          areaCode: _areaCode,
          isDefault: !!addressDetail.defaultFlag,
        }
      }
    }

    const handSaveAddress = async (content) => {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
      }

      if (state.type === 'edit') {
        params['addressId'] = state.addressId
      }

      state.type === 'add' ? await addAddressRequest(params) : await editAddressRequest(params)

      Toast('保存成功！')

      setTimeout(() => {
        router.back()
      }, 1000)
    }

    const handDeleteAddress = async () => {
      await deleteAddressRequest(state.addressId)

      Toast('删除成功！')

      setTimeout(() => {
        router.back()
      }, 1000)
    }

    return { ...toRefs(state), handSaveAddress, handDeleteAddress }
  },
}
</script>

<style lang="less" scoped>
.address-edit {
}
</style>

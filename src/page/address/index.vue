<template>
  <div class="address">
    <van-nav-bar title="地址管理" safe-area-inset-top left-arrow @click-left="$router.back()" />

    <van-address-list
      v-if="from !== 'mine'"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="handIncrementAddress"
      @edit="handEditAddress"
      @select="handSelectAddress"
    />

    <van-address-list
      v-else
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="handIncrementAddress"
      @edit="handEditAddress"
    />
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { queryAddressListRequest } from '../../api/address'

export default {
  name: 'address',

  components: {},

  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      chosenAddressId: '',
      list: [],
      from: route.query.from,
    })

    onMounted(() => {
      initAddressList()
    })

    const initAddressList = async () => {
      const { data } = await queryAddressListRequest()
      if (!data) return

      state.list = data.map((item) => {
        return {
          id: item.addressId,
          name: item.userName,
          tel: item.userPhone,
          address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
          isDefault: !!item.defaultFlag,
        }
      })
    }

    const handIncrementAddress = () => {
      router.push({ name: 'address-edit', query: { type: 'add', from: state.from } })
    }

    const handEditAddress = (item) => {
      router.push({
        name: 'address-edit',
        query: { type: 'edit', addressId: item.id, from: state.from },
      })
    }

    const handSelectAddress = (item) => {
      router.push({ name: 'create-order', query: { addressId: item.id, from: state.from } })
    }

    return { ...toRefs(state), handSelectAddress, handEditAddress, handIncrementAddress }
  },
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

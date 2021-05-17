<template>
  <div class="mine">mine</div>
</template>

<script>
import { userInfoRequest } from '/@/api/user'
import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'mine',

  components: {},

  setup() {
    const state = reactive({
      user: {},
      loading: true,
    })

    onMounted(async () => {
      const data = await userInfoRequest()
      console.log(data)
    })

    return { ...toRefs(state) }
  },
}
</script>

<style lang="less" scoped>
.mine {
}
</style>

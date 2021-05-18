<template>
  <div class="mine">
    <van-nav-bar title="个人中心" safe-area-inset-top />
    <div class="mine__mine-info">
      <div class="mine__mine-info__aviator">
        <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" alt="" />
      </div>
      <div class="mine__mine-info__desc">
        <p class="mine__mine-info__desc-item"><span>昵称：</span>{{ user.nickName }}</p>
        <p class="mine__mine-info__desc-item"><span>手机：</span>{{ user.loginName }}</p>
        <p class="mine__mine-info__desc-item"><span>签名：</span>{{ user.introduceSign }}</p>
      </div>
    </div>
    <van-cell is-link title="我的订单" to="/order" />
    <van-cell is-link title="账号管理" to="/setting" />
    <van-cell is-link title="地址管理" to="/address?from=mine" />
    <van-cell is-link title="关于我们" to="/about is-link" />

    <NavBar />
  </div>
</template>

<script>
import NavBar from '/cpn/NavBar'

import { userInfoRequest } from '/@/api/user'
import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'mine',

  components: { NavBar },

  setup() {
    const state = reactive({
      user: {},
      loading: true,
    })

    onMounted(async () => {
      const { data } = await userInfoRequest()

      state.user = data
    })

    return { ...toRefs(state) }
  },
}
</script>

<style lang="less" scoped>
@import './../../theme/mixin';

.mine {
  &__mine-info {
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 20px 10px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 8px;

    &__aviator {
      flex: 1;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }

    &__desc {
      flex: 2;

      &-item {
        margin: 0;
        padding: 5px;
        .fc(13px, #fff);
      }
    }
  }
}
</style>

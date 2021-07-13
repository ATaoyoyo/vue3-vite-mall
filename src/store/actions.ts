import {getCartRequest} from 'src/api/cart'
import {ActionContext} from "vuex";

export default {
  async updateCart(ctx: ActionContext<State, any>) {
    const {data} = await getCartRequest()

    ctx.commit('addCart', {count: data.length || 0})
  },
}

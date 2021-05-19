import { getCartRequest } from '/@/api/cart'

export default {
  async updateCart(ctx) {
    const { data } = await getCartRequest()

    ctx.commit('addCart', { count: data.length || 0 })
  },
}

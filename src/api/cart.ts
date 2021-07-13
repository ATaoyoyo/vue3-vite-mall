import request from './index'

type addCart = { goodsCount: number, goodsId: number }
export const addCartRequest = (params: addCart) => {
  return request.post('/shop-cart', params)
}

type getCart = { pageNumber: number }
export const getCartRequest = (params?: getCart) => {
  return request.get('/shop-cart', {params})
}

type modifyGoods = { cartItemId: string, goodsCount: number }
export const modifyGoodsRequest = (params: modifyGoods) => {
  return request.put('/shop-cart', params)
}

export const deleteGoodsRequest = (params: string) => {
  return request.delete(`/shop-cart/${params}`)
}

type queryBuyCart = { cartItemIds: string[] }
export const queryBuyCartItemIds = (params: queryBuyCart) => {
  return request.get('/shop-cart/settle', {params})
}

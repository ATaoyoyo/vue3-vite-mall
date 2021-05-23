import request from './index'

export const addCartRequest = (params) => {
  return request.post('/shop-cart', params)
}

export const getCartRequest = (params) => {
  return request.get('/shop-cart', { params })
}

export const modifyGoodsRequest = (params) => {
  return request.put('/shop-cart', params)
}

export const deleteGoodsRequest = (params) => {
  return request.delete(`/shop-cart/${params}`)
}

export const queryBuyCartItemIds = (params) => {
  return request.get('/shop-cart/settle', { params })
}

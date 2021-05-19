import request from './index'

export const addCartRequest = (params) => {
  return request.post('/shop-cart', params)
}

export const getCartRequest = (params) => {
  return request.get('/shop-cart', { params })
}

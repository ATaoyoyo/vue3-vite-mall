import request from './index'

export const createOrderRequest = (params) => {
  return request.post('/saveOrder', params)
}

export const payOrderRequest = (params) => {
  return request.get('/paySuccess', { params })
}

export const queryOrderListRequest = (params) => {
  return request.get('/order', { params })
}

import request from './index'

type CreateOrder = {
  addressId: string
  cartItemIds: string
}
export const createOrderRequest = (params: CreateOrder) => {
  return request.post('/saveOrder', params)
}

type PayOrder = {
  orderNo: string
  payType: string
}
export const payOrderRequest = (params: PayOrder) => {
  return request.get('/paySuccess', {params})
}

type QueryOrder = {
  pageNumber: number
  status: string
}
export const queryOrderListRequest = (params: QueryOrder) => {
  return request.get('/order', {params})
}

export const queryOrderDetailRequest = (params: string) => {
  return request.get(`/order/${params}`)
}

export const cancelOrderRequest = (params: string) => {
  return request.put(`/order/${params}/cancel`)
}

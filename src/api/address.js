import request from './index'

export const queryDefaultAddress = (params) => {
  return request.get('/address/default')
}

export const queryAddressDetail = (params) => {
  return request.get(`/address/${params}`)
}

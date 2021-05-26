import request from './index'

export const queryDefaultAddressRequest = (params) => {
  return request.get('/address/default')
}

export const queryAddressListRequest = (params) => {
  return request.get('/address', { pageNumber: 1, pageSize: 1000 })
}

export const queryAddressDetailRequest = (params) => {
  return request.get(`/address/${params}`)
}

export const addAddressRequest = (params) => {
  return request.post('/address', params)
}

export const editAddressRequest = (params) => {
  return request.put('/address', params)
}

export const deleteAddressRequest = (params) => {
  return request.delete(`/address/${params}`)
}

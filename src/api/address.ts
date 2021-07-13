import request from './index'

interface IAddress {
  userName: string
  userPhone: number
  provinceName: string
  cityName: string
  regionName: string
  detailAddress: string
  defaultFlag: number
}

export const queryDefaultAddressRequest = (params?: string) => {
  return request.get('/address/default')
}

export const queryAddressListRequest = () => {
  return request.get('/address', {data: {pageNumber: 1, pageSize: 1000}})
}

export const queryAddressDetailRequest = (params: string) => {
  return request.get(`/address/${params}`)
}

export const addAddressRequest = (params: IAddress) => {
  return request.post('/address', params)
}

export const editAddressRequest = (params: IAddress) => {
  return request.put('/address', params)
}

export const deleteAddressRequest = (params: string) => {
  return request.delete(`/address/${params}`)
}

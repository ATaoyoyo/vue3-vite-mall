import request from './index'

export const productDetail = (params) => {
  return request.get(`/goods/detail/${params}`)
}
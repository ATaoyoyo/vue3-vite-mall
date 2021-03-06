import request from './index'

export const productDetail = (params) => {
  return request.get(`/goods/detail/${params}`)
}

export const queryCategoryRequest = () => {
  return request.get('/categories')
}

export const querySearch = (params) => {
  return request.get('/search', { params })
}

import request from './index'

export const loginRequest = (params) => {
  return request.post('/user/login', params)
}

export const registerRequest = (params) => {
  return request.post('/user/register', params)
}

export const userInfoRequest = (params) => {
  return request.get('/user/info')
}

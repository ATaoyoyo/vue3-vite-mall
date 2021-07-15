import request from './index'

export const loginRequest = (params: { loginName: string, passwordMd5: string }) => {
  return request.post('/user/login', params)
}

export const registerRequest = (params: { loginName: string, password: string }) => {
  return request.post('/user/register', params)
}

export const userInfoRequest = () => {
  return request.get('/user/info')
}

export const userLogoutRequest = () => {
  return request.post('/user/logout')
}

export const editUserInfoRequest = (params: { introduceSign: string, nickName: string }) => {
  return request.put('/user/info', params)
}

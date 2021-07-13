import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {Toast} from 'vant'
import router from '../router'

import {getLocal} from '../utils'

const BASE_URL =
  process.env.NODE_ENV == 'development'
    ? '//backend-api-01.newbee.ltd/api/v1'
    : '//backend-api-01.newbee.ltd/api/v1'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    token: getLocal('token') || '',
    post: {
      'Content-Type': 'application/json',
    },
  },
})

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res: AxiosResponse) => {
    const {
      data,
      data: {resultCode, message},
    } = res

    if (typeof data !== 'object') {
      Toast.fail('服务端异常！')
      return Promise.reject(res)
    }

    if (resultCode !== 200) {
      if (message) Toast.fail(message)

      if (resultCode === 416) {
        localStorage.removeItem('token')
        window.location.replace('/login')
      }

      return data
    }

    return data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request

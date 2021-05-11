import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV == 'development'
    ? '//backend-api-01.newbee.ltd/api/v1'
    : '//backend-api-01.newbee.ltd/api/v1'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    const { data } = res
    return data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request

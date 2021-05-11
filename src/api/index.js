import axios from "axios";

const request = axios.create({
  baseURL: 'http://backend-api-01.newbee.ltd',
  timeout: 5000
})


request.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})


request.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

export default request
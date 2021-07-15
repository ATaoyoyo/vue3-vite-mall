import request from './index'

export function getHomeRequest() {
  return request.get('/index-infos')
}

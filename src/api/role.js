import request from '@/utils/request'

export function roleList () {
  return request({
    method: 'get',
    url: '/role/list'
  })
}

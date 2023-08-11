import request from '@/utils/request'

export function roleList () {
  return request({
    method: 'get',
    url: '/role/list'
  })
}

export function getRoleDetail (roleId) {
  return request({
    method: 'get',
    url: '/role/detail',
    params: { role_id: roleId }
  })
}

export function saveRole (data) {
  return request({
    method: 'post',
    url: '/role/save',
    data: data
  })
}

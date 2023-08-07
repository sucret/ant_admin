import request from '@/utils/request'

export function adminLogin (data) {
  return request({
    method: 'post',
    url: '/login',
    data: data
  })
}

export function adminList () {
  return request({
    method: 'get',
    url: '/admin/list'
  })
}

// export function getAdminList () {
//   return request({
//     url: '/admin/list',
//     method: 'get'
//   })
// }

export function getAdminDetail (adminId) {
  return request({
    url: '/admin/detail',
    method: 'get',
    params: { admin_id: adminId }
  })
}

export function saveAdmin (data) {
  return request({
    url: '/admin/save',
    method: 'post',
    data: data
  })
}

export function getAdminProfile ()
{
  return request({
    url: '/profile',
    method: 'get'
  })
}

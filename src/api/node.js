import request from '@/utils/request'

export function getNodeDetail (nodeId) {
  return request({
    method: 'get',
    url: '/node/detail',
    params: { node_id: nodeId }
  })
}

export function saveNode (data) {
  return request({
    method: 'post',
    url: '/node/save',
    data: data
  })
}

export function getNodeTree () {
  return request({
    method: 'get',
    url: '/node/tree'
  })
}

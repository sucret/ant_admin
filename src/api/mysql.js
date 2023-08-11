import request from '@/utils/request'

export function tableList () {
  return request({
    url: '/mysql/table-list',
    method: 'get'
  })
}

export function executeSql (sql) {
  return request({
    url: '/mysql/execute-sql',
    method: 'post',
    data: { sql: sql }
  })
}

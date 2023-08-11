import { defineAsyncComponent } from 'vue'

export const routerComponents = {
  // 工作台
  Dashboard: () => import('@/views/dashboard/DashboardView.vue'),
  Workbench: () => import('@/views/dashboard/WorkbenchView.vue'),

  // 系统管理
  AdminListView: () => import('../views/admin/AdminListView.vue'),
  RoleListView: () => import('../views/role/RoleListView.vue'),
  NodeListView: () => import('@/views/node/NodeListView.vue'),
  SystemLogView: () => import('../views/log/SystemLogView.vue'),
  ActionLogView: () => import('../views/log/ActionLogView.vue'),

  MysqlToolView: () => import('../views/database/MysqlToolView.vue'),
  RedisToolView: () => import('../views/database/RedisToolView.vue')

}

export const genRouters = (menuList) => {
  const childrenNav = []
  const makeRouter = (list) => {
    for(let item of list) {
      if (item.component) {
        childrenNav.push({
          path: item.path,
          name: item.component,
          component: routerComponents[item.component],
          meta: {
            keepAlive: true
          }
        })
      }

      if (item.hasOwnProperty('children')) {
        makeRouter(item.children)
      }
    }
  }
  makeRouter(menuList)

  return childrenNav
}

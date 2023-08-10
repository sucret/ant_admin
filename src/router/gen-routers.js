import { defineAsyncComponent } from 'vue'

export const routerComponents = {
  BasicLayout: () => import('../layout/BasicLayout.vue'),

  // 工作台
  Dashboard: () => import('@/views/dashboard/DashboardView.vue'),
  Workbench: () => import('@/views/dashboard/WorkbenchView.vue'),

  // 系统管理
  AdminListView: () => import('../views/admin/AdminListView.vue'),
  RoleListView: () => import('../views/role/RoleListView.vue'),
  NodeListView: () => import('@/views/node/NodeListView.vue'),
  SystemLogView: () => import('../views/log/SystemLogView.vue'),
  ActionLogView: () => import('../views/log/ActionLogView.vue')

}

const rootRouter = {
  path: '',
  name: 'index',
  component: () => routerComponents.BasicLayout,
  children: []
}

export const genRouters = (menuList) => {
  console.log('genRouters', menuList)

  const childrenNav = []
  const makeRouter = (list) => {
    for(let item of list) {
      if (item.component) {
        childrenNav.push({
          path: item.path,
          name: item.component,
          component: routerComponents[item.component]
        })
      }

      if (item.hasOwnProperty('children')) {
        makeRouter(item.children)
      }
    }
  }
  makeRouter(menuList)

  return childrenNav
  // rootRouter.children = childrenNav

  // return rootRouter
}

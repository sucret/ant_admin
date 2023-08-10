import { createRouter, createWebHistory } from 'vue-router'

// const routerComponents = {
//   BasicLayout: () => import('../layout/BasicLayout.vue'),

//   // 工作台
//   DashboardView: () => import('../views/dashboard/DashboardView.vue'),
//   WorkbenchView: () => import('../views/dashboard/WorkbenchView.vue'),

//   // 系统管理
//   AdminListView: () => import('@/views/admin/AdminListView.vue'),
//   RoleListView: () => import('@/views/role/RoleListView.vue'),
//   NodeListView: () => import('@/views/node/NodeListView.vue'),
//   SystemLogView: () => import('@/views/log/SystemLogView.vue')

// }

import { routerComponents } from './gen-routers'

const BasicLayout = () => import('../layout/BasicLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'basic',
      component: () => import('../layout/BasicLayout.vue'),
      children: [
        // {
        //   path: 'dashboard',
        //   name: 'dashboard',
        //   component: () => import('../views/dashboard/DashboardView.vue'),
        //   // meta: { transition: 'slide-left' },
        // },
        // {
        //   path: 'workbench',
        //   name: 'workbench',
        //   component: () => import('../views/dashboard/WorkbenchView.vue'),
        //   // meta: { transition: 'slide-left' },
        // },
        // {
        //   path: 'admin/list',
        //   name: 'adminList',
        //   component: () => import('@/views/admin/AdminListView.vue')
        // },
        // {
        //   path: 'role/list',
        //   name: 'roleList',
        //   component: () => import('@/views/role/RoleListView.vue')
        // },
        // {
        //   path: 'node/list',
        //   name: 'nodeList',
        //   component: () => import('@/views/node/NodeListView.vue')
        // },
        // {
        //   path: 'log/system-log',
        //   name: 'systemLog',
        //   component: () => import('@/views/log/SystemLogView.vue')
        // }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    }
  ]
})

export default router

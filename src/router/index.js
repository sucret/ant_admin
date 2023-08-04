import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../layout/BasicLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard/DashboardView.vue'),
          // meta: { transition: 'slide-left' },
        },
        {
          path: 'workbench',
          name: 'workbench',
          component: () => import('../views/dashboard/WorkbenchView.vue'),
          // meta: { transition: 'slide-left' },
        },
        {
          path: 'admin/list',
          name: 'adminList',
          component: () => import('@/views/admin/AdminListView.vue')
        },
        {
          path: 'role/list',
          name: 'roleList',
          component: () => import('@/views/role/RoleListView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    }
  ]
})

export default router

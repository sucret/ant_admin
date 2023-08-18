import router from './router'
// import store from './store'
import NProgress from 'nprogress'
import VueCookie from 'vue-cookie'

import { useUserStore } from './store/user'
import { pinia } from './store/pinia'

import message from 'ant-design-vue/es/message'

const LOGIN_ROUTER_PATH = '/login'
const DEFAULT_ROUTER_PATH = '/dashboard'

// NProgress.inc()

NProgress.configure({
  showSpinner: false,
  // parent: '#app',
  trickleSpeed: 200,
  easing: 'ease',  // 动画设置
  speed: 500, // 速度设置毫秒ms
})

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from) => {
  NProgress.start()
  const token = VueCookie.get('token')
  let userStore = useUserStore(pinia)

  if (token) {
    
    // 登陆进来之后，因为没有token，main中的initRouter不会执行
    // 所以需要在这里判断一下，如果没有菜单就需要初始化router
    if (userStore.topSelectedKey.length == 0) {
      await initRouter()

      await userStore.initMenu(to.fullPath)
    }

    // 如果已经登陆则跳转到默认页面
    if (to.path == LOGIN_ROUTER_PATH || to.path == '/') {
      return DEFAULT_ROUTER_PATH
    }
  } else {
    // 未登录
    if (to.name != 'login') {
      return LOGIN_ROUTER_PATH
    }
  }
  // ...
  // 返回 false 以取消导航
  return true
})


router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export const initRouter = async () => {
  const token = VueCookie.get('token')
  if (token) {
    let userStore = useUserStore(pinia)
    await userStore.getUserInfo().then(res => {
      // 初始化一下菜单
      const routers = userStore.genRouter()

      routers.forEach(r => {
        router.addRoute('basic', r)
      })
      // router.addRoute(routers)
      // console.log('router1s', routers, router)
      // console.log('gerRoutes', router.getRoutes())
      // next({ ...to, replace: true })
    })
  }
}

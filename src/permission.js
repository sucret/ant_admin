import router from './router'
import store from './store'
// import NProgress from 'nprogress'
import VueCookie from 'vue-cookie'

const LOGIN_ROUTER_PATH = '/login'
const DEFAULT_ROUTER_PATH = '/dashboard'

router.beforeEach(async (to, from) => {
  const token = VueCookie.get('token')
  // VueCookie.set('token23', 12334566)

  console.log('beforeEach', from, to, token)
  if (token) {
    console.log('store.getters.token', store.getters.token)

    // 判断store里边有没有存储用户信息，如果没有则需要获取一下用户信息
    if (!store.getters.nickname) {
      store.dispatch('GetUserInfo').then(res => {
        console.log(res)
      })
      console.log('token', store.getters.token)
    } 

    // 如果已经登陆则跳转到默认页面
    if (to.path == LOGIN_ROUTER_PATH) {
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
  // NProgress.done() // finish progress bar
})

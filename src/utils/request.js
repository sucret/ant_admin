import axios from 'axios'
// import store from '@/store'
// import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import VueCookie from 'vue-cookie'
// import Vue from 'vue'
// import message from 'ant-design-vue/es/message'
import VueCookie from 'vue-cookie'
import router from '../router'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  console.log('error', error)
  // if (error.response) {
  //   const data = error.response.data
  //   // 从 localstorage 获取 token
  //   const token = storage.get(ACCESS_TOKEN)
  //   if (error.response.status === 403) {
  //     notification.error({
  //       message: error.response.status,
  //       description: data.message
  //     })
  //   }
  //   if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
  //     notification.error({
  //       message: error.response.status,
  //       description: 'Authorization verification failed'
  //     })
  //     if (token) {
  //       store.dispatch('Logout').then(() => {
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 1500)
  //       })
  //     }
  //   }
  // }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  // console.log('request', config, config.request)
  // const token = VueCookie.get('token')
  const token = VueCookie.get('token')

  if (config.url != '/login') {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  // // 如果 token 存在
  // // 让每个请求携带自定义 token 请根据实际情况自行修改
  // if (config.url !== '/login' && token === '') {
  //   notification.warning({
  //     message: 'Error',
  //     description: '登录过期，请重新登录',
  //     duration: 3
  //   })

  //   Vue.$router.push({ path: '/user/login' })
  // } else {
  //   config.headers['Authorization'] = 'Bearer ' + token
  // }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  // console.log('response', response.data)

  if(response.data.error_code == 40100) {
    // console.log('del_token', VueCookie.delete('token'));
    router.push({ path: '/login' })
  }
  
  if (response.data.error_code) {
    return Promise.reject(response.data.message)
  }

  
  // if (response.data.error_code >= 40000) {
  //   message.error(response.data.message)
  //   if (parseInt(response.data.error_code) === 40100) {
  //     VueCookie.delete('token')
  //     Vue.$router.push({ path: '/user/login' })
  //   }

  //   // 没有操作权限就返回上一页
  //   if (parseInt(response.data.error_code) === 40200) {
  //     window.history.go(-1)
  //   }
  //   return Promise.reject(response.data.message)
  // }
  // console.log('response data', response.data)
  return response.data.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}

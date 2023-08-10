// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import store from './store'
import 'ant-design-vue/dist/reset.css';
import './permission'
import { pinia } from './store/pinia'

import './assets/base.css'

import { initRouter } from './permission'

// NProgress.configure({
//   easing: 'ease', // 动画方式
//   speed: 1000, // 递增进度条的速度
//   showSpinner: false, // 是否显示加载ico
//   trickleSpeed: 200, // 自动递增间隔
//   minimum: 0.3, // 更改启动时使用的最小百分比
//   parent: 'body', //指定进度条的父容器
// })

const app = createApp(App)
const boot = async () => {
  // 这里初始化router是为了在刷新页面的时候不出现白页
  await initRouter()
  app.use(Antd).use(pinia).use(store).use(router).mount('#app');
}

boot()

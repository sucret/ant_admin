// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import store from './store'
import 'ant-design-vue/dist/reset.css';
import './permission'
// import { createPinia } from 'pinia'
import { pinia } from './store/pinia'

// const pinia = createPinia(pinia)
const app = createApp(App)

app.use(Antd).use(pinia).use(store).use(router).mount('#app');

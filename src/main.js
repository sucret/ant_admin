// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import store from './store'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.use(Antd).use(store).use(router).mount('#app');

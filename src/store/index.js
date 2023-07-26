import { createStore } from "vuex"

import app from './modules/app'
import user from './modules/user'
import getters from './getters'

// const store = createStore({
//   // 初始化state函数，其中保存的是所有组件共享的数据
//   state() {
//     return {
//       count: 100,
//     };
//   },
//   // 提供修改state中数据的方法
//   mutations: {
//     add(state) {
//       state.count++;
//     },
//   },
// });

// export default store


export default createStore({
  modules: {
    app,
    user
  },
  getters
})

import { h } from 'vue';
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue';
import VueCookie from 'vue-cookie'

const menu = [
  {
    key: 'dashboard1',
    icon: () => h(PieChartOutlined),
    label: '仪表盘',
    children: [
      {
        key: '/dashboard',
        icon: () => h(PieChartOutlined),
        label: '仪表盘',
      }, {
        key: '/workbench',
        icon: () => h(DesktopOutlined),
        label: '工作台',
      }
    ]
  }, {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: '系统管理',
    children: [{
      key: '5',
      label: '权限管理',
      icon: () => h(MailOutlined),
    }, {
      key: '6',
      label: '角色管理',
      title: 'Option 6',
      icon: () => h(MailOutlined),
    }, {
      key: '7',
      label: '用户管理',
      title: 'Option 7',
      icon: () => h(MailOutlined),
    }, {
      key: '8',
      label: 'Option 8',
      title: 'Option 8',
    }],
  }, {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
    children: [{
      key: '9',
      label: 'Option 9',
      title: 'Option 9',
    }, {
      key: '10',
      label: 'Option 10',
      title: 'Option 10',
    }, {
      key: 'sub3',
      label: 'Submenu',
      title: 'Submenu',
      children: [{
        key: '11',
        label: 'Option 11',
        title: 'Option 11',
      }, {
        key: '12',
        label: 'Option 12',
        title: 'Option 12',
      }]
    }]
  }
]

const user = {
  state: {
    token: '',
    roles: '',
    nickname: '',
    menu: [],
    topMenu: [],
    leftMenu: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      VueCookie.set('token', token)
    },
    SET_USER_INFO: (state, user) => {

    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_TOP_MENU: (state, menu) => {
      state.topMenu = menu
    },
    SET_LEFT_MENU: (state, menu) => {
      state.leftMenu = menu
    }
  },
  actions: {
    SetLeftMenu ({ state, commit }, key ) {
      let k = 0
      for(k in state.menu) {
        if (key == state.menu[k].key) {
          commit('SET_LEFT_MENU', state.menu[k].children)
        }
      }
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        let leftMenuList = []
        let topMenuList = []
        let k = 0
        for(k in menu) {
          if (k == 0) {
            leftMenuList = menu[k].children
          }
          topMenuList.push({ key: menu[k].key, icon: menu[k].icon, label: menu[k].label })
        }

        console.log('menuList', topMenuList, leftMenuList)

        commit('SET_MENU', menu)
        commit('SET_TOP_MENU', topMenuList)
        commit('SET_LEFT_MENU', leftMenuList)
        // todo 这里需要改成走接口请求
        // setTimeout(() => {
        //   commit('SET_TOKEN', '123')
        //   // commit('SET_')
        //   resolve(1233)
        // }, 3000);
      })
    },
    Login ({ commit }, token) {

    }
  }
}

export default user;

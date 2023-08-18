import { defineStore } from 'pinia'
import { h } from 'vue';
import {
  // PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  ScheduleOutlined,
  DatabaseOutlined,
  CloudServerOutlined
} from '@ant-design/icons-vue';
import VueCookie from 'vue-cookie'
import router from '../router'
import { genRouters } from '../router/gen-routers'
import * as Icons from '@ant-design/icons-vue'

import { getAdminProfile } from '@/api/admin.js'

const menu = [
  {
    key: 'dashboard1',
    icon: () => h(eval('Icons.PieChartOutlined')),
    label: '工作台',
    children: [
      {
        key: '/dashboard',
        icon: () => h(eval('Icons.PieChartOutlined')),
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
      children: [
        {
          key: '/node/list',
          label: '菜单管理',
          icon: () => h(UnorderedListOutlined)
        },{
          key: '/role/list',
          label: '角色管理',
          title: 'Option 6',
          icon: () => h(MailOutlined),
        }, {
          key: '/admin/list',
          label: '用户管理',
          title: 'Option 7',
          icon: () => h(MailOutlined),
        }
      ]
    },{
      key: 'system_tool',
      label: '系统工具',
      title: '系统工具',
      icon: () => h(CloudServerOutlined),
      children: [{
        key: '/log/system-log',
        label: '系统日志',
        title: '系统日志',
        icon: () => h(LineChartOutlined),
      },{
        key: '9',
        label: '操作日志',
        title: '操作日志',
        icon: () => h(LineChartOutlined),
      },{
        key: '10',
        label: '任务管理',
        title: '任务管理',
        icon: () => h(ScheduleOutlined),
      },
      {
        key: '11',
        label: '数据库工具',
        title: '数据库工具',
        icon: () => h(DatabaseOutlined),
      }]
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

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      roles: '',
      nickname: '',
      menu: [],
      topMenu: [],
      leftMenu: [],
      topSelectedKey: [],
      leftSelectedKey: [],
      leftOpenKeys: []
    }
  },
  actions: {
    logout () {
      VueCookie.delete('token')
      this.token = null
      router.push('/')
    },
    login (token) {
      VueCookie.set('token', token, { expires: 1 })
      router.push('/')
    },
    getUserInfo () {
      return new Promise((resolve, reject) => {
        getAdminProfile().then(res => {
          this.nickname = res.nickname

          const formatNode = (list) => {
            for(let k in list) {
              list[k].key = list[k].path ? list[k].path : (list[k].node_id + "")
              list[k].icon = list[k].icon ? h(eval('Icons.' + list[k].icon)) : ''
              list[k].label = list[k].title

              if (list[k].children) {
                formatNode(list[k].children)
              } else {
                delete list[k].children
              }

              if (!list[k].component) {
                delete list[k].component
              }
            }
          }

          formatNode(res.node_list)

          let menu = res.node_list
          let leftMenuList = []
          let topMenuList = []
          let k = 0
          for(k in menu) {
            if (k == 0) {
              leftMenuList = menu[k].children
            }
            topMenuList.push({ key: menu[k].key, icon: menu[k].icon, label: menu[k].label })
          }

          this.topMenu = topMenuList
          this.leftMenu = leftMenuList
          this.token = VueCookie.get('token')
          this.menu = menu

          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    setLeftMenu (key) {
      console.log(this.menu, key)
      for(let k in this.menu) {
        console.log('kkk', key, this.menu[k].key)
        if (key == this.menu[k].key) {
          this.leftMenu = this.menu[k].children
          break;
        }
      }

      console.log('leftMenu', this.leftMenu)
      this.topSelectedKey = [key]

      // 跳转到子菜单第一个页面
      this.leftOpenKeys = []

      console.log('topSelectedKey', this.topSelectedKey)
      let getFirstView = (menuList) => {
        let k = 0
        for(k in menuList) {
          if (menuList[k].hasOwnProperty('children') && menuList[k].children.length > 0) {
            this.leftOpenKeys.push(menuList[k].key)
            return getFirstView(menuList[k].children)
          } else {
            return menuList[k].key
          }
        }
      }

      console.log('leftMenu', this.leftMenu)
      const firstLeftPath = getFirstView(this.leftMenu)

      // console.log('firstLeftPath', firstLeftPath, leftSelectedKey)
      router.push({ path: firstLeftPath })

      // 设置选中的菜单
      this.leftSelectedKey = [firstLeftPath]
    },
    async initMenu (key) {
      const menuPath = this.getKeyPath(key, this.menu)

      // 顶部菜单
      const topSelected = menuPath.shift()
      this.topSelectedKey = topSelected ? [topSelected] : []

      // 左侧菜单
      for(let menu of this.menu) {
        if (menu.key == topSelected) {
          this.leftMenu = menu.children
          break
        }
      }

      // 左侧选择
      const leftSelected = menuPath.pop()
      this.leftSelectedKey = leftSelected ? [leftSelected] : []

      // 左侧打开菜单
      this.leftOpenKeys = menuPath
    },
    getKeyPath (key, menuList) {
      let result = []
      let getFullPath = (curKey, path, menuList) => {
        if (menuList.length < 1) {
          return;
        }

        for(let item of menuList) {
          path.push(item.key)
          if (item.key == curKey) {
            result = JSON.parse(JSON.stringify(path));
            return
          }

          if (item.hasOwnProperty('children')) {
            getFullPath(curKey, path, item.children)
          }
          path.pop()
        }
      }

      getFullPath(key, [], menuList)
      return result
    },
    genRouter () {
      return genRouters(this.menu)
    }
  }
})

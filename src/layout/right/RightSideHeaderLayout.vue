<template>
  <!-- 右侧header -->
  <a-layout-header :style="{ background: theme == 'dark' ? '#001529' : '#fff', padding: 0, position: 'fixed', zIndex: 1, width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)', borderBottom: '1px solid rgba(5, 5, 5, 0.06)' }">
    <div class="header-left-side" >
      <menu-unfold-outlined
        class="trigger"
        v-if="collapsed"
        @click="changeCollapsed"
        :style="{ color: theme == 'dark' ? '#fff' : 'black' }"
      />
      <menu-fold-outlined
        v-if="!collapsed"
        class="trigger"
        @click="changeCollapsed"
        :style="{ color: theme == 'dark' ? '#fff' : 'black' }"
        />
      <a-menu
        v-model:selectedKeys="topSelectedKey"
        :theme="theme"
        mode="horizontal"
        :style="{ lineHeight: '50px', height: '50px', float: 'left' }"
        @click="menuClick"
        :items="menu"/>
    </div>
    <div class="header-right-side" :style="{ background: theme == 'dark' ? '#001529' : '#fff' }" style="position: fixed; right: 0; height: 50px; border-bottom: 1px solid rgba(5, 5, 5, 0.06);">
      <a-dropdown class="avatar-dropdown" arrow>
        <a class="ant-dropdown-link" @click.prevent>
          <DownOutlined :style="{ color: theme == 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.88)' }" style="display: block;float: right; line-height: 54px; width: 30px;font-size: 12px;padding-right: 30px;"/>
          <p class="nickname" :style="{ color: theme == 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.88)' }">鲍叔牙</p>
          <div class="avatar-box">
            <a-avatar shape="square" style="display: block; margin-top: 10px; background-color: #f56a00;">
              <template #icon><UserOutlined /></template>
            </a-avatar>
          </div>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a-button type="text" size="small"><UserOutlined />个人中心</a-button>
            </a-menu-item>
            <a-menu-item>
              <a-button type="text" size="small"><DeleteOutlined />清理缓存</a-button>
            </a-menu-item>
            <a-menu-item>
              <a-button type="text" size="small"><LogoutOutlined />退出登陆</a-button>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <div class="themeSwitch">
        <a-switch
          size="small"
          :checked="theme === 'dark'"
          checked-children="Dark"
          un-checked-children="Light"
          @change="changeTheme"
          class="themeSwitchMenu"
          style="display: block;margin-top: 17px;"
        />
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  DeleteOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DashboardOutlined
} from '@ant-design/icons-vue'

import { mapState } from 'vuex'

import store from '../../store'

export default {
  name: 'RightSideHeaderLayout',
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    DeleteOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    SettingOutlined,
    DashboardOutlined
  },
  data() {
    return {
      topSelectedKey: ['app']
    }
  },
  methods: {
    changeTheme() {
      this.$store.commit('CHANGE_THEME')
    },
    changeCollapsed() {
      this.$store.commit('CHANGE_SIDE_COLLAPSED')
    },
    menuClick({ key }) {
      store.dispatch('SetLeftMenu', key).then(res => {
        console.log('SetLeftMenu', res)
      })
      // console.log('menuClick', key)
      // 获取到当前的key,并且跳转
      // this.$router.push({
      //   path: key
      // })
    },
  },
  mounted: function () {
    localStorage.setItem('a', JSON.stringify({ a: 123, b: 'afwne' }))
  },
  computed: mapState({
    theme: state => state.app.theme,
    collapsed: state => state.app.sideCollapsed,
    menu: state => state.user.topMenu
  })
}
</script>

<style scoped>
.trigger {
  font-size: 17px;
  line-height: 54px;
  padding: 0 12px;
  transition: color 0.3s;
  float: left;
  display: block;
  height: 50px;
  cursor: pointer;
}

.trigger:hover {
  color: #1890ff;
}

.themeSwitch {
  display: block;
  float: right;
  height: 50px;
  margin-right: 20px;
}

.nickname {
  display: block;
  float: right;
  line-height: 50px;
  height: 50px;
  padding-right: 4px;
  font-size: 12px;
  cursor: pointer;
}

.avatar-box {
  height: 50px;
  float: right;
  padding-right: 8px;
  cursor: pointer;
}

.avatar-dropdown {
  display: block;
  height: 50px;
  float: right;
  margin-right: 12px;
  cursor: pointer;
}
</style>


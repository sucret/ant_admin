<template>
  <!-- 右侧header -->
  <a-layout-header :style="{ background: theme == 'dark' ? '#001529' : '#fff', padding: 0, position: 'fixed', zIndex: 1, width: sideCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)', borderBottom: '1px solid rgba(5, 5, 5, 0.06)' }">
    <div class="header-left-side" >
      <MenuUnfoldOutlined
        class="trigger"
        v-if="sideCollapsed"
        @click="changeCollapsed"
        :style="{ color: theme == 'dark' ? '#fff' : 'black' }"
      />
      <MenuFoldOutlined
        v-if="!sideCollapsed"
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
        :items="topMenu"/>
    </div>
    <div class="header-right-side" :style="{ background: theme == 'dark' ? '#001529' : '#fff' }" style="position: fixed; right: 0; height: 50px; border-bottom: 1px solid rgba(5, 5, 5, 0.06);">
      <a-dropdown class="avatar-dropdown" arrow>
        <a class="ant-dropdown-link" @click.prevent>
          <DownOutlined :style="{ color: theme == 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.88)' }" style="display: block;float: right; line-height: 54px; width: 30px;font-size: 12px;padding-right: 30px;"/>
          <p class="nickname" :style="{ color: theme == 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.88)' }">{{ nickname }}</p>
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
              <a-button type="text" @click="logout" size="small"><LogoutOutlined />退出登陆</a-button>
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

<script setup>
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

import { useAppStore } from '../../store/app'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/user'

const appStore = useAppStore()
const { theme, sideCollapsed } = storeToRefs(appStore)

const userStore = useUserStore()
const { topMenu, topSelectedKey, nickname } = storeToRefs(userStore)

const changeTheme = () => {
  appStore.changeTheme()
}

const changeCollapsed = () => {
  appStore.changeCollapsed()
}

const menuClick = ({ key }) => {
  userStore.setLeftMenu(key)
}

const logout = () => {
  userStore.logout()
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


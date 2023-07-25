<template>
  <a-layout>
    <!-- 右侧header -->
    <RightSideHeaderLayout/>

    <!-- 右侧正文 -->
    <RightSideContentLayout/>

    <!-- 右侧footer -->
    <RightSideFooterLayout/>
  </a-layout>
</template>

<script>

import RightSideHeaderLayout from './right/RightSideHeaderLayout.vue'
import RightSideContentLayout from './right/RightSideContentLayout.vue'

import RightSideFooterLayout from './right/RightSideFooterLayout.vue'

export default {
  name: 'RightSideLayout',
  components: {
    RightSideHeaderLayout,
    RightSideContentLayout,
    RightSideFooterLayout
  },
  data() {
    return {
      collapsed: false,
      // selectedKeys: ['2'],
      // topSelectedKey: ['1'],
      theme: 'light'
    }
  },
  methods: {
    changeTheme() {
      this.theme = this.theme == 'dark' ? 'light' : 'dark'
    }
  },
  mounted: function() {
    localStorage.setItem('a',  JSON.stringify({ a: 123, b: 'afwne'}))
  }
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

#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.ant-layout-header {
  height: 50px;
  ;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.themeSwitch {
  display: block;
  float: right;
  height: 50px;
  margin-right: 20px;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
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

.avatar {
  display: block;
  float: right;
  margin-top: 6px;
  background-color: #1890ff;
}

.app-name {
  display: block;
  float: left;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 700;
  margin-left: 12px;
}

.avatar-dropdown {
  display: block;
  height: 50px;
  float: right;
  margin-right: 12px;
  cursor: pointer;
}
</style>


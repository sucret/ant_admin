<template>
  <!-- 水印，需要展示时放开注释 -->
  <!-- <a-watermark content="Ant Design Vue" :font="{ fontSize: 16 }"> -->
  <a-layout has-sider>
    <!-- 左侧+侧边栏 -->
    <LeftSideLayout />
    <!-- 右侧 -->
    <a-layout>
      <RightSideHeaderLayout/>
      <a-layout-content class="layout-content" :style="{ margin: '60px 10px 0', padding: '18px', background: '#fff', height: '400px', overflow: 'scroll' }">
        <router-view v-slot="{ Component }">
          <!-- <transition> -->
            <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </a-layout-content>
      <RightSideFooterLayout/>
    </a-layout>
  </a-layout>
  <!-- </a-watermark> -->
</template>

<script>
import LeftSideLayout from './LeftSideLayout.vue'
import RightSideHeaderLayout from './right/RightSideHeaderLayout.vue'
import RightSideFooterLayout from './right/RightSideFooterLayout.vue'

export default {
  name: 'BasicLayout',
  components: {
    LeftSideLayout,
    RightSideHeaderLayout,
    RightSideFooterLayout
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.layout-content{
  border-radius: 4px;
  /* height: calc(100% - 300px) */
}
.ant-layout-header {
  height: 50px;
}
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}


/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>


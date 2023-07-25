<template>
  <a-layout-sider v-model:collapsed="collapsed"
    :trigger="null"
    :style="{ background: '#fff', overflow: 'auto', height: '100vh' }">
    <div class="leftSider"
      :style="{ width: collapsed ? '80px' : '200px', position: 'fixed', left: 0, top: 0, bottom: 0 }">
      <div :style="{ backgroundColor: theme == 'dark' ? '#001529' : '#fff' }"
        class="logo"
        style="height: 50px;">
        <svg style="width: 32px; height: 32px; margin-left: 24px; margin-top: 9px; display: block; float: left;" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" fill="currentColor" width="128" height="128"><title>Vue</title><desc>Created with Sketch.</desc><defs><linearGradient x1="69.644116%" y1="0%" x2="69.644116%" y2="100%" id="linearGradient-1"><stop stop-color="#29CDFF" offset="0%"></stop><stop stop-color="#148EFF" offset="37.8600687%"></stop><stop stop-color="#0A60FF" offset="100%"></stop></linearGradient><linearGradient x1="-19.8191553%" y1="-36.7931464%" x2="138.57919%" y2="157.637507%" id="linearGradient-2"><stop stop-color="#29CDFF" offset="0%"></stop><stop stop-color="#0F78FF" offset="100%"></stop></linearGradient><linearGradient x1="68.1279872%" y1="-35.6905737%" x2="30.4400914%" y2="114.942679%" id="linearGradient-3"><stop stop-color="#FA8E7D" offset="0%"></stop><stop stop-color="#F74A5C" offset="51.2635191%"></stop><stop stop-color="#F51D2C" offset="100%"></stop></linearGradient></defs><g id="Vue" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group" transform="translate(19.000000, 9.000000)"><path d="M89.96,90.48 C78.58,93.48 68.33,83.36 67.62,82.48 L46.6604487,62.2292258 C45.5023849,61.1103236 44.8426845,59.5728835 44.8296987,57.9626396 L44.5035564,17.5209948 C44.4948861,16.4458744 44.0537714,15.4195095 43.2796864,14.6733517 L29.6459999,1.53153737 C28.055475,-0.00160504005 25.5232423,0.0449126588 23.9900999,1.63543756 C23.2715121,2.38092066 22.87,3.37600834 22.87,4.41143746 L22.87,64.3864751 C22.87,67.0807891 23.9572233,69.6611067 25.885409,71.5429748 L63.6004615,108.352061 C65.9466323,110.641873 69.6963584,110.624605 72.0213403,108.313281" id="Path-Copy" fill="url(#linearGradient-1)" fill-rule="nonzero" transform="translate(56.415000, 54.831157) scale(-1, 1) translate(-56.415000, -54.831157) "></path><path d="M68,90.1163122 C56.62,93.1163122 45.46,83.36 44.75,82.48 L23.7904487,62.2292258 C22.6323849,61.1103236 21.9726845,59.5728835 21.9596987,57.9626396 L21.6335564,17.5209948 C21.6248861,16.4458744 21.1837714,15.4195095 20.4096864,14.6733517 L6.7759999,1.53153737 C5.185475,-0.00160504005 2.65324232,0.0449126588 1.12009991,1.63543756 C0.401512125,2.38092066 3.90211878e-13,3.37600834 3.90798505e-13,4.41143746 L3.94351218e-13,64.3864751 C3.94681177e-13,67.0807891 1.08722326,69.6611067 3.01540903,71.5429748 L40.7807092,108.401101 C43.1069304,110.671444 46.8180151,110.676525 49.1504445,108.412561" id="Path" fill="url(#linearGradient-2)" fill-rule="nonzero"></path><path d="M43.2983488,19.0991931 L27.5566079,3.88246244 C26.7624281,3.11476967 26.7409561,1.84862177 27.5086488,1.05444194 C27.8854826,0.664606611 28.4044438,0.444472651 28.9466386,0.444472651 L60.3925021,0.444472651 C61.4970716,0.444472651 62.3925021,1.33990315 62.3925021,2.44447265 C62.3925021,2.9858375 62.1730396,3.50407742 61.7842512,3.88079942 L46.0801285,19.0975301 C45.3051579,19.8484488 44.0742167,19.8491847 43.2983488,19.0991931 Z" id="Path" fill="url(#linearGradient-3)"></path></g></g></svg>
        <p v-if="!collapsed" :style="{ color: theme == 'dark' ? '#fff' : '#1890ff' }" class="app-name">Ant Design</p>
      </div>
      <a-menu v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :theme="theme"
        v-model:collapsed="collapsed"
        collapsible
        :items="items"
        :style="{ minHeight: 'calc(100% - 50px)' }"/>
    </div>
  </a-layout-sider>
</template>

<script>
import { h } from 'vue';
import { PieChartOutlined, MailOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined } from '@ant-design/icons-vue';

import { mapState } from 'vuex'

export default {
  name: 'LeftSideLayout',
  data () {
    return {
      state: {
        selectedKeys: ['1'],
        openKeys: ['sub1'],
        preOpenKeys: ['sub1'],
      },
      items: items
    }
  },
  methods() {},
  computed: mapState({
    theme: state => state.app.theme,
    collapsed: state => state.app.sideCollapsed
  })
}

const items = [{
  key: '1',
  icon: () => h(PieChartOutlined),
  label: 'Option 1',
  title: 'Option 11',
}, {
  key: '2',
  icon: () => h(DesktopOutlined),
  label: 'Option 2',
  title: 'Option 2',
}, {
  key: '3',
  icon: () => h(InboxOutlined),
  label: 'Option 3',
  title: 'Option 3',
}, {
  key: 'sub1',
  icon: () => h(MailOutlined),
  label: 'Navigation One',
  title: 'Navigation One',
  children: [{
    key: '5',
    label: 'Option 5',
    title: 'Option 5',
  }, {
    key: '6',
    label: 'Option 6',
    title: 'Option 6',
  }, {
    key: '7',
    label: 'Option 7',
    title: 'Option 7',
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
}]


// watch(() => state.openKeys, (_val, oldVal) => {
//   state.preOpenKeys = oldVal;
// });
// const toggleCollapsed = () => {
//   state.collapsed = !state.collapsed;
//   state.openKeys = state.collapsed ? [] : state.preOpenKeys;
// };
</script>


<style scoped>
.app-name {
  display: block;
  float: left;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 700;
  margin-left: 12px;
}
</style>

<!-- <template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    :style="{ background: '#fff', overflow: 'auto', height: '100vh' }">
    <div
      class="leftSider"
      :style="{ width: collapsed ? '80px' : '200px', position: 'fixed', left: 0, top: 0, bottom: 0 }">
      <div
        :style="{ backgroundColor: theme == 'dark' ? '#001529' : '#fff' }"
        class="logo"
        style="height: 50px;">
        <svg style="width: 32px; height: 32px; margin-left: 24px; margin-top: 9px; display: block; float: left;" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" fill="currentColor" width="128" height="128"><title>Vue</title><desc>Created with Sketch.</desc><defs><linearGradient x1="69.644116%" y1="0%" x2="69.644116%" y2="100%" id="linearGradient-1"><stop stop-color="#29CDFF" offset="0%"></stop><stop stop-color="#148EFF" offset="37.8600687%"></stop><stop stop-color="#0A60FF" offset="100%"></stop></linearGradient><linearGradient x1="-19.8191553%" y1="-36.7931464%" x2="138.57919%" y2="157.637507%" id="linearGradient-2"><stop stop-color="#29CDFF" offset="0%"></stop><stop stop-color="#0F78FF" offset="100%"></stop></linearGradient><linearGradient x1="68.1279872%" y1="-35.6905737%" x2="30.4400914%" y2="114.942679%" id="linearGradient-3"><stop stop-color="#FA8E7D" offset="0%"></stop><stop stop-color="#F74A5C" offset="51.2635191%"></stop><stop stop-color="#F51D2C" offset="100%"></stop></linearGradient></defs><g id="Vue" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group" transform="translate(19.000000, 9.000000)"><path d="M89.96,90.48 C78.58,93.48 68.33,83.36 67.62,82.48 L46.6604487,62.2292258 C45.5023849,61.1103236 44.8426845,59.5728835 44.8296987,57.9626396 L44.5035564,17.5209948 C44.4948861,16.4458744 44.0537714,15.4195095 43.2796864,14.6733517 L29.6459999,1.53153737 C28.055475,-0.00160504005 25.5232423,0.0449126588 23.9900999,1.63543756 C23.2715121,2.38092066 22.87,3.37600834 22.87,4.41143746 L22.87,64.3864751 C22.87,67.0807891 23.9572233,69.6611067 25.885409,71.5429748 L63.6004615,108.352061 C65.9466323,110.641873 69.6963584,110.624605 72.0213403,108.313281" id="Path-Copy" fill="url(#linearGradient-1)" fill-rule="nonzero" transform="translate(56.415000, 54.831157) scale(-1, 1) translate(-56.415000, -54.831157) "></path><path d="M68,90.1163122 C56.62,93.1163122 45.46,83.36 44.75,82.48 L23.7904487,62.2292258 C22.6323849,61.1103236 21.9726845,59.5728835 21.9596987,57.9626396 L21.6335564,17.5209948 C21.6248861,16.4458744 21.1837714,15.4195095 20.4096864,14.6733517 L6.7759999,1.53153737 C5.185475,-0.00160504005 2.65324232,0.0449126588 1.12009991,1.63543756 C0.401512125,2.38092066 3.90211878e-13,3.37600834 3.90798505e-13,4.41143746 L3.94351218e-13,64.3864751 C3.94681177e-13,67.0807891 1.08722326,69.6611067 3.01540903,71.5429748 L40.7807092,108.401101 C43.1069304,110.671444 46.8180151,110.676525 49.1504445,108.412561" id="Path" fill="url(#linearGradient-2)" fill-rule="nonzero"></path><path d="M43.2983488,19.0991931 L27.5566079,3.88246244 C26.7624281,3.11476967 26.7409561,1.84862177 27.5086488,1.05444194 C27.8854826,0.664606611 28.4044438,0.444472651 28.9466386,0.444472651 L60.3925021,0.444472651 C61.4970716,0.444472651 62.3925021,1.33990315 62.3925021,2.44447265 C62.3925021,2.9858375 62.1730396,3.50407742 61.7842512,3.88079942 L46.0801285,19.0975301 C45.3051579,19.8484488 44.0742167,19.8491847 43.2983488,19.0991931 Z" id="Path" fill="url(#linearGradient-3)"></path></g></g></svg>
        <p v-if="!collapsed" :style="{ color: theme == 'dark' ? '#fff' : '#1890ff' }" class="app-name">Ant Design</p>
      </div>
      <a-menu
        style="padding: 0;margin: 0;border: 0;"
        v-model:selectedKeys="selectedKeys"
        :style="{ height: 'calc(100% - 50px)' }"
        :theme="theme"
        mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <bar-chart-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
        <a-menu-item key="5">
          <cloud-outlined />
          <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
          <appstore-outlined />
          <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
          <team-outlined />
          <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
          <shop-outlined />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import {
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

import { h, reactive } from 'vue';

export default {
  name: 'LeftSideLayout',
  components: {
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UserOutlined,
    MailOutlined,
    SettingOutlined
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ['2'],
      topSelectedKey: ['1'],
      theme: 'light',
      menu: null
    }
  },
  methods: {
    // onOpenChange(openKeys) {

    // },
    getItem(label, key, icon, children, type) {
      return {
        key,
        icon,
        children,
        label,
        type,
      };
    }
  },
  mounted() {
    this.menu = reactive([
      this.getItem('Navigation One', 'sub1', () => h(MailOutlined), [
        this.getItem('Option 1', '1'),
        this.getItem('Option 2', '2'),
        this.getItem('Option 3', '3'),
        this.getItem('Option 4', '4')
      ]),
      this.getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
        this.getItem('Option 5', '5'),
        this.getItem('Option 6', '6'),
        this.getItem('Submenu', 'sub3',null, [
          this.getItem('Option 7', '7'),
          this.getItem('Option 8', '8')
        ])
      ]),
      this.getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
        this.getItem('Option 9', '9'),
        this.getItem('Option 10', '10'),
        this.getItem('Option 11', '11'),
        this.getItem('Option 12', '12')
      ])
    ]);

  }
}
</script>


 -->

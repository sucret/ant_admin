<template>
  <a-form
    layout="horizontal"
    :model="detail"
    v-bind="{
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }">
    <a-form-item label="上级节点">
      <a-tree-select
        v-model:value="detail.parent_node_id"
        show-search
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="Please select"
        allow-clear
        tree-default-expand-all
        :tree-data="state.tree"
        tree-node-filter-prop="label"
        :field-names="{ children: 'children', label: 'title', value: 'node_id' }"
      >
      </a-tree-select>
    </a-form-item>
    <a-form-item label="节点名称">
      <a-input v-model:value="detail.title" placeholder="节点名称" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="标识符">
      <a-input v-model:value="detail.name" placeholder="节点标识符" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="组件">
      <a-input v-model:value="detail.component" placeholder="如果是页面，组件必填" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="路由地址">
      <a-input v-model:value="detail.path" placeholder="路由地址" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="节点类型">
      <a-radio-group v-model:value="detail.type" button-style="solid">
        <a-radio-button :value="1">菜单</a-radio-button>
        <a-radio-button :value="2">菜单&页面</a-radio-button>
        <a-radio-button :value="3">页面</a-radio-button>
        <a-radio-button :value="4">接口</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="图标">
      <a-select style="width: 100%" v-model:value="detail.icon" placeholder="请选择图标" option-label-prop="children" show-search>
        <a-select-option v-for="(icon, k) in state.icons" v-bind:key="k" :value="k" :label="k" :allow-clear="true">
          <component class="icon" :is="icon" />&nbsp;&nbsp;&nbsp;{{ k }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import * as antIcons from "@ant-design/icons-vue"
import { getNodeTree } from '@/api/node.js'

const state = reactive({
  icons: {},
  tree: []
})
const props = defineProps({
  readonly: {
    type: Boolean,
    default: true
  },
  detail: {}
})

onMounted(() => {
  // 初始化图标列表
  for (let k in antIcons) {
    if (antIcons[k].toString().indexOf('Outlined') > 0) {
      state.icons[k] = antIcons[k]
    }
  }
  // 初始化tree
  getNodeTree().then(data => {
    state.tree = data
    console.log(data)
  })
})

</script>

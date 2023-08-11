<template>
  <div>
  <a-form
    layout="horizontal"
    :model="detail"
    v-bind="{
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
    }">
    <a-form-item label="角色名称">
      <a-input v-model:value="detail.name" placeholder="角色名称" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="角色状态">
      <a-radio-group v-model:value="detail.status">
        <a-radio :value="1">启用</a-radio>
        <a-radio :value="2">禁用</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="角色权限">
      <a-tree
        v-model:checkedKeys="detail.node_ids"
        :default-expand-all="true"
        :auto-expand-parent="true"
        :height="460"
        :tree-data="state.node"
        checkable
        :disabled="readonly"
        :field-names="state.treeFieldNames"
      ></a-tree>
    </a-form-item>
  </a-form>
  </div>

</template>


<script setup>
import { reactive, onMounted } from 'vue';
import { getNodeTree  } from '@/api/node'

const state = reactive({
  node: [],
  selectedKeys: [],
  checkedKeys: [],
  treeFieldNames: {
    key: 'node_id'
  }
  
})
const props = defineProps({
  readonly: {
    type: Boolean,
    default: true
  },
  detail: {}
})

onMounted(() => {
  getNodeTree().then(data => {
    state.node = data
  })
})

</script>

<template>
  <div>
    <a-space style="margin-bottom: 14px">
      <a-button type="primary" @click="showDetail(0, 0, false)">新增节点</a-button>
      <a-button type="primary" @click="expandAll">全部展开</a-button>
      <a-button type="primary" @click="closeAll">全部收起</a-button>
    </a-space>
    
    <a-table size="middle"
      :columns="state.columns"
      :indent-size="12"
      bordered
      :data-source="state.list"
      :row-key="record => record.node_id"
      rowKey="node_id"
      :pagination="false"
      v-model:expanded-row-keys="state.expandedRowKeys"
      :scroll="{ x: 500 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'type'">
          <a-tag v-if="record.type == 1" color="pink">#菜单</a-tag>
          <a-tag v-if="record.type == 2" color="green">#菜单&页面</a-tag>
          <a-tag v-if="record.type == 3" color="cyan">#页面</a-tag>
          <a-tag v-if="record.type == 4" color="purple">#接口</a-tag>
        </template>
        <template v-else-if="column.key === 'icon'">
          <a-tag color="processing" v-if="record.icon">
            <template #icon>
              <component class="icon" :is="record.icon_component"/>&nbsp;{{ record.icon }}
            </template>
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <a @click="showDetail(0, record.node_id)">新增子节点</a>
          <a-divider type="vertical" />
          <a @click="showDetail(record.node_id, 0, true)">编辑</a>
          <a-divider type="vertical" />
          <a>删除</a>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="state.showViewModal" :title="state.title" :width="600" @ok="saveNodeDetail">
      <NodeDetailView
        ref="nodeDetail"
        :detail="state.detail"
        :readonly="state.modalReadonly"
        style="padding-top: 30px"/>
      <template #footer >
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button v-show="!state.modalReadonly" key="submit" type="primary" :loading="state.loading" @click="saveNodeDetail">提交</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>

import { reactive, onMounted } from 'vue';
import * as antIcons from "@ant-design/icons-vue"
import { saveNode, getNodeTree, getNodeDetail } from '@/api/node.js'

import NodeDetailView from './NodeDetailView.vue'

const icons = reactive({})

const columns = [
  {
    title: '节点名称',
    dataIndex: 'title',
    fixed: 'left',
    width: 260
  },
  {
    title: '节点ID',
    dataIndex: 'node_id',
    width: 90,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 160
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    width: 200,
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: 150
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    width: 200
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    fixed: 'right',
    width: 200,
  }
]
const state = reactive({
  list: [],
  columns: columns,
  title: '',
  loading: false,
  showViewModal: false,
  modalReadonly: false,
  detail: {
    parent_node_id: null,
    title: '',
    name: '',
    component: '',
    path: '',
    type: 1,
    icon: ''
  },
  icons: {},
  expandedRowKeys: []
})

const showDetail = (nodeId = 0, parentNodeId = 0, readonly = false) => {
  state.title = readonly ? '查看节点' : (nodeId ? '编辑节点' : '新增节点')
  state.readonly = readonly

  if (nodeId) {
    getNodeDetail(nodeId).then(data => {
      console.log(data)
      state.detail = data
      state.showViewModal = true
    })
  } else {

    state.detail = {
      parent_node_id: parentNodeId ? parentNodeId : null,
      title: '',
      name: '',
      component: '',
      path: '',
      type: 1,
      icon: ''
    }
    state.showViewModal = true
  }
}

const handleCancel = () => {
  state.showViewModal = false
}

const saveNodeDetail = () => {
  state.loading = true
  saveNode(state.detail).then(res => {
    state.showViewModal = false
    state.loading = false
    getData()
  })
}

const closeAll = () => {
  state.expandedRowKeys = []
}

const expandAll = () => {
  state.expandedRowKeys = []
  const getAllKeys = (list) => {
    for(let k in list) {
      state.expandedRowKeys.push(list[k].node_id)
      if (list[k].children) {
        getAllKeys(list[k].children)
      }
    }
  }

  getAllKeys(state.list)
}

const getData = () => {
  getNodeTree().then(data => {
    state.expandedRowKeys = []
    const formatData = (list) => {
      for(let k in list) {
        if (list[k].type == 1) {
          state.expandedRowKeys.push(list[k].node_id)
        }

        list[k].icon_component = eval('state.icons["' + list[k].icon + '"]')

        if (list[k].children) {
          formatData(list[k].children)
        }
      }
    }

    formatData(data)
    state.list = data
  })
}

onMounted(() => {
  // 初始化图标列表
  for (let k in antIcons) {
    if (antIcons[k].toString().indexOf('Outlined') > 0) {
      state.icons[k] = antIcons[k]
    }
  }

  getData()
})
</script>
<style></style>

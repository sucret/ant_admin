<template>
  <a-space style="margin-bottom: 14px">
    <a-button type="primary" @click="showDetail(0, false)">新增角色</a-button>
  </a-space>

  <div class="list">
    <a-table :dataSource="state.list" bordered size="middle" :columns="state.columns" :row-key="record => record.admin_id" rowKey="admin_id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-badge v-if="record.status == 1" status="processing" text="启用"/>
          <a-badge v-else-if="record.status == 2" status="error" text="禁用"/>
        </template>
        <template v-else-if="column.key === 'action'">
          <a @click="showDetail(record.role_id)">编辑</a>
          <a-divider type="vertical" />
          <a @click="showDetail(record.role_id, true)">查看</a>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="state.showViewModal" :title="state.modelTitle" :width="600" @ok="saveRoleDetail">
      <RoleDetailView
        ref="nodeDetail"
        :detail="state.detail"
        :readonly="state.modalReadonly"
        style="padding-top: 30px"/>
      <template #footer >
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button v-show="!state.modalReadonly" key="submit" type="primary" :loading="state.loading" @click="saveRoleDetail">提交</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { roleList, getRoleDetail, saveRole } from '@/api/role'
import RoleDetailView from './RoleDetailView.vue'
import { reactive, onMounted } from 'vue';
import message from 'ant-design-vue/es/message'

const columns = [
  {
    title: 'ID',
    dataIndex: 'role_id',
    key: 'role_id',
    width: 60
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 200
  },
  {
    title: '操作',
    key: 'action',
    width: 100
  }
]

const state = reactive({
  columns: columns,
  list: [],
  showViewModal: false,
  detail: {

  },
  modalReadonly: false,
  loading: false,
  modelTitle: ''
})

const saveRoleDetail = () => {
  console.log(state.detail)
  state.loading = true
  saveRole(state.detail).then(res => {
    console.log('saveRole', res)
    message.success(state.detail.role_id ? '更新成功' : '新增成功')
    state.loading = false
    handleCancel()
    getData()
  }).catch(err => {
    message.error(err)
    state.loading = false
  })

}

const showDetail = (roleId = 0, readonly = false) => {
  state.modelTitle = roleId ? (readonly ? '查看角色' : '编辑角色') : '新建角色'
  state.modalReadonly = readonly

  if (roleId) {
    getRoleDetail(roleId).then(data => {
      console.log(data)
      data.node_ids = []
      if (data.node_list) {
        for(let item of data.node_list) {
          data.node_ids.push(item.node_id)
        }
      }
      state.detail = data

      console.log(state.detail)
    })
  } else {
    state.detail = {
      name: '',
      status: 1,
      node_ids: []
    }
  }
  state.showViewModal = true
}
const handleCancel = () => {
  state.showViewModal = false
}

const getData = () => {
  roleList().then(data => {
    state.list = data
  })
}

onMounted(() => {
  getData()
})
</script>

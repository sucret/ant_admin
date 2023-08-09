<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">123</div>
    <div class="list">
      <a-table :dataSource="state.list"
        :columns="state.columns"
        :row-key="record => record.admin_id"
        rowKey="admin_id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'role_list'">
            <a-tag v-for="(role, k) in record.role_list"
              :key="k"
              color="green">{{ role.name }}</a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a @click="showDetail(record.admin_id, false)">编辑</a>
            <a-divider type="vertical" />
            <a @click="showDetail(record.admin_id, true)">查看</a>
          </template>
        </template>
      </a-table>
    </div>
    <a-modal v-model:open="state.showViewModal" :title="state.title" :width="600" @ok="saveAdminInfo">
      <AdminDetailView
        ref="adminDetail"
        :detail="state.detail"
        :readonly="state.modalReadonly"
        style="padding-top: 30px"/>
      <template #footer >
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button v-show="!state.modalReadonly" key="submit" type="primary" :loading="state.loading" @click="saveAdminInfo">提交</a-button>
      </template>
    </a-modal>
  </a-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { adminList } from '@/api/admin'
import { getAdminDetail, saveAdmin } from '@/api/admin'
import AdminDetailView from './AdminDetailView.vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'admin_id',
    key: 'admin_id',
    width: 60
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '角色',
    dataIndex: 'role_list',
    key: 'role_list',
  },
  {
    title: '电话号码',
    dataIndex: 'mobile',
    key: 'mobile'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at'
  },
  {
    title: '操作',
    key: 'action',
    width: 120
  }
]

const state = reactive({
  list: [],
  columns: columns,
  title: '',
  loading: false,
  showViewModal: false,
  modalReadonly: false,
  saveAdminDetail: false,
  detail: {}
})

const getAdminList = () => {
  adminList().then(data => {
    state.list = data
  })
}

const showDetail = (adminId, readonly) => {
  getAdminDetail(adminId).then(res => {
    // console.log('detail', res)
    res.role = []
    let k = 0
    for (k in res.role_info) {
      res.role.push(res.role_info[k].role_id)
    }
    res.password = ''
    state.detail = res
    state.modalReadonly = readonly
    state.showViewModal = true
    state.title = readonly ? '查看用户' : '编辑用户'
  })
}

onMounted(async () => {
  getAdminList()
})

const saveAdminInfo = () => {
  state.loading = true
  // console.log(state.detail)
  saveAdmin(state.detail).then((res) => {
    // console.log('saveDetail', res)
    state.loading = false
    state.showViewModal = false
    getAdminList()
  })
}

const handleCancel = () => {
  state.showViewModal = false
}

</script>

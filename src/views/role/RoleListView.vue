<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">角色列表</div>
    <div class="list">
      <a-table :dataSource="list" :columns="columns" :row-key="record => record.admin_id" rowKey="admin_id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-badge v-if="record.status == 1" status="processing" text="启用"/>
            <a-badge v-else-if="record.status == 2" status="error" text="禁用"/>
          </template>
          <template v-else-if="column.key === 'action'">
            <a>编辑</a>
          </template>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { roleList } from '@/api/role'
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

export default {
  name: 'RoleListView',
  data() {
    return {
      columns: columns,
      list: []
    }
  },
  methods: {
    onFinish(values) {
    }
  },
  mounted() {
    roleList().then(data => {
      this.list = data
    })
  }
}
</script>

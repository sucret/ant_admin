<template>
  <a-space style="margin-bottom: 14px">
    <a-button type="primary" @click="showDetail(0)" >新增任务</a-button>
  </a-space>

  <a-row>
    <a-col :span="24">
      <a-table :dataSource="state.list" bordered size="middle" :columns="state.columns" :row-key="record => record.task_id" rowKey="task_id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-badge v-if="record.status == 1" style="cursor: pointer" @click="changeTaskStatus(record.task_id, record.status)" status="processing" text="启用"/>
            <a-badge v-else-if="record.status == 2" style="cursor: pointer" @click="changeTaskStatus(record.task_id, record.status)" status="error" text="停用"/>
          </template>
          <template v-else-if="column.key === 'action'">
            <a @click="manualExec(record.task_id)">手动执行</a>
            <a-divider type="vertical" />
            <a @click="showDetail(record.task_id)">编辑</a>
            <a-divider type="vertical" />
            <a @click="showLog(record.task_id)">日志</a>
            <a-divider type="vertical" />
            <a @click="showDetail(record.task_id, true)">查看</a>
          </template>
        </template>
      </a-table>
    </a-col>
  </a-row>

  <a-modal v-model:open="state.showViewModal" :title="state.title" :width="600" @ok="saveTaskInfo">
    <CronTaskDetailView
      ref="adminDetail"
      :detail="state.detail"
      :readonly="state.modalReadonly"
      style="padding-top: 30px"/>
    <template #footer >
      <a-button key="back" @click="state.showViewModal = false">取消</a-button>
      <a-button v-show="!state.modalReadonly" key="submit" type="primary" :loading="state.loading" @click="saveTaskInfo">提交</a-button>
    </template>
  </a-modal>

  <a-modal
    v-model:open="state.showLogModal"
    title="执行日志"
    :width="1200"
    :bodyStyle="{ height: '520px', overflow: 'hidden', overflowY: 'scroll'}"
    :footer="null">
    <CronTaskLogListView
    :task-id="state.showLogTaskId"/>
  </a-modal>
</template>

<script setup>
import { getTaskList, getTaskDetail, executeTask, changeStatus, saveTask } from '@/api/cron_task' 
import { reactive, onMounted } from 'vue'

import CronTaskDetailView from './CronTaskDetailView.vue'
import message from 'ant-design-vue/es/message'
import CronTaskLogListView from './CronTaskLogListView.vue'

const columns = [
  {
    title: '任务ID',
    dataIndex: 'task_id',
    fixed: 'left'
  },
  {
    title: '任务名称',
    dataIndex: 'name'
  },
  {
    title: 'cron 表达式',
    dataIndex: 'spec'
  },
  {
    title: '命令',
    dataIndex: 'command'
  },
  {
    title: '进程数',
    dataIndex: 'process_num'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    // width: 80
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    width: 220
  }
]

const state = reactive({
  list: [],
  columns: columns,
  detail: {
    name: '',
    spec: '',
    command: '',
    process_num: '',
    timeout: '',
    retry_times: '',
    retry_interval: '',
    status: ''
  },
  showViewModal: false,
  title: '',
  loading: false,
  modalReadonly: false,
  showLogModal: false,
  showLogTaskId: 0
})

const getData = () => {
   getTaskList().then(data => {
    state.list = data
  })
}

const saveTaskInfo = () => {
  console.log(state.detail)
  state.loading = true
  state.detail.process_num = parseInt(state.detail.process_num)
  saveTask(state.detail).then(data => {
    message.success(state.detail.task_id ? '更新成功' : '新增成功')
    state.showViewModal = false
    getData()
  }).catch(err => {
    message.error(err)
  }).finally(() => {
    state.loading = false
  })
}

const manualExec = (taskId) => {
  executeTask(taskId).then(data => {
    message.success('任务已在后台异步执行')
  }).catch(err => {
    message.error('执行失败，失败信息:' + err)
  })
}

const changeTaskStatus = (taskId, status) => {
  status = status == 1 ? 2 : 1
  changeStatus(taskId, status).then(data => {
    getData()
  }).catch(err => {
    message.error(err)
  })
}

const showLog = (taskId) => {
  state.showLogTaskId = taskId
  state.showLogModal = true
}

const showDetail = (taskId, disabled = false) => {
  state.modalReadonly = disabled
  state.title = taskId ? (disabled ? '查看任务' : '编辑任务') : '创建任务'

  if (taskId) {
    state.loading = true
    getTaskDetail(taskId).then(data => {
      state.detail = data
      state.showViewModal = true
    }).catch(err => {
      message.error(err)
    }).finally(() => {
      state.loading = false
    })
  } else {
    state.detail = {
      name: '',
      spec: '',
      command: '',
      process_num: null,
      timeout: '',
      retry_times: '',
      retry_interval: '',
      status: ''
    }
    state.showViewModal = true
  }
}

onMounted(() => {
  getData()
})
</script>

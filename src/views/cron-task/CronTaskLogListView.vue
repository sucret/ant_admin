<template>
  <div ref="container">
    <a-form layout="inline" class="ant-advanced-search-form"  ref="formRef" name="advanced_search">
      <a-row style="width: 100%;" :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item name="date-picker" label="任务执行时间">
            <a-range-picker show-time @change="startDatePicked" :presets="state.dateRangePresets" :format="state.dateFormat" :locale="state.locale"/>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="date-picker" label="任务">
            <a-select
              v-model:value="state.form.task_id"
              :options="state.taskList"
              :field-names="{ label: 'name', value: 'task_id' }"
              ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="date-picker" label="任务状态">
            <a-select
              v-model:value="state.form.status"
              :options="state.taskStatusEnum"
            ></a-select>
          </a-form-item>
          </a-col>
        <a-col :span="12">
          <a-form-item name="date-picker" label="执行结束时间">
            <a-range-picker show-time :presets="state.dateRangePresets" @change="endDatePicked" :format="state.dateFormat" :locale="state.locale"/>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="date-picker" label="">
            <a-button type="primary" @click="getLogData">查询</a-button>
            <a-button style="margin: 0 18px" >重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <a-row style="padding-top: 16px;">
      <a-col :span="24">
        <a-table
          :scroll="{ y: state.tableHeight }"
          :dataSource="state.list"
          :loading="state.loading"
          bordered size="middle"
          :columns="state.columns"
          :row-key="record => record.task_log_id"
          :pagination="{ current: state.page, pageSize: state.pageSize, total: state.total, size: 'middle', showQuickJumper: true }"
          @change="tableChange"
          rowKey="task_log_id">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-badge v-if="record.status == 1" status="processing" text="执行中"/>
              <a-badge v-else-if="record.status == 2" status="success" text="执行完成"/>
              <a-badge v-else-if="record.status == 3" status="error" text="执行失败"/>
              <a-badge v-else-if="record.status == 4" status="warning" text="手动取消"/>
            </template>
            <template v-else-if="column.key === 'action'">  
              <a v-if="record.status == 1" @click="stopTaskExec(record.task_log_id)">终止执行</a>
            </template>
            <template v-else-if="column.key === 'log'">
              <span>{{ record.log.substring(0, 60) }}</span>
            </template>
          </template>
          <template #expandedRowRender="{ record }">
              <pre>{{ record.log }}</pre>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { getTaskLog, getTaskList, stopTask } from '@/api/cron_task'
import { ref, onMounted, reactive, watch, nextTick, onUnmounted } from 'vue'
import message from 'ant-design-vue/es/message'
import dayjs from 'dayjs'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const columns = [
  {
    title: '日志ID',
    dataIndex: 'task_log_id',
    width: 80
  },
  {
    title: '任务ID',
    dataIndex: 'task_id',
    width: 60
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    key: 'status',
    width: 90
  },
  {
    title: '执行结果',
    dataIndex: 'log',
    key: 'log'
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    width: 166
  },
  {
    title: '结束时间',
    dataIndex: 'end_time',
    width: 166
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 80
  }
]

const dateRangePresets = [
  { label: '最近5分钟', value: [dayjs().add(-5, 'm'), dayjs()] },
  { label: '最近30分钟', value: [dayjs().add(-30, 'm'), dayjs()] },
  { label: '最近1小时', value: [dayjs().add(-1, 'h'), dayjs()] },
  { label: '最近1天', value: [dayjs().add(-1, 'd'), dayjs()] },
]

const taskStatusEnum = [
  { label: '执行中', value: 1 },
  { label: '执行成功', value: 2 },
  { label: '执行失败', value: 3 },
  { label: '手动取消', value: 4 }
]

const props = defineProps({
  taskId: {
    type: Number,
    required: false,
    default: 0
  }
})

const state = reactive({
  page: 1,
  pageSize: 20,
  list: [],
  total: 0,
  pageSizeOptions: ['10', '20', '50', '100'],
  columns: columns,
  dateRangePresets: dateRangePresets,
  taskList: [],
  form: {
    task_id: null,
    end_time: {
      start_time: null,
      end_time: null
    },
    start_time: {
      start_time: null,
      end_time: null
    },
    status: null
  },
  taskStatusEnum: taskStatusEnum,
  locale: locale,
  dateFormat: 'YYYY/MM/DD HH:mm:ss',
  tableHeight: props.taskId ? 312 : (document.documentElement.clientHeight - 318),
  loading: false
})

const getLogData = () => {
  state.page = 1
  getData()
}

const startDatePicked = (val) => {
  state.form.start_time.start_time = getCheckedData(val[0])
  state.form.start_time.end_time = getCheckedData(val[1])
}

const endDatePicked = (val) => {
  state.form.end_time.start_time = getCheckedData(val[0])
  state.form.end_time.end_time = getCheckedData(val[1])
}

const getCheckedData = (val) => {
  return val.$y + '-' + val.$M + '-' + val.$D + ' ' + val.$H + ':' + val.$m + ':' + val.$s
}

const getData = () => {
  state.loading = true
  const param = state.form
  param.page = state.page
  param.page_size = state.pageSize

  getTaskLog(param).then(data => {
    state.list = data.list
    state.total = data.total
    state.loading = false
  }).catch(err => {
    message.error(err)
  })
}

const initFormItem = () => {
  getTaskList().then(data => {
    console.log('data', data)
    state.taskList = data
  })
}

const tableChange = (val) => {
  state.page = val.current
  state.pageSize = val.pageSize
  getData()
}

const getHeight = () => {
  nextTick(() => {
    state.tableHeight = document.documentElement.clientHeight - 318 + "px";
  })
}

const stopTaskExec = (taskLogId) => {
  state.loading = true
  stopTask(taskLogId).then(data => {
    message.success('终止成功')
    getData()
  }).catch(err => {
    message.error('终止失败，失败原因：' + err + '，稍后将刷新日志列表', 3)
    setTimeout(() => {
      getData()
    }, 1000);
  })
}

onMounted(() => {
  initFormItem()
  if (props.taskId) {
    state.form.task_id = props.taskId
  }
  getData()

  window.addEventListener('resize', getHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', getHeight)
})

watch(() => props.taskId, (newVal, oldVal) => {
  state.form.task_id = newVal
  getData()
})
</script>

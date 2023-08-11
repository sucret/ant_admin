<template>
  <a-card>
    <a-form :model="state.form">
      <a-row>
      <a-col :span="17" style="padding-right: 10px;">
        <a-form-item label="" name="sql">
          <a-textarea v-model:value="state.form.sql" style="height: 178px" />
          <a-alert message="仅支持查询语句。" style="margin-top: 10px;" type="warning" show-icon/>
        </a-form-item>
      </a-col>
      <a-col :span="7" style="padding-left: 10px;">
        <a-form-item>
          <a-select ref="table_name" v-model:value="state.form.tableName" placeholder="查看表结构" @change="tableChange">
            <a-select-option v-for="(val, index) in state.tableList" :key="index" :value="val.table_name">{{ val.table_name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select ref="page_size" v-model:value="state.form.pageSize">
            <a-select-option :value="20">查询20条</a-select-option>
            <a-select-option :value="50">查询30条</a-select-option>
            <a-select-option :value="100">查询100条</a-select-option>
            <a-select-option :value="500">查询500条</a-select-option>
            <a-select-option :value="1000">查询1000条</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="dashed" @click="genQuery">SELECT * FROM</a-button>
          <!-- <a-button ghost>Default</a-button> -->
        </a-form-item>
        <a-form-item>
          <a-button @click="getData" type="primary" style="margin-right: 10px;" :loading="state.loading">SQL查询</a-button>
          <a-button @click="explain" type="primary" :loading="state.loading">执行计划</a-button>
        </a-form-item>
      </a-col>
      </a-row>
    </a-form>
  </a-card>

  <a-card v-for="(val, index) in state.response" :key="index" style="margin-top: 20px" :title="'查询结果（' + val.data.length + '）'">
    <template #extra><span style="font-size: 14px;">{{ val.sql }}</span></template>
    <a-table
      :columns="val.columns"
      :data-source="val.data"
      :pagination="{ pageSize: 10, position: 'topLeft' }"
      bordered
      :scroll="{ x: true }"
      size="small">
      <!-- <pre slot="createTable" slot-scope="value">{{ value }}</pre>
      <pre slot="log" slot-scope="value">{{ value }}</pre> -->
    </a-table>
  </a-card>
</template>
<script setup>
import { reactive, onMounted } from 'vue';
import { tableList, executeSql } from '@/api/mysql'
import message from 'ant-design-vue/es/message'

const state = reactive({
  form: {
    sql: '',
    tableName: '',
    pageSize: 100
  },
  tableList: [],
  loading: false,
  response: []
})

const tableChange = (val) => {
  console.log(val)
  state.form.tableName = val
}


const genQuery = () => {
  state.form.sql = 'SELECT * FROM `' + state.form.tableName + '`'
}

const explain = () => {
  if (!state.form.sql) {
    message.error('请输入正确的sql语句')
    return
  }

  const sql = 'EXPLAIN ' + state.form.sql
  execute(sql)
}

const execute = (sql) => {
  state.loading = true
  executeSql(sql).then(data => {
    console.log(data)

    const columns = []
    const dataSource = []
    let k = ''
    let key = ''
    let index = 0
    for (key in data) {
      var columnData = {}
      for (k in data[key]) {
        if (key === '0') {
          if (k === 'Create Table') {
            columns.push({ title: k, dataIndex: k, key: k, scopedSlots: { customRender: 'createTable' } })
          } else if (k === 'log') {
            columns.push({ title: k, dataIndex: k, key: k, scopedSlots: { customRender: 'log' } })
          } else {
            columns.push({ title: k, dataIndex: k, key: k })
          }
        }
        columnData[k] = data[key][k]
      }

      index += 1
      columnData['key'] = index
      dataSource.push(columnData)
    }

    state.response.unshift({ columns: columns, data: dataSource, sql: sql })
  }).catch(err => {
    message.error(err)
  }).finally(() => {
    state.loading = false
  })
}

const getData = () => {
  execute(state.form.sql)
}

onMounted(() => {
  tableList().then(data => {
    console.log(data)
    state.tableList = data
  })
})

</script>

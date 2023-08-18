<template>
  <a-form
    layout="horizontal"
    :model="detail"
    v-bind="{
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }">
    <a-form-item label="任务名称">
      <a-input v-model:value="detail.name" required placeholder="请输入任务名称" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="cron表达式">
      <a-input v-model:value="detail.spec" placeholder="请输入cron表达式" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="任务状态">
      <a-radio-group v-model:value="detail.status">
        <a-radio :value="1">启用</a-radio>
        <a-radio :value="2">停用</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="执行命令">
      <a-input v-model:value="detail.command" placeholder="请输入执行命令" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="进程数">
      <a-input v-model:value="detail.process_num" placeholder="请输入进程数" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="超时时间">
      <a-input v-model:value="detail.timeout" placeholder="请输入超时时间" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="重试次数">
      <a-input v-model:value="detail.retry_times" placeholder="请输入重试次数" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="重试间隔时间">
      <a-input v-model:value="detail.retry_interval" placeholder="请输入间隔重试时间" :readonly="readonly"/>
    </a-form-item>
  </a-form>
</template>

<script setup>

const props = defineProps({
  readonly: {
    type: Boolean,
    default: true
  },
  detail: {}
})


</script>

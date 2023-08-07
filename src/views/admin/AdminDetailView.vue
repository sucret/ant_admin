<template>
  <a-form
    layout="horizontal"
    :model="detail"
    v-bind="{
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }">
    <a-form-item label="用户名">
      <a-input v-model:value="detail.username" placeholder="请输入用户名" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="detail.nickname" placeholder="请输入昵称" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model:value="detail.mobile" placeholder="请输入手机号" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="detail.password" placeholder="请输入密码，未输入表示不做更改" :readonly="readonly"/>
    </a-form-item>
    <a-form-item label="角色">
      <a-checkbox-group v-model:value="detail.role" :disabled="readonly">
        <a-row>
          <a-col :span="8" v-for="(role, k) in detail.role_list" v-bind:key="k">
            <a-checkbox style="line-height: 32px" :value="role.role_id" name="role">{{ role.name }}</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
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

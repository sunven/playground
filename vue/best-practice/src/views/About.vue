<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      <button v-permission="['admin', 'editor']">editor button</button>
      <button v-permission="['admin']">admin button</button>
    </p>
    <!-- 指令无法处理以下这种情况 -->
    <el-tabs>
      <el-tab-pane
        label="⽤户管理"
        name="first"
        v-permission="['admin', 'editor']"
      >
        ⽤户管理</el-tab-pane
      >
      <el-tab-pane
        label="配置管理"
        name="second"
        v-permission="['admin', 'editor']"
      >
        配置管理</el-tab-pane
      >
      <el-tab-pane label="⻆⾊管理" name="third" v-permission="['admin']">
        ⻆⾊管理</el-tab-pane
      >
      <el-tab-pane
        label="定时任务补偿"
        name="fourth"
        v-permission="['admin', 'editor']"
      >
        定时任务补偿</el-tab-pane
      >
      <!-- 用这种方式 -->
      <el-tab-pane v-if="checkPermission(['admin'])"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  methods: {
    checkPermission(permissionRoles) {
      // reles 用户的角色权限
      const roles = []
      return roles.some(role => {
        return permissionRoles.includes(role)
      })
    },
  },
}
</script>

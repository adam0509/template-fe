<template>
  <el-container style="height: 100vh; width: 100vw, ba">
    <!-- Header -->
    <el-header
      style="
        width: 100vw;
        background-color: #409eff;
        color: white;
        text-align: center;
      "
    >
      Admin Dashboard
    </el-header>

    <el-container>
      <!-- Sidebar Menu -->
      <el-aside width="200px" style="background-color: #545c64">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" :route="{ name: 'dashboard' }">
            <i class="el-icon-user"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item index="2" :route="{ name: 'admins' }">
            <i class="el-icon-menu"></i>
            <span slot="title">管理员</span>
          </el-menu-item>
          <el-menu-item index="10" :route="{ name: 'logs' }">
            <i class="el-icon-setting"></i>
            <span slot="title">日志管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- Main Content -->
      <el-main style="padding: 20px">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup></script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 60px;
}
</style>

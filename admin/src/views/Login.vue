<template>
  <el-card class="login-card">
    <h2 class="login-title">模板-管理系统</h2>
    <div class="input-group">
      <el-input
        v-model="username"
        placeholder="Enter your username"
        clearable
        :error="errors.username"
      ></el-input>
    </div>
    <div class="input-group">
      <el-input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        clearable
        :error="errors.password"
      ></el-input>
    </div>
    <el-button type="primary" @click="handleLogin" :loading="loading">
      登录
    </el-button>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../api/admin";
import { useRouter } from "vue-router";
import { adminStore } from "../stores/admin";

const router = useRouter();

// State variables
const username = ref("");
const password = ref("");
const loading = ref(false);

// Error messages
const errors = ref({
  username: "",
  password: "",
});

const handleLogin = async () => {
  // Clear previous errors
  errors.value.username = "";
  errors.value.password = "";

  // Basic validation
  if (!username.value) {
    errors.value.username = "Username is required";
  }
  if (!password.value) {
    errors.value.password = "Password is required";
  }

  if (!errors.value.username && !errors.value.password) {
    loading.value = true;
    try {
      // Replace with your actual login API endpoint
      const response = await login({
        adminName: username.value,
        password: password.value,
      });

      if (response.status == 200) {
        // Store the token
        localStorage.setItem("token", response.data.accessToken);
        adminStore.adminId = response.data.adminId;

        // Redirect to home page
        router.push({ name: "home" });
      }
    } catch (error) {
      // Handle error (e.g., invalid credentials)
      alert(error)
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}
</style>

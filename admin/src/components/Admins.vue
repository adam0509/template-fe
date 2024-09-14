<template>
  <el-container>
    <el-header
      style="background-color: #5da6ee; color: white; text-align: center"
    >
      管理员
    </el-header>

    <el-main>
      <div class="search-add">
        <el-button type="primary" @click="openCreateEntity">新增</el-button>

        <!-- 搜索 -->
        <el-input
          v-model="searchQuery"
          placeholder="搜索管理员"
          @change="fetchEntities"
          style="width: 200px"
        />
      </div>

      <!-- 列表 -->
      <el-table
        :data="entities"
        style="width: 100%; margin-top: 20px"
        @sort-change="sortChange"
      >
        <!-- 变量 -->
        <el-table-column
          prop="adminId"
          label="ID"
          sortable="custom"
        ></el-table-column>
        <el-table-column prop="adminName" label="账号" sortable="custom">
        </el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <img style="height: 30px" :src="prefix + scope.row.avatar" alt="" />
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" @click="editEntity(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="deleteEntity(scope.row.adminId)"
              >删除</el-button
            >
            <!-- 变量 -->
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="limit"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />

      <!-- 新增弹窗 -->
      <el-dialog v-model="createDialogVisible" title="新增食材">
        <el-form :model="newEntity" ref="ingredientForm" label-width="120px">
          <!-- 变量 -->
          <el-form-item label="头像">
            <el-upload
              ref="upload"
              action=""
              :auto-upload="false"
              :limit="1"
              list-type="picture-card"
              accept="image/*"
              @change="handleImageChange"
            >
              +
            </el-upload>
          </el-form-item>
          <el-form-item label="管理员账号">
            <el-input v-model="newEntity.adminName" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="newEntity.password" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addEntity">确认新增</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 编辑弹窗 -->
      <el-dialog v-model="editDialogVisible" title="编辑食材">
        <el-form :model="editEntityForm" label-width="120px">
          <!-- 变量 -->
          <el-form-item label="头像">
            <el-upload
              action=""
              :auto-upload="false"
              :limit="1"
              accept="image/*"
              @change="handleImageChange"
            >
              <el-button type="primary">选择图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="管理员账号">
            <el-input v-model="editEntityForm.adminName" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editEntityForm.password" />
          </el-form-item>
        </el-form>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateEntity">确定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getEntities,
  createEntity,
  changeEntity,
  destroyEntity,
} from "../api/admin";

// 图片数据
const file = ref(null);
const prefix = ref(""); // 图片前缀
const upload = ref();

// Data models
const entities = ref([]);

// 分页数据
const totalItems = ref(0);
const totalPages = ref(1);
const currentPage = ref(1);
const limit = 10;

// 搜索数据
const searchQuery = ref(""); // Search keyword

// 排序数据
const sortField = ref("adminId"); // 变量
const sortOrder = ref("ASC"); // Default ascending order

// 变量
const newEntity = ref({
  adminName: "",
  password: "",
});

// 变量
const editEntityForm = ref({
  ingredientId: null,
  adminName: "",
  password: "",
});

const editDialogVisible = ref(false); // 编辑窗口
const createDialogVisible = ref(false); // 新增窗口

// Methods
const fetchEntities = async (page = 1, limit = 10) => {
  try {
    const response = await getEntities({
      page,
      limit,
      search: searchQuery.value,
      sortBy: sortField.value,
      order: sortOrder.value,
    });
    entities.value = response.data.admins; // 变量
    prefix.value = response.data.prefix; // 图片前缀
    // 分页数据
    totalItems.value = response.data.totalItems;
    totalPages.value = response.data.totalPages;
    currentPage.value = response.data.currentPage;
  } catch (error) {
    console.error("Error fetching:", error);
  }
};

// 分页函数
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchEntities(page, limit);
};

const addEntity = async () => {
  try {
    // 创建formData
    let formData = new FormData();
    // 变量
    formData.append("avatar", file.value); // 将图片的raw作为image发送
    formData.append("adminName", newEntity.value.adminName);
    formData.append("password", newEntity.value.password);

    await createEntity(formData);
    fetchEntities();
    // 变量
    newEntity.value.avatar = "";
    newEntity.value.adminName = "";
    newEntity.value.password = "";

    file.value = null; // 清空图片数据
    upload.value.clearFiles(); // 清空图片列表

    createDialogVisible.value = false; // 关闭新增弹窗
  } catch (error) {
    console.error("Error adding:", error);
  }
};

const openCreateEntity = () => {
  createDialogVisible.value = true;
};

const editEntity = (entity) => {
  editEntityForm.value = { ...entity };
  editDialogVisible.value = true;
};

const updateEntity = async () => {
  try {
    let formData = new FormData();
    // 变量
    formData.append("avatar", file.value); // 将图片的raw作为image发送
    formData.append("adminName", editEntityForm.value.adminName);
    formData.append("password", editEntityForm.value.password);

    await changeEntity(editEntityForm.value.adminId, formData); // 变量
    fetchEntities();
    editDialogVisible.value = false;
  } catch (error) {
    console.error("Error updating:", error);
  }
};

const deleteEntity = async (entityId) => {
  try {
    await destroyEntity(entityId);
    fetchEntities();
  } catch (error) {
    console.error("Error deleting:", error);
  }
};

const sortChange = (e) => {
  if (e.order == "descending") {
    sortField.value = e.prop;
    sortOrder.value = "DESC";
    fetchEntities();
  } else if (e.order == "ascending") {
    sortField.value = e.prop;
    sortOrder.value = "ASC";
    fetchEntities();
  }
};

// 将图片的raw赋值到file
const handleImageChange = (f) => {
  file.value = f.raw;
};

// Lifecycle hooks
onMounted(() => {
  fetchEntities();
});
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 60px;
}
.el-main {
  padding: 20px;
}
.search-add {
  display: flex;
  justify-content: space-between;
}
</style>

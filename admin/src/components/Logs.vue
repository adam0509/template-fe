<template>
  <el-container>
    <el-header
      style="background-color: #5da6ee; color: white; text-align: center"
    >
      操作日志
    </el-header>

    <el-main>
      <div class="search-add">
        <!-- 搜索 -->
        <el-input
          v-model="searchQuery"
          placeholder="搜索日志"
          @change="fetchlogs"
          style="width: 200px"
        />
      </div>

      <!-- 列表 -->
      <el-table
        :data="logs"
        style="width: 100%; margin-top: 20px"
        @sort-change="sortChange"
      >
        <!-- 变量 -->
        <el-table-column
          prop="logId"
          label="ID"
          sortable="custom"
        ></el-table-column>
        <el-table-column prop="peopleId" label="操作者" sortable="custom">
        </el-table-column>
        <el-table-column prop="entity" label="操作对象" sortable="custom">
        </el-table-column>
        <el-table-column
          prop="operationType"
          label="操作类型"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column prop="details" label="详细" sortable="custom">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" sortable="custom">
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
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getLogs } from "../api/log";

// Data models
const logs = ref([]);

// 分页数据
const totalItems = ref(0);
const totalPages = ref(1);
const currentPage = ref(1);
const limit = 10;

// 搜索数据
const searchQuery = ref(""); // Search keyword

// 排序数据
const sortField = ref("logId"); // 变量
const sortOrder = ref("DESC"); // Default ascending order

// Methods
const fetchlogs = async (page = 1, limit = 10) => {
  try {
    const response = await getLogs({
      page,
      limit,
      search: searchQuery.value,
      sortBy: sortField.value,
      order: sortOrder.value,
    });
    console.log(response.data)
    logs.value = response.data.logs; // 变量

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
  fetchlogs(page, limit);
};

const sortChange = (e) => {
  if (e.order == "descending") {
    sortField.value = e.prop;
    sortOrder.value = "DESC";
    fetchlogs();
  } else if (e.order == "ascending") {
    sortField.value = e.prop;
    sortOrder.value = "ASC";
    fetchlogs();
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchlogs();
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

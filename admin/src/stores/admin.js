import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const adminStore = defineStore('admin', () => {
  const adminId = ref(0)

  return { adminId }
})

import { defineStore } from 'pinia'
// import type { Ilocation } from './user.model'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const location = ref()
    const userInfo = ref()
    return {
      token,
      location,
      userInfo
    }
  },
  {
    unistorage: true
  }
)

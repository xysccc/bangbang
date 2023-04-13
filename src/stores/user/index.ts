import { defineStore } from 'pinia'
// import type { Ilocation } from './user.model'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const location = ref()
    return {
      token,
      location
    }
  },
  {
    unistorage: true
  }
)

import userService from '@/api/user'
import { defineStore } from 'pinia'
// import type { Ilocation } from './user.model'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const location = ref()
    const userInfo = ref()
    const getUserInfo = async () => {
      const { data } = await userService.GetUserInfo()
      userInfo.value = data.result
      return data.result
    }
    return {
      token,
      location,
      userInfo,
      getUserInfo
    }
  },
  {
    unistorage: true
  }
)

import userService from '@/api/user'
import { defineStore } from 'pinia'
import type * as UserModel from '@/api/user/user.model'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const location = ref()
    const userInfo = ref()
    const myHelp = ref()
    const myRelease = ref()
    const getUserInfo = async () => {
      const { data } = await userService.GetUserInfo()
      userInfo.value = data.result
      return data.result
    }
    const getMyHelp = async (params: UserModel.IMyHelpParm) => {
      const { data } = await userService.getMyHelp(params)
      if (data.code !== 1) return
      myHelp.value = data.result
    }
    const getMyRelease = async (params: UserModel.IMyReleaseParm) => {
      const { data } = await userService.getMyRelease(params)
      if (data.code !== 1) return
      myRelease.value = data.result
    }
    return {
      token,
      location,
      userInfo,
      getUserInfo,
      getMyHelp,
      getMyRelease,
      myHelp,
      myRelease
    }
  },
  {
    unistorage: true
  }
)

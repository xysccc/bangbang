/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-11 18:22:42
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-03 17:08:11
 * @FilePath: \bangbang\src\stores\user\index.ts
 */
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
    const myCollet = ref()
    const myHistory = ref()
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
    const getMyCollet = async (params: UserModel.IMyCollectParm) => {
      const { data } = await userService.getMyCollet(params)
      if (data.code !== 1) return
      myCollet.value = data.result
    }
    const getMyHistory = async (params: UserModel.IMyHistoryParm) => {
      const { data } = await userService.getMyHistory(params)
      if (data.code !== 1) return
      myHistory.value = data.result
    }
    return {
      token,
      location,
      userInfo,
      getUserInfo,
      getMyHelp,
      getMyRelease,
      getMyCollet,
      getMyHistory,
      myHelp,
      myRelease,
      myCollet,
      myHistory
    }
  },
  {
    unistorage: true
  }
)

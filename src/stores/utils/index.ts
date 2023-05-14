/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-18 21:07:38
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-11 08:46:44
 * @FilePath: \bangbang\src\stores\utils\index.ts
 */
import { defineStore } from 'pinia'
// import type { Ilocation } from './user.model'
export const useUtils = defineStore(
  'utils',
  () => {
    const timeInfo = {
      //发送验证码button的延时器
      timer: ref(),
      //当前剩余秒数
      count: ref(0),
      //发送验证码按钮的秒数
      time_count: 60,
      //切换发送验证码文本
      isActive: ref(true)
    }
    const getTimerInfo = () => timeInfo

    // 过审变量  为false过审
    const isExamine = ref(true)
    return {
      timeInfo,
      getTimerInfo,
      isExamine
    }
  },
  {
    unistorage: true
  }
)

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
      time_count: 5,
      //切换发送验证码文本
      isActive: ref(true)
    }
    const getTimerInfo = () => timeInfo
    return {
      timeInfo,
      getTimerInfo
    }
  },
  {
    unistorage: true
  }
)

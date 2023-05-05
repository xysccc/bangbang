/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-25 11:51:59
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-05 19:01:19
 * @FilePath: \bangbang\src\utils\date.ts
 */

export const changeDate = (dateString: string) => {
  // 将字符串转换为日期对象
  let date = new Date(dateString)
  // 获取该日期对象的时间戳和当前时间的时间戳
  let dateTimestamp = date.getTime()
  let currentTimestamp = Date.now()
  //   时间戳差值
  let timeDiff = dateTimestamp - currentTimestamp
  // 剩余天数
  let dayDiff = Math.ceil(timeDiff / (24 * 60 * 60 * 1000)) // 天数，取整
  let hourDiff = Math.floor(timeDiff / (60 * 60 * 1000)) % 24 // 小时数，取整
  let minuteDiff = Math.floor(timeDiff / (60 * 1000)) % 60 // 分钟数，取整
  let secondDiff = Math.floor(timeDiff / 1000) % 60 // 秒数，取整
  // 判断时间戳大小
  // if (dateTimestamp > currentTimestamp) {
  //   console.log('该日期字符串大于当前时间。');
  // } else {
  //   console.log('该日期字符串小于或等于当前时间。');
  // }
  return {
    dayDiff,
    hourDiff
  }
}
// 消息列表处理时间
export const getTime2 = (str: any) => {
  const value = new Date(str)
  const HH = value.getHours() < 10 ? '0' + value.getHours() : value.getHours() //时
  const MM =
    value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes() //分
  if (!value) return
  return `${HH}:${MM}`
}
//调日历加5天
export function addDaysToDate(date: Date, days: number) {
  // 将日期转换为时间戳
  let timestamp = date.getTime()

  // 将时间戳增加指定天数的毫秒数
  let daysInMilliseconds = days * 24 * 60 * 60 * 1000
  let newTimestamp = timestamp + daysInMilliseconds

  // 使用新的时间戳创建一个新的Date对象
  let newDate = new Date(newTimestamp)

  // 返回增加后的日期
  return newDate
}

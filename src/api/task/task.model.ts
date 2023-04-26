/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-19 15:14:07
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-26 14:42:23
 * @FilePath: \bangbang\src\api\task\task.model.ts
 */
import type { IApiResponse } from './../types'

export interface IGetTaskClassData {
  id: number
  name: string
}
export interface IGetTaskClassResp extends IApiResponse {
  result: IGetTaskClassData
}
export interface IAddTaskparm {
  details: string
  limitTime: string
  location: string
  money: number
  title: string
  typeId: string
  urgent: number
  urls: string[]
}
export interface IAddTaskData {}
export interface IAddTaskResp extends IApiResponse {
  result: IAddTaskData
}
export interface ITaskListParm {
  page: number
  pageSize: number
  search?: string
  typeId?: string
}
export interface ITaskListData {
  countId: string
  current: number
  hitCount: true
  maxLimit: number
  optimizeCountSql: true
  orders: [
    {
      asc: true
      column: string
    }
  ]
  pages: number
  records: [
    {
      details: string
      head: string
      id: string
      isLike: number
      limitTime: string
      location: string
      title: string
      username: string
    }
  ]
  searchCount: true
  size: number
  total: number
}
export interface ITaskListResp extends IApiResponse {
  result: IAddTaskData
}
export interface ITaskCollectParm {
  taskId: string
}
export interface ITaskCollectResp extends IApiResponse {
  result: string
}
export interface ITaskoneParm extends ITaskCollectParm {}
export interface ITaskoneData {
  details: string
  fromHead: string
  fromId: string
  fromName: string
  fromUrls: ['string']
  isLike: number
  limitTime: string
  location: string
  money: number
  releaseTime: string
  state: number
  title: string
  toHead: string
  toId: string
  toName: string
  toUrls: [string]
  typeId: string
  urgent: number
}
export interface ITaskoneResp {
  result: ITaskoneData
}

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
  head: string
  id: string
  isLike: number
  limitTime: string
  location: string
  title: string
  username: string
}
export interface ITaskoneResp {}

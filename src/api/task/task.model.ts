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
  type: string
  urgent: number
  urls: string[]
}
export interface IAddTaskData {}
export interface IAddTaskResp extends IApiResponse {
  result: IAddTaskData
}

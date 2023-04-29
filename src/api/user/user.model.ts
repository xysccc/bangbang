/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-11 18:22:42
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-29 20:30:14
 * @FilePath: \bangbang\src\api\user\user.model.ts
 */
import type { IApiResponse } from './../types'
import type { ITaskListData } from '../task/task.model'
export interface GetUserListParm {
  position: number
}

export interface GetUserListResp extends IApiResponse {
  data: GetUserListData[]
}

export interface GetUserListData {
  id: string
  background: string
  birthday: string
  email: string
  head: string
  phone: string
  sex: number
  signature: string
  username: string
}
export interface UserLogin {
  email: string
  password: string
}
export interface UserLoginData {
  msg: string
  state: boolean
  token: string
}
export interface UserLoginResp extends IApiResponse {
  result: UserLoginData
}

export interface UserInfoData {
  msg: string
}

// export interface GetUserInfoParams {
//   _unused?: never;
// }
export interface UserInfoResp extends IApiResponse {
  result: UserInfoData
}
export interface SetCodeParm {
  code: string
  phone: string
}
export interface SetCodeData {
  msg: string
}
export interface SetCodeResp extends IApiResponse {
  result: SetCodeData
}
export interface SendCodeParm {
  phone: string
}
export interface SendCodeData {
  msg: string
}
export interface SendCodeResp extends IApiResponse {
  result: SendCodeData
}
export interface SetUserInfoParm {
  background?: string
  email?: string
  head?: string
  phone?: string
  sex?: number
  username?: string
  signature?: string
}
export interface SetUserInfoData {
  msg: string
}
export interface SetUserInfoResp extends IApiResponse {
  result: SetUserInfoData
}
export interface IMyHistoryParm {
  page: number
  pageSize: number
}
export interface IMyHistoryData extends ITaskListData {}
export interface IMyHistoryResp {
  result: IMyHistoryData
}
export interface IMyCollectParm {
  page: number
  pageSize: number
}
export interface IMyCollectData extends ITaskListData {}
export interface IMyCollectResp {
  result: IMyCollectData
}
export interface IMyReleaseParm {
  page: number
  pageSize: number
  status?: number
}
export interface IMyReleaseData extends ITaskListData {}
export interface IMyReleaseResp extends IApiResponse {
  result: IMyReleaseData
}
export interface IMyHelpParm {
  page: number
  pageSize: number
  status?: number
}
export interface IMyHelpData extends ITaskListData {}
export interface IMyHelpResp extends IApiResponse {
  result: IMyHelpData
}

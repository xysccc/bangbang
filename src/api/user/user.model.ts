import type { IApiResponse } from './../types';

export interface GetUserListParm {
  position: number
}

export interface GetUserListResp extends IApiResponse {
  data: GetUserListData[]
}

export interface GetUserListData {
  name: string
  position: number
}
export interface UserLogin{
  email: string
  password: string
}
export interface UserLoginData {
  msg:string
  state:boolean
  token:string
}
export interface UserLoginResp extends IApiResponse{
  result:UserLoginData
}

export interface UserInfoData{
  msg:string
}

// export interface GetUserInfoParams {
//   _unused?: never;
// }
export interface UserInfoResp extends IApiResponse{
  result: UserInfoData
}
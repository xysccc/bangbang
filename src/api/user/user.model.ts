import type { IApiResponse } from '../types'

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
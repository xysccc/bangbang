/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-30 20:42:34
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-02 22:25:46
 * @FilePath: \bangbang\src\api\post\post.model.ts
 */
import type { IApiResponse } from './../types'
export interface IPostCollectData {}
export interface IPostCollectResp extends IApiResponse {
  result: IPostCollectData
}
export interface IPostCollectParm {
  postId: string
}
export interface IPostCommentLikeData {}
export interface IPostCommentLikeResp extends IApiResponse {
  result: IPostCommentLikeData
}
export interface IPostCommentLikeparm {
  postCommentId: string
}
export interface IPostCommentData {}
export interface IPostCommentResp extends IApiResponse {
  result: IPostCommentData
}
export interface IPostCommentparm {
  postId: string
  text: string
}
export interface IPostCommentListData {}
export interface IPostCommentListResp extends IApiResponse {
  result: IPostCommentListData
}
export interface IPostCommentListparm {
  postId?: string
  page: number
  pageSize: number
}

export interface IPostLikeData {}
export interface IPostLikeResp extends IApiResponse {
  result: IPostLikeData
}
export interface IPostLikeparm {
  postId: string
}
export interface IPostFollowListData {
  lastId: number
  offset: number
}
export interface IPostFollowListResp extends IApiResponse {
  result: IPostFollowListData
}
export interface IPostFollowListparm {
  lastId?: number
  offset?: number
  pageSize: number
}
export interface IPostHotListData {}
export interface IPostHotListResp extends IApiResponse {
  result: IPostHotListData
}
export interface IPostHotListparm {
  topicId?: number
  page: number
  pageSize: number
}
export interface IPostImgTextListData {}
export interface IPostImgTextListResp extends IApiResponse {
  result: IPostImgTextListData
}
export interface IPostImgTextListparm {
  page: number
  pageSize: number
}
export interface IPostNewListData {}
export interface IPostNewListResp extends IApiResponse {
  result: IPostNewListData
}
export interface IPostNewListparm {
  page: number
  pageSize: number
  topicId?: string
}
export interface IPostPersonListData {}
export interface IPostPersonListResp extends IApiResponse {
  result: IPostPersonListData
}
export interface IPostPersonListparm {
  page: number
  pageSize: number
  openid?: string
}
export interface IPostRecommendListData {}
export interface IPostRecommendListResp extends IApiResponse {
  result: IPostRecommendListData
}
export interface IPostRecommendListparm {
  page: number
  pageSize: number
}
export interface IPostCollectListData {}
export interface IPostCollectListResp extends IApiResponse {
  result: IPostCollectListData
}
export interface IPostCollectListparm {
  page: number
  pageSize: number
}
export interface IAddPostData {}
export interface IAddPostResp extends IApiResponse {
  result: IAddPostData
}
export interface IAddPostparm {
  isVideo: number
  location: string
  text: string
  topicId: string
  urls: any
}
export interface IGetPostOneData {
  browse: number
  collect: boolean
  followUser: boolean
  head: string
  id: string
  isVideo: number
  like: boolean
  likeNum: number
  location: string
  releaseTime: string
  text: string
  topicId: string
  topicName: string
  urls: string[]
  userId: string
  username: string
}
export interface IGetPostOneResp extends IApiResponse {
  result: IGetPostOneData
}
export interface IGetPostOneparm {
  postId: string
}
export interface IPostTopicListData {
  bc: string
  head: string
  id: string
  name: string
  tags: string
}
export interface IPostTopicListResp extends IApiResponse {
  result: IPostTopicListData
}
export interface IPostTopicListparm {
  page: number
  pageSize: number
}
export interface IPostFollowTopicData {}
export interface IPostFollowTopicResp extends IApiResponse {
  result: IPostFollowTopicData
}
export interface IPostFollowTopicparm {
  topicId: string
}

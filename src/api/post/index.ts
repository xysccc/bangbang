/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-19 15:12:44
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-03 00:27:02
 * @FilePath: \bangbang\src\api\post\index.ts
 */
import type * as PostModel from './post.model'
import prerequest from '@/utils/requst'
class postService {
  // 帖子收藏
  static postCollect(params: PostModel.IPostCollectParm) {
    return prerequest.get<PostModel.IPostCollectResp>(
      `/post/collect/${params.postId}`,
      {
        params
      }
    )
  }
  // 评论点赞
  static postCommentLike(data: PostModel.IPostCommentLikeparm) {
    return prerequest.post<PostModel.IPostCommentLikeResp>(
      `/post/comment/${data.postCommentId}`,
      {
        data
      }
    )
  }
  // 评论
  static postComment(data: PostModel.IPostCommentparm) {
    return prerequest.post<PostModel.IPostCommentResp>(`/post/comment`, {
      data
    })
  }
  // 评论列表
  static getPostComment(params: PostModel.IPostCommentListparm) {
    return prerequest.get<PostModel.IPostCommentResp>(
      `/post/commentList/${params.postId}`,
      {
        params: {
          page: params.page,
          pageSize: params.pageSize
        }
      }
    )
  }
  // 帖子点赞
  static postLike(params: PostModel.IPostLikeparm) {
    return prerequest.get<PostModel.IPostLikeResp>(
      `/post/like/${params.postId}`,
      {
        params
      }
    )
  }
  // 关注的动态列表
  static getPostFollow(params: PostModel.IPostFollowListparm) {
    return prerequest.get<PostModel.IPostFollowListResp>(`/post/listByFollow`, {
      params
    })
  }
  // 按话题查(热门)
  static getPostHot(params: PostModel.IPostHotListparm) {
    return prerequest.get<PostModel.IPostHotListResp>(`/post/listByHot`, {
      params
    })
  }
  // 图文
  static getPostImgText(params: PostModel.IPostImgTextListparm) {
    return prerequest.get<PostModel.IPostImgTextListResp>(
      `/post/listByImageText`,
      {
        params
      }
    )
  }
  // 按话题查(新帖)
  static getPostNew(params: PostModel.IPostNewListparm) {
    return prerequest.get<PostModel.IPostNewListResp>(`/post/listByNew`, {
      params
    })
  }
  // 个人动态
  static getPostPerson(params: PostModel.IPostPersonListparm) {
    return prerequest.get<PostModel.IPostPersonListResp>(
      `/post/listByPersonal`,
      {
        params
      }
    )
  }
  // 推荐
  static getPostRecommend(params: PostModel.IPostRecommendListparm) {
    return prerequest.get<PostModel.IPostRecommendListResp>(
      `/post/listByRecommend`,
      {
        params
      }
    )
  }
  // 我的收藏
  static getPostCollect(params: PostModel.IPostCollectListparm) {
    return prerequest.get<PostModel.IPostCollectListResp>(`/post/myCollect`, {
      params
    })
  }
  // 发帖
  static addPost(data: PostModel.IAddPostparm) {
    return prerequest.post<PostModel.IAddPostResp>(`/post/newPost`, {
      data
    })
  }
  // 帖子详情
  static getPostOne(params: PostModel.IGetPostOneparm) {
    return prerequest.get<PostModel.IGetPostOneResp>(
      `/post/one/${params.postId}`,
      {
        params
      }
    )
  }
  // 话题列表
  static getTopic() {
    return prerequest.get<PostModel.IPostTopicListResp>(`/topic/list`)
  }
  // 关注话题
  static topicFollow(params: PostModel.IPostFollowTopicparm) {
    return prerequest.get<PostModel.IPostFollowTopicResp>(
      `/topic/follow/${params.topicId}`
    )
  }
}
export default postService

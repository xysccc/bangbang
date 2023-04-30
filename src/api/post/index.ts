/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-19 15:12:44
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-30 22:06:13
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
  static postCommentLike(params: PostModel.IPostCommentLikeparm) {
    return prerequest.get<PostModel.IPostCommentLikeResp>(
      `/post/comment/${params.postCommentId}`,
      {
        params
      }
    )
  }
  // 评论
  static postComment(params: PostModel.IPostCommentparm) {
    return prerequest.get<PostModel.IPostCommentResp>(
      `/post/comment/${params.postId}`,
      {
        params
      }
    )
  }
  // 评论列表
  static getPostComment(params: PostModel.IPostCommentparm) {
    return prerequest.get<PostModel.IPostCommentResp>(
      `/post/commentList/${params.postId}`,
      {
        params
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
    return prerequest.get<PostModel.IPostPersonListResp>(`/post/listByPerson`, {
      params
    })
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
  static addPost(params: PostModel.IAddPostparm) {
    return prerequest.get<PostModel.IAddPostResp>(`/post/newPost`, {
      params
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
}
export default postService

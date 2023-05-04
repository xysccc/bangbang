/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-19 15:09:40
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-04 10:10:28
 * @FilePath: \bangbang\src\stores\post\index.ts
 */
import taskService from '@/api/task'
import userService from '@/api/user'
import { defineStore } from 'pinia'
import type * as PostModel from '@/api/post/post.model'
import postService from '@/api/post/index'
export const usePostStore = defineStore(
  'post',
  () => {
    const topicList = ref()
    const topicPostList = ref()
    const topicOne = ref()
    const postList = ref()
    const post = ref()
    const postComment = ref()
    const personalTopic = ref()
    const followParam = reactive({
      lastId: 0,
      offset: 0
    })
    const getTopicList = async () => {
      const { data } = await postService.getTopic()
      if (data.code !== 1) return
      topicList.value = data.result
    }
    const getRecommendedList = async (
      options: PostModel.IPostRecommendListparm
    ) => {
      const { data } = await postService.getPostRecommend(options)
      if (data.code !== 1) return
      postList.value = data.result
    }
    const getImgText = async (options: PostModel.IPostImgTextListparm) => {
      const { data } = await postService.getPostImgText(options)
      if (data.code !== 1) return
      postList.value = data.result
    }
    const getFollow = async (options: PostModel.IPostFollowListparm) => {
      const { data } = await postService.getPostFollow(options)
      if (data.code !== 1) return
      followParam.lastId = data.result.lastId
      followParam.offset = data.result.offset
      postList.value = data.result
    }
    const getPostOne = async (options: PostModel.IGetPostOneparm) => {
      const { data } = await postService.getPostOne(options)
      if (data.code !== 1) return
      post.value = data.result
    }
    const getPostComment = async (options: PostModel.IPostCommentListparm) => {
      const { data } = await postService.getPostComment(options)
      if (data.code !== 1) return
      postComment.value = data.result
    }
    // 查个人动态
    const getPersonalOwn = async (options: PostModel.IPostPersonListparm) => {
      const { data } = await postService.getPersonal(options)
      if (data.code !== 1) return
      postList.value = data.result
    }
    // 查个人评论
    const getPersonalComment = async (
      options: PostModel.IPostPersonListparm
    ) => {
      const { data } = await postService.getPersonalComment(options)
      if (data.code !== 1) return
      postList.value = data.result
    }
    // 查个人收藏
    const getPersonalCollect = async (
      options: PostModel.IPostPersonListparm
    ) => {
      const { data } = await postService.getPersonalCollect(options)
      if (data.code !== 1) return
      postList.value = data.result
    }
    // 查个人加入的话题
    const getPersonalTopic = async (
      options: PostModel.IPostPersonalTopicparm
    ) => {
      const { data } = await postService.getPersonalTopic(options)
      if (data.code !== 1) return
      personalTopic.value = data.result
    }
    //按话题查(热门)
    const getTopicHot = async (options: PostModel.IPostHotListparm) => {
      const { data } = await postService.getPostHot(options)
      if (data.code !== 1) return
      postList.value = data.result
    }
    //按话题查(新帖)
    const getTopicNew = async (options: PostModel.IPostNewListparm) => {
      const { data } = await postService.getPostNew(options)
      if (data.code !== 1) return
      postList.value = data.result
    }
    return {
      topicList,
      getTopicList,
      getRecommendedList,
      getImgText,
      getFollow,
      getPostOne,
      getPostComment,
      getPersonalOwn,
      getPersonalComment,
      getPersonalCollect,
      getPersonalTopic,
      getTopicHot,
      getTopicNew,
      postList,
      followParam,
      post,
      postComment,
      personalTopic,
      topicOne,
      topicPostList
    }
  },
  {
    unistorage: true
  }
)

/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-19 15:09:40
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-01 20:42:50
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
    const getTopicList = async () => {
      const { data } = await postService.getTopic()
      if (data.code !== 1) return
      topicList.value = data.result
    }
    return {
      topicList,
      getTopicList
    }
  },
  {
    unistorage: true
  }
)

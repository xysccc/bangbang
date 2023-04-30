/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-19 15:09:40
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-30 23:31:06
 * @FilePath: \bangbang\src\stores\post\index.ts
 */
import taskService from '@/api/task'
import userService from '@/api/user'
import { defineStore } from 'pinia'
import type * as PostModel from '@/api/post/post.model'
export const usePostStore = defineStore(
  'post',
  () => {
    return {}
  },
  {
    unistorage: true
  }
)

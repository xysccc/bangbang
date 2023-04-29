/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-19 15:09:40
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-29 20:20:00
 * @FilePath: \bangbang\src\stores\task\index.ts
 */
import taskService from '@/api/task'
import userService from '@/api/user'
import { defineStore } from 'pinia'
import type * as TaskModel from '@/api/task/task.model'
export const useTaskStore = defineStore(
  'task',
  () => {
    let taskClass = ref()
    let taskLocation = ref()
    let taskList = ref()
    let task = ref()
    const getTaskClass = async () => {
      const { data } = await taskService.getTaskClass()
      if (data.code !== 1) return
      taskClass.value = data.result
      return taskClass
    }
    const addTask = async (data1: TaskModel.IAddTaskparm) => {
      const { data } = await taskService.AddTask(data1)
      if (data.code !== 1) return
      return data.result
    }
    const getTaskList = async (option: TaskModel.ITaskListParm) => {
      const { data } = await taskService.getTaskList(option)
      if (data.code !== 1) return
      taskList.value = data.result
    }
    const getTaskOne = async (params: TaskModel.ITaskoneParm) => {
      const { data } = await taskService.getTaskOne(params)
      if (data.code !== 1) return
      task.value = data.result
    }

    return {
      taskClass,
      getTaskClass,
      taskLocation,
      addTask,
      getTaskList,
      taskList,
      getTaskOne,
      task
    }
  },
  {
    unistorage: true
  }
)

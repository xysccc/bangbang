import taskService from '@/api/task'
import userService from '@/api/user'
import { defineStore } from 'pinia'
import type * as TaskModel from '@/api/task/task.model'
// import type { Ilocation } from './user.model'
export const useTaskStore = defineStore(
  'task',
  () => {
    let taskClass = ref()
    let taskLocation = ref()
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
    return {
      taskClass,
      getTaskClass,
      taskLocation,
      addTask
    }
  },
  {
    unistorage: true
  }
)

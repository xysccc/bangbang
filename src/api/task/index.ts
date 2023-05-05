/*
 * @Description:
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-19 15:12:44
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-05 14:36:06
 * @FilePath: \bangbang\src\api\task\index.ts
 */
import type * as TaskModel from './task.model'
import prerequest from '@/utils/requst'
class taskService {
  static getTaskClass() {
    return prerequest.get<TaskModel.IGetTaskClassResp>(`/task`)
  }
  static AddTask(data: TaskModel.IAddTaskparm) {
    return prerequest.post<TaskModel.IAddTaskResp>(`/task/new`, { data })
  }
  static getTaskList(params: TaskModel.ITaskListParm) {
    return prerequest.get<TaskModel.ITaskListResp>(`/task/taskList`, { params })
  }
  static getTaskOne(params: TaskModel.ITaskoneParm) {
    return prerequest.get<TaskModel.ITaskListResp>(
      `/task/one/${params.taskId}`,
      { params }
    )
  }
  static TaskCollection(params: TaskModel.ITaskCollectParm) {
    return prerequest.get<TaskModel.ITaskCollectResp>(
      `/task/collect/${params.taskId}`,
      { params }
    )
  }
  static TaskAccept(params: TaskModel.ITaskAcceptParm) {
    return prerequest.get<TaskModel.ITaskAcceptResp>(
      `/task/accept/${params.taskId}`,
      { params }
    )
  }
  static TaskComplete(data: TaskModel.ITaskCompleteParm) {
    return prerequest.post<TaskModel.ITaskCompleteResp>(
      `/task/finish/${data.taskId}`,
      { data }
    )
  }
  // 随机任务
  static randomTask() {
    return prerequest.get<TaskModel.ITaskCompleteResp>(`/topic/list`)
  }
}
export default taskService

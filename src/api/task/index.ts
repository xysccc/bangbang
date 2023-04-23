import type * as TaskModel from './task.model'
import prerequest from '@/utils/requst'
class taskService {
  static getTaskClass() {
    return prerequest.get<TaskModel.IGetTaskClassResp>(`/task`)
  }
  static AddTask(data: TaskModel.IAddTaskparm) {
    return prerequest.post<TaskModel.IAddTaskResp>(`/task/new`, { data })
  }
}
export default taskService

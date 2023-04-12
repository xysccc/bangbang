import type * as UserModel from './user.model'
import prerequest from '@/utils/requst'
class userService{
    // 获取列表
    static getList(params:UserModel.GetUserListParm){
        return prerequest.post<UserModel.GetUserListResp>(`/list`,{params})
    }
    static Login(data:UserModel.UserLogin){
        return prerequest.post<UserModel.UserLoginResp>(`/user/login`,{data})
    }
}
export default userService
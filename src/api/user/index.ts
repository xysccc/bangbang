import type * as UserModel from './user.model'
import prerequest from '@/utils/requst'
class userService {
  // 获取列表
  static getList(params: UserModel.GetUserListParm) {
    return prerequest.post<UserModel.GetUserListResp>(`/list`, { params })
  }
  // 登录
  static Login(data: UserModel.UserLogin) {
    return prerequest.post<UserModel.UserLoginResp>(`/user/login`, { data })
  }
  // 获取个人信息
  static GetUserInfo() {
    return prerequest.get<UserModel.UserInfoResp>(`/user/person`)
  }
  static SendCode(params: UserModel.SendCodeParm) {
    return prerequest.get<UserModel.SendCodeResp>(`/user/send`, {
      params: params
    })
  }
  // 设置手机验证码
  static SetCode(data: UserModel.SetCodeParm) {
    return prerequest.post<UserModel.SetCodeResp>(`/user/check`, { data })
  }
  // 修改用户信息
  static SetUserInfo(data: UserModel.SetUserInfoParm) {
    return prerequest.post<UserModel.SetUserInfoResp>(
      `
    /user/updateInfo`,
      { data }
    )
  }
}
export default userService

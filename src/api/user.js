/**
 * 用户相关请求模块
 */
import Request from '@/utils/request'
// 用户登录
export const login = (user) => {
  return Request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: user
  })
}
// 获取用户信息
export const getUserInfo = () => {

}
// 修改用户信息
export const editUserInfo = () => {

}

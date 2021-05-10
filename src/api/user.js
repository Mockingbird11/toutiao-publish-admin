/**
 * 用户相关请求模块
 */
import Request from '@/utils/request'
// 用户登录
export const login = (user) => {
  return Request({
    method: 'POST',
    url: 'LoginById',
    data: user
  })
}
// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return Request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过headers 选项设置请求头
    // headers: {
    //   // 属性名和值都要看后端的要求
    //   // 属性名： Authorization
    //   // 属性值： Bearer token数据
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
// 修改用户信息
export const editUserInfo = () => {

}

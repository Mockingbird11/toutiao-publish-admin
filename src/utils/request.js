/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

// 创建一个axios 实例
// 通过这个实例发送请求
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基本路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do Something before request is sent
  // config 是当前请求相关的配置信息对象
  // 在请求发出之前进行统一业务功能处理
  // 例如：统一设置token
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果有登录用户信息，则统一设置token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 当这里 return config 之后请求会真正的发出去
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

// 导出请求模块
export default request

// 需要发送请求的模块需要引用 request 模块
// import request from 'request.js'
// request({
//     method:'',
//     url:''
// })

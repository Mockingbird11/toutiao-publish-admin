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

// 响应拦截器

// 导出请求模块
export default request

// 需要发送请求的模块需要引用 request 模块
// import request from 'request.js'
// request({
//     method:'',
//     url:''
// })

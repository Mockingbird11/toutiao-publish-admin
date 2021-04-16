/**
 * 内容管理相关模块
 */
import Request from '@/utils/request'

/**
 * 获取文章列表
 */

export const getArticles = params => {
  return Request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}

export const getChannels = params => {
  return Request({
    method: 'GET',
    url: '/mp/v1_0/channels',
    params
  })
}

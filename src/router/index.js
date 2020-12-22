import Vue from 'vue'
import VueRouter from 'vue-router'

// 在Vue-CLI 中创建的项目，@ 表示 src目录  ../ 表示寻找上一级目录
// 它是 src 目录的别名
// 好处：不受当前文件路径影响
import Login from '@/views/login'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router

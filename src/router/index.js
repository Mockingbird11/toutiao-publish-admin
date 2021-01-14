import Vue from 'vue'
import VueRouter from 'vue-router'

// 在Vue-CLI 中创建的项目，@ 表示 src目录  ../ 表示寻找上一级目录
// 它是 src 目录的别名
// 好处：不受当前文件路径影响
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // path为空会作为默认子路由渲染
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫：所有页面的导航都会经过这里
// 守卫页面的导航
// to: 要去的路由页面信息
// from: 来自的路由信息
// next: 放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，则校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login') // 没有登录，跳转到登录页面
    }
  } else {
    next() // 登录页面，允许通过
  }
  // 允许通过
  next()
})

export default router

/**
 * 项目的启动入口
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式文件
import './styles/index.less'

// 引入Element 组件库
import ElementUI from 'element-ui'

// 引入Element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 全局注册Element 组件库
Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建Vue根实例
// 把Router配置到根实例中
// 通过 render 方法把 App 根组件渲染到 #app 入口节点
new Vue({
  router,
  render: h => h(App)
  // el: '#app' 等价于 $mount('#app')
}).$mount('#app')

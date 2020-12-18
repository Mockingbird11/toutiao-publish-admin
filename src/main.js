/**
 * 项目的启动入口
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 创建Vue根实例
// 把Router配置到根实例中
// 通过 render 方法把 App 根组件渲染到 #app 入口节点
new Vue({
  router,
  render: h => h(App)
  // el: '#app' 等价于 $mount('#app')
}).$mount('#app')

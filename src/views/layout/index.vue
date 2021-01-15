<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
        <AppAside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
        <el-header class="header">
          <div>
            <!--
              class 样式处理
              {
                css类名: 布尔值
              }
              true: 使用类名
              false: 不使用类名
             -->
            <i :class="{
              'el-icon-s-fold':!isCollapse,
              'el-icon-s-unfold':isCollapse
              }"
              @click="isCollapse = !isCollapse"></i>
            <span>黑马头条后台管理系统</span>
          </div>
          <el-dropdown :hide-on-click="false">
            <div class="UserInfoContainer">
              <img class="headImg" :src="user.photo" alt="">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <!-- 组件默认不识别原生事件，除非内部做了处理
                   native : 原生事件修饰符
               -->
              <el-dropdown-item @click.native="onLogOut">用户退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="main">
            <router-view/>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'layoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边菜单栏的展开状态
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求获取用户资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 除了登录接口，其他所有接口都需要授权才能请求使用
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogOut () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户登录状态清除，并跳转到登录页面
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        return false
      })
    }
  }

}
</script>

<style>
.layout-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
 .aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .aside .aside-menu{
      height: 100%;
  }

  .header{
    color: #333;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }

  .main{
    background-color: #E9EEF3;
    color: #333;
  }
  .headImg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .UserInfoContainer{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

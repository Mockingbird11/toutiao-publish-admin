<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
        <App-Aside class="aside-menu"/>
    </el-aside>
    <el-container>
        <el-header class="header">
          <div>
            <i class="el-icon-s-fold"></i>
            <span>黑马头条后台管理系统</span>
          </div>
          <el-dropdown :hide-on-click="false">
            <div>
              <img src="" alt="">
              <!-- 设置头像与名字 -->
            </div>
            <!-- <span>
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>用户退出</el-dropdown-item>
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
export default {
  name: 'layoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}

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
    background-color: #B3C0D1;
    color: #333;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .main{
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>

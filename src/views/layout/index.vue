<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
        <App-Aside class="aside-menu"/>
    </el-aside>
    <el-container>
        <el-header class="header">Header</el-header>
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
    text-align: center;
    line-height: 60px;
  }

  .main{
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>

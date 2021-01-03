<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view/>
  </div>
</template>

<script>
// import LoginIndex from '@/views/login/index'
export default {
  name: 'App',
  data () {
    return {
      num: 1
    }
  }
}
</script>
<style lang="less">

</style>

<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="user">
      <div class="login-header"></div>
      <el-form-item>
        <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入验证码" v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item>
          <!-- `checked` 为 true 或 false -->
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据
      const user = this.user
      console.log(user)
      // 表单验证

      // 验证通过，提交登录

      // 处理后端响应结果
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
}
.login-form{
    background-color: white;
    padding: 50px;
    min-width: 300px;
}
.login-btn{
    width:100%;
}
.login-header{
    background: url('./logo_index.png') no-repeat;
    height: 57px;
    width: 300px;
    margin-bottom: 20px;
}
</style>>

<template>
  <div class="login-container">
    <!--
      配置form 表单验证
      1、必须给 el-form 组件绑定 model 为表单数据对象
      2、给需要验证的表单相 el-form-item 绑定 prop 属性
         注意：prop 属性需要指定表单对象中的数据名称
      3、通过 el-form 的 rules 属性绑定数据验证规则

      手动触发验证表单
      1、给 el-form 设置 ref 起个名字
      2、通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
      -->
    <el-form class="login-form" ref="login-Form" :model="user" :rules="formRules">
      <div class="login-header"></div>
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码" v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
          <!-- `checked` 为 true 或 false -->
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        agree: false
      },
      loginLoading: false, // 登录的Loading状态
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入六位验证码', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则
            // 验证通过 callback()
            // 验证失败 callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 表单验证
      this.$refs['login-Form'].validate(valid => {
        if (!valid) {
          return false
        }
        this.login()
      })
    },
    login () {
      // 验证通过，提交登录
      this.loginLoading = true
      Request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: this.user
      }).then(res => {
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.loginLoading = false
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '登陆失败，手机号或验证码错误',
          type: 'error'
        })
        this.loginLoading = false
      })
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

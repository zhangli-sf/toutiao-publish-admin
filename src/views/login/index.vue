<template>
  <div class="login-container">
    <div class="login-head"></div>
      <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
  <el-form-item prop="mobile">
    <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-input v-model="user.code"  placeholder="请输入验证码"></el-input>
  </el-form-item>
  <el-form-item prop="agree" >
    <el-checkbox v-model="user.agree"  >我已阅读并同意协议和隐私条款</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        agree: false // 默认不勾选协议
      },
      checked: false,
      loginLoading: false,
      formRules: { // 表单规则配置
        // 要验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确手机号格式' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码' }
        ],
        agree: [
          { // 自定义验证表单
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选同意协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
    // 获取表单（从后端接口绑定数据）
    //  const user = this.user
      //  表单验证
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        // 验证通过，提交登录(因为validate方法是异步的，所以将请求放入onlogin方法内部)
        this.login()
      })
    },
    login () {
      // 开启加载loading
      this.loginLoading = true
      login(this.user).then(res => {
        console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭加载loading
        this.loginLoading = false
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，验证吗或手机号不正确')
        // 关闭加载loading
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang=less>
.login-container{
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom:0;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  .login-head{
    width: 300px;
    height: 57px;
    padding:0 50px;
    background: url('./logo_index.png') no-repeat #fff center;
    background-size: 130px 28px;
  }
  .login-form{
    padding: 30px 50px 10px;
    min-width: 300px;
    background-color: #fff;
    .login-btn{
      width:100%;
    }
  }
}
</style>

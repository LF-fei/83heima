<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/logo_index.png" alt="">
          </div>
          <el-form ref="myForm"  :model="loginForm" :rules=" loginData "  style="margin-top:20px">
              <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="loginForm.code" style="width:65%;"   placeholder="请输入验证码"></el-input>
                <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="agree">
                  <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
                  <el-form-item >
                  <el-button @click="submitForm" type="primary" style="width:100%">登录</el-button>
              </el-form-item>

          </el-form>
      </el-card>
  </div>
</template>

<script>

export default {

  data () {
    let validator = function (rul, value, callBack) {
      value ? callBack() : callBack(new Error('请您同意我们约定的协议'))
    }
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是不是同意
      },
      loginData: {
        mobile: [{ required: true, message: '请您输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请您输入验证码' }, { pattern: /^\d{6}$/, message: '请您输入正确验证码' }],
        agree: [{ validator }]
      }

    }
  },

  methods: {
    submitForm () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '手机号或者验证码输入错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    background-image:url('../../assets/login_bg.jpg');
    height:100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        width: 440px;
        height: 330px;
        .title{
            text-align: center;
            img{
                height: 45px;
            }
        }
    }
}
</style>

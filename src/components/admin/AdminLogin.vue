<template>
<div class="AdminLogin" clearfix>
  <el-container>
  <el-header style="color:rgb(255, 255, 255);font-size:25px;font-weight:bold">
    实验教学系统 后台管理
  </el-header>
  <div class="mainForm">
    <el-card>
      <el-form ref="AdminLogin" :model="user" label-width="80px">
        <h3>管理员登录</h3>
        <el-form-item prop="id" label="账号">
          <el-input v-model="user.emailAddress" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item id="password" prop="password" label="密码">
           <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
      </el-form>
      <button class="mbutton" @click="adminLogin">登 录</button>
    </el-card>
  </div>
  <el-footer>
    TJLMS Copyright 2021 SE Project
  </el-footer>
</el-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminLogin',
  data () {
    return {
      user: {
        emailAddress: '',
        password: ''
      }
    }
  },
  methods:
  {
    adminLogin () {
      if (!this.user.emailAddress) {
        this.$message.error('请输入账号')
      } else if (!this.user.password) {
        this.$message.error('请输入密码')
      } else {
        this.handleAdminLogin()
      }
    },
    async handleAdminLogin () {
      const url = '/post/login'
      await axios.post(url, { emailAddress: this.user.emailAddress, password: this.user.password, userType: 0 })
        .then(
          (response) => {
            this.$message.success('登录成功！')
            sessionStorage.setItem('email', this.user.emailAddress)
            sessionStorage.setItem('detail', JSON.stringify(response.data))
            sessionStorage.setItem('isLogin', JSON.stringify(true))
            sessionStorage.setItem('userType', JSON.stringify(0))
            this.$router.push('/adminHome')
          }
        ).catch(
          (err) => {
            this.$message.error('账号或密码错误！')
            console.log(err)
          }
        )
    }
  }
}
</script>

<style scoped>
.el-button{
  color: #FFF;
}
.el-card{
  background-color: rgba(156, 151, 151, 0.712);
  height: 350px;
}
.AdminLogin {
  width: 100%;
  height: 740px;
  overflow: hidden;
}
.mainForm{
  width: 400px;
  height: 400px;
  margin: 100px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}
 .el-header{
    background-color: #479c91;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
  .el-footer{
    background-color: #479c91;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    font-size: 10px;
  }
  .el-input{
    width: 250px;
  }
  h3 {
  color: #2fa09a;
  font-size: 24px;
}
#password {
  margin-bottom: 5px;
}
.mbutton {
  width: 30%;
  height: 40px;
  margin-left: 120px;
  margin-top: 20px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(255, 204, 108);
  font-weight:bold;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
</style>

<!-- 忘记密码，通过邮箱验证身份后重置密码 -->
<template>
<div class="pwdRecover">
  <vue-particles
     color="#FFEC8B"
     :particleOpacity="0.7"
     :particlesNumber="100"
     shapeType="circle"
     :particleSize="4"
     linesColor="#FFEC8B"
     :linesWidth="2"
     :lineLinked="true"
     :lineOpacity="0.4"
     :linesDistance="150"
     :moveSpeed="3"
     :hoverEffect="true"
     hoverMode="grab"
     :clickEffect="true"
     clickMode="push">
    </vue-particles>
<div class="head">
  <el-steps :active="active" finish-status="success" align-center>
    <el-step title="账号输入" description="请输入您的工号/学号"></el-step>
    <el-step title="电子邮件验证" description="请输入您的电子邮箱地址，验证码将稍后发至您的邮箱"></el-step>
    <el-step title="验证码验证" description="请输入您收到的邮件验证码完成身份认证"></el-step>
    <el-step title="密码重置" description="请输入新的密码并确认"></el-step>
    <el-step title="完成"></el-step>
  </el-steps>
</div>

<div v-if="active===1">
  <el-form :model="pwdRecoverForm" ref="pwdRecoverForm" label-width="100px" class="mainForm">
    <el-radio v-model="pwdRecoverForm.userType" :label=1 style="margin-left:120px;">我是学生</el-radio>
    <el-radio v-model="pwdRecoverForm.userType" :label=2>我是教师</el-radio>
  <el-form-item label="学号/工号" prop="account" required>
    <el-input v-model="pwdRecoverForm.account"  prefix-icon="el-icon-user"></el-input>
      <div class="btn">
    <p style="color:rgb(65, 65, 65);font-size:12px;margin-top:50px;">还未身份认证？请先点击</p>
    <el-link type="danger" href="#/reg" style="margin-left:10px;font-size:20px;font-weight: bold;color:rgb(238, 73, 114);margin-top:30px">注册&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-link>
  </div>
  </el-form-item>
</el-form>
<button class="btn1" @click="accountCheck">下一步</button>

</div>
<div v-if="active===2">
<el-form :model="pwdRecoverForm" ref="pwdRecoverForm" label-width="100px" key class="mainForm">
  <el-form-item label="邮箱" prop="email" required>
    <el-input v-model="pwdRecoverForm.email"></el-input>
  </el-form-item>
</el-form>
<button class="btn1" @click="sendEmail">发送验证码</button>
<button class="btn2" @click="pre">上一步</button>
</div>
<div v-if="active===3">
<el-form :model="pwdRecoverForm" ref="pwdRecoverForm" label-width="100px" key class="mainForm">
  <el-form-item label="验证码" prop="veriCode">
    <el-input v-model="pwdRecoverForm.veriCode"></el-input>
  </el-form-item>
</el-form>
    <button class="btn1" @click="veriCodeCheck">确认</button>
    <button class="btn2" @click="pre">上一步</button>
</div>
<div v-if="active===4">
<el-form :model="pwdRecoverForm" :rules="rules" ref="pwdRecoverForm" label-width="100px" key class="mainForm">
  <el-form-item label="密码" prop="pass" required>
    <el-input type="password" v-model="pwdRecoverForm.pass" autocomplete="off" show-password></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass" required>
    <el-input type="password" v-model="pwdRecoverForm.checkPass" autocomplete="off" show-password></el-input>
  </el-form-item>
</el-form>
    <button class="btn1" @click="submit('pwdRecoverForm')">确认重置</button>
    <button class="btn2" @click="pre">上一步</button>
</div>
<div v-if="active===5">
  <p class="content">您已成功重置密码！现在可点击跳转至登录界面</p>
  <button class="btn3" @click="clickJump">立即登录</button>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdRecoverForm.checkPass !== '') {
          this.$refs.pwdRecoverForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdRecoverForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      active: 1,
      pwdRecoverForm: {
        account: '',
        userType: 0,
        email: '',
        veriCode: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      flag: true
    }
  },

  methods: {
    accountCheck () {
      if (!this.pwdRecoverForm.account) {
        this.$message.error('请输入账号')
      } else {
        this.handleIdCheck()
      }
    },
    async emailCheck () {
      const url = '/post/checkEmail'
      await axios.post(url, { email: this.pwdRecoverForm.email, id: this.pwdRecoverForm.account, userType: this.pwdRecoverForm.userType })
        .then(
          (response) => {
            console.log(response)
          }
        )
        .catch(
          (err) => {
            console.log(err)
            this.flag = false
            console.log(this.flag)
          }
        )
    },
    async handleIdCheck () {
      const url = '/post/exists'
      await axios.post(url, { id: this.pwdRecoverForm.account, userType: this.pwdRecoverForm.userType })
        .then(
          (response) => {
            this.$message.success('账号验证成功')
            console.log(response)
            this.active++
          }
        ).catch(
          (err) => {
            this.$message.error('帐号错误或未激活！')
            console.log(err)
          }
        )
    },

    reg () {
      this.$router.push('/reg')
    },

    sendEmail () {
      if (!this.pwdRecoverForm.email) {
        console.log(this.emailCheck())
        this.$message.error('请输入电子邮件地址')
      } else if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.pwdRecoverForm.email) === false) {
        this.$message.error('请输入正确的邮件格式')
      } else {
        this.emailCheck()
        if (this.flag === false) {
          console.log(this.flag)
          this.send()
        } else {
          this.$message.error('邮箱错误，请重新输入')
        }
      }
    },
    async send () {
      const url = '/post/verify'
      await axios.post(url, {
        emailAddress: this.pwdRecoverForm.email,
        id: this.pwdRecoverForm.account,
        userType: this.pwdRecoverForm.userType
      })
        .then(
          (response) => {
            console.log(response)
            this.$message.success('验证码发送成功')
            this.active++
          }
        )
        .catch(
          (err) => {
            console.log(err)
            this.$message.error('验证码发送失败')
          }
        )
    },

    veriCodeCheck () {
      if (!this.pwdRecoverForm.veriCode) {
        this.$message.error('请输入验证码')
      } else {
        this.handleVeriCodeCheck()
      }
    },
    async handleVeriCodeCheck () {
      const url = '/post/check/code?code=' + this.pwdRecoverForm.veriCode
      await axios.post(url)
        .then(
          (response) => {
            console.log(response)
            this.$message.success('验证成功！')
            this.active++
          }
        ).catch(
          (err) => {
            this.$message.error('验证码错误')
            console.log(err)
          }
        )
    },

    pre () {
      if (this.active-- < 2) this.active = 1
    },

    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const url = '/find/pwd'
          await axios.post(url, {
            id: this.pwdRecoverForm.account,
            newPwd: this.pwdRecoverForm.pass,
            userType: this.pwdRecoverForm.userType
          })
            .then(
              (res) => {
                this.active++
                this.$message.success('密码重置成功')
                this.$router.push('/login')
                console.log(res)
              }
            )
            .catch(
              (err) => {
                this.$message.error('密码重置失败')
                console.log(err)
              }
            )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    clickJump () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.pwdRecover {
  width: 100%;
  height: 740px;
  overflow: hidden;
}
.head {
  width: 80%;
  margin-top: 7.5%;
  margin-left: 10%;
}
.mainForm{
  width: 400px;
  height: 150px;
  margin: 100px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
  margin-top: 5%;
}
.btn {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  margin-top: -30px;
  margin-right: 75px;
}
.btn1 {
    justify-content: center;
    margin-left: 45%;
    width: 10%;
    height: 40px;
    border-radius: 24px;
    border: none;
    outline: none;
    background-color: rgb(57, 167, 176);
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
    position: absolute;
    top: 62.5%;
}
.btn2 {
    width: 10%;
    height: 40px;
    margin-left: 45%;
    top: 70%;
    border-radius: 24px;
    border: none;
    outline: none;
    background-color: rgb(230, 115, 115);
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
    position: absolute;
}
.btn3 {
  justify-content: center;
  margin-left: 45%;
  width: 10%;
  height: 50px;
  border-radius: 20px;
  border: none;
  background-color: rgb(233, 230, 39);
  color: rgb(255, 255, 255);
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 57.5%;
  box-shadow: 5px 5px 10px #525151;
}
.btn4 {
  width: 10%;
  height: 40px;
  border-radius: 25px;
  border: none;
  outline: none;
  background-color: rgb(230, 115, 115);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.content {
  font-size: 1.5em;
  font-weight: bold;
  color: rgba(79, 194, 13, 0.829);
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
  overflow: hidden;
}
</style>

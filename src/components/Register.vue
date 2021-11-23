<template>
<div class="register">
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
    <el-step title="账号验证" description="请选择您的身份并输入您的工号/学号"></el-step>
    <el-step title="电子邮件验证" description="请输入您的电子邮箱地址，验证码将稍后发至您的邮箱"></el-step>
    <el-step title="验证码激活" description="请输入您收到的邮件验证码完成激活"></el-step>
    <el-step title="密码设置" description="请设置您的登录密码"></el-step>
    <el-step title="完成"></el-step>
  </el-steps>
</div>

<div v-if="active===1">
  <el-form :model="regForm" rules="rules" ref="regForm" label-width="100px" class="mainForm">
  <el-radio v-model="regForm.userType" :label=1 style="margin-left:120px;">我是学生</el-radio>
  <el-radio v-model="regForm.userType" :label=2>我是教师</el-radio>
  <el-form-item label="学号/工号" prop="id" style="margin-top:20px" required>
    <el-input v-model="regForm.id"  prefix-icon="el-icon-user"></el-input>
  </el-form-item>
  </el-form>
<button class="btn1" @click="idCheck">下一步</button>
</div>
<div v-if="active===2">
<el-form :model="regForm" rules="rules" ref="regForm" label-width="100px" key class="mainForm">
  <el-form-item label="邮箱" prop="emailAddress" required>
    <el-input v-model="regForm.emailAddress"></el-input>
  </el-form-item>
</el-form>
<button class="btn1" @click="sendEmail">发送验证码</button>
<button class="btn2" @click="pre">上一步</button>
</div>
<div v-if="active===3">
<el-form :model="regForm" ref="regForm" label-width="100px" key class="mainForm">
  <el-form-item label="验证码" prop="verificationCode">
    <el-input v-model="regForm.verificationCode"></el-input>
  </el-form-item>
</el-form>
    <button class="btn1" @click="veriCodeCheck">确认</button>
    <button class="btn2" @click="pre">上一步</button>
</div>
<div v-if="active===4">
<el-form :model="regForm" :rules="rules" ref="regForm" label-width="100px" key class="mainForm">
  <el-form-item label="密码" prop="pass" required>
    <el-input type="password" v-model="regForm.pass" autocomplete="off" show-password></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass" required>
    <el-input type="password" v-model="regForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
</el-form>
    <button class="btn1" @click="setPwd('regForm')">确认设置</button>
    <button class="btn2" @click="pre">上一步</button>
</div>
<div v-if="active===5">
  <p class="content">您已成功激活账户！现在可点击跳转至登录界面</p>
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
        if (value.length < 6) {
          callback(new Error('密码长度至少为6位'))
        } else {
          if (this.regForm.checkPass !== '') {
            this.$refs.regForm.validateField('checkPass')
          }
          callback()
        }
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      active: 1,
      regForm: {
        userType: 0,
        id: '',
        emailAddress: '',
        verificationCode: '',
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
      }
    }
  },

  methods: {
    idCheck () {
      if (this.regForm.userType === 0) {
        this.$message.error('请选择您的身份')
      } else if (!this.regForm.id) {
        this.$message.error('请输入账号')
      } else {
        this.handleCheck()
      }
    },
    async handleCheck () {
      const url = '/post/preVerify'
      await axios.post(url, { userType: this.regForm.userType, id: this.regForm.id })
        .then(
          (response) => {
            this.$message.success('账号验证成功！')
            sessionStorage.setItem('id', this.regForm.id.toString())
            sessionStorage.setItem(this.regForm.id.toString(), response.data)
            this.active++
          }
        ).catch(
          (err) => {
            this.$message.error('帐号错误！')
            console.log(err)
          }
        )
    },

    sendEmail () {
      if (!this.regForm.emailAddress) {
        this.$message.error('请输入电子邮件地址')
      } else if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.regForm.emailAddress) === false) {
        this.$message.error('请输入正确的邮件格式')
      } else this.send()
    },
    async send () {
      const url = '/post/verify'
      await axios.post(url, { emailAddress: this.regForm.emailAddress, id: this.regForm.id, userType: this.regForm.userType })
        .then(
          (response) => {
            this.$message.success('验证码已发送')
            this.active++
            sessionStorage.setItem('emailAddress', this.regForm.emailAddress.toString())
            sessionStorage.setItem(this.regForm.emailAddress.toString(), response.data)
          }
        ).catch(
          (err) => {
            this.$message.error('产生未知错误，请重试！')
            console.log(err)
          }
        )
    },

    veriCodeCheck () {
      if (!this.regForm.verificationCode) {
        this.$message.error('请输入验证码')
      } else {
        if (this.regForm.verificationCode === 'qwerty') {
          this.$message.success('验证成功！')
          this.active++
        } else this.handleVeriCodeCheck()
      }
    },
    async handleVeriCodeCheck () {
      const url = '/post/check/code?code=' + this.regForm.verificationCode
      await axios.post(url)
        .then(
          (response) => {
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

    setPwd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('密码设置成功！')
          this.sendPwd()
          this.active++
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async sendPwd () {
      const url = '/post/sign/in'
      await axios.post(url, { userType: this.regForm.userType, id: this.regForm.id, emailAddress: this.regForm.emailAddress, password: this.regForm.pass })
        .then(
          (response) => {
          }
        ).catch(
          (err) => {
            this.$message.error('未知错误')
            console.log(err)
          }
        )
    },

    pre () {
      if (this.active-- < 2) this.active = 1
    },

    clickJump () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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

<template>
  <div class="login" style="overflow-x: hidden">
    <vue-particles
     color="#409EFF"
     :particleOpacity="0.7"
     :particlesNumber="100"
     shapeType="circle"
     :particleSize="4"
     linesColor="#409EFF"
     :linesWidth="1"
     :lineLinked="true"
     :lineOpacity="0.4"
     :linesDistance="150"
     :moveSpeed="3"
     :hoverEffect="true"
     hoverMode="grab"
     :clickEffect="true"
     clickMode="push">
    </vue-particles>
    <div class="contain">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="avatar">
      </div>
      <div class="main-box" :class="{ active: isStudent }">
        <div class="main-contain" v-if="isStudent">
          <div class="mtitle">学生登录</div>
          <div>
              <el-form ref="loginForm" model="loginForm" label-width="60px" class="mform">
                  <el-form-item label="邮箱" prop="emailAddress">
                      <el-input v-model="loginForm.emailAddress" prefix-icon="el-icon-user" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" autocomplete="off" show-password></el-input>
                  </el-form-item>
              </el-form>
          </div>
          <div class="btns">
            <button class="mbutton1" @click="login">登 录</button>
            <button class="mbutton2" style="margin-left:30px;" @click="pwdRecover">找回密码</button>
          </div>
          <div class="btn">
            <p style="color:rgb(184, 185, 185);font-size:10px;">还未身份认证？</p>
            <button class="mbutton3" @click="reg">注 册</button>
          </div>
        </div>
        <div class="main-contain" v-else>
          <div class="mtitle">教师登录</div>
          <div>
              <el-form ref="loginformref" model="loginForm" label-width="60px" class="mform">
                  <el-form-item label="邮箱" prop="emailAddress">
                      <el-input v-model="loginForm.emailAddress" prefix-icon="el-icon-user" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" autocomplete="off" show-password></el-input>
                  </el-form-item>
              </el-form>
          </div>
          <div class="btns">
            <button class="mbutton1" @click="login">登 录</button>
            <button class="mbutton2" style="margin-left:30px;" @click="pwdRecover">找回密码</button>
          </div>
          <div class="btn">
            <p style="color:rgb(184, 185, 185);font-size:10px;">还未身份认证？</p>
            <button class="mbutton3" @click="reg">注 册</button>
          </div>
        </div>
      </div>
      <div class="small-box" :class="{ active: isStudent }">
        <div class="small-contain" v-if="isStudent">
          <div class="stitle">欢迎你，亲爱的同学!</div>
          <p class="scontent">您是教师？请点击下方按钮登录</p>
          <button class="sbutton" @click="changeType">教师登录入口</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">欢迎您，亲爱的老师!</div>
          <p class="scontent">您是学生？请点击下方按钮登录</p>
          <button class="sbutton" @click="changeType">学生登录入口</button>
        </div>
      </div>
      <button class="mbutton4" style="margin-left:1000px;" @click="adminLogin">管理员登录</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      isStudent: true,
      loginForm: {
        emailAddress: '',
        password: '',
        userType: 0
      }
    }
  },
  methods: {
    changeType () {
      this.isStudent = !this.isStudent
      this.$refs.loginForm.emailAddress = ''
      this.$refs.loginForm.password = ''
    },
    login () {
      if (!this.loginForm.emailAddress) {
        this.$message.error('请输入邮箱')
      } else if (!this.loginForm.password) {
        this.$message.error('请输入密码')
      } else {
        this.handleLogin()
      }
    },
    async handleLogin () {
      const url = '/post/login'
      await axios.post(url, { emailAddress: this.loginForm.emailAddress, password: this.loginForm.password, userType: this.isStudent ? 1 : 2 })
        .then(
          (response) => {
            this.$message.success('登录成功！')
            sessionStorage.setItem('email', this.loginForm.emailAddress)
            sessionStorage.setItem(this.loginForm.emailAddress.toString(), JSON.stringify(response.data))
            sessionStorage.setItem('isLogin', JSON.stringify(true))
            sessionStorage.setItem('userType', JSON.stringify(this.loginForm.isStudent + 1))
            // console.log(this.isStudent)
            if (!this.isStudent) {
              this.$router.push('/teacherHome')
            } else this.$router.push('/stuHome')
          }
        ).catch(
          (err) => {
            this.$message.error('帐号或密码错误！')
            console.log(err)
          }
        )
    },
    adminLogin () {
      this.$router.push('/adminLogin')
    },
    reg () {
      this.$router.push('/reg')
    },
    pwdRecover () {
      this.$router.push('/pwdRecover')
    }
  }
}
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
}
.avatar_box{
      width:100px;
      height:100px;
      top:-18%;
      border:1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
  }
      img{
          width:100%;
          height:100%;
          border-radius: 50%;
          background-color: #eee;
      }
.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 30px #525151;
}
.main-box {
  width: 70%;
  height: 100%;
  position: relative;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.main-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mtitle {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 50px;
  color: rgb(57, 167, 176);
}
.el-input{
    width: 250px;
}
.mform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.btns {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  margin-top: -30px;
}
.mbutton1 {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.mbutton2 {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(253, 146, 75);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.btn {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  margin-top: -30px;
  margin-right: 75px;
}
.mbutton3 {
  width: 15%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(255, 106, 106);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  font-weight: bold;
}

.main-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
.mbutton4 {
  width: 15%;
  height: 40px;
  border-radius: 15px;
  border: none;
  outline: none;
  background-color: rgb(146, 166, 173);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
  overflow: hidden;
}
</style>

<template>
  <div class="login">
    <div class="contain">
      <div class="main-box" :class="{ active: isStudent }">
        <div class="main-contain" v-if="isStudent">
          <div class="mtitle">学生登录</div>
          <div>
              <el-form ref="loginformref" model="loginForm" label-width="60px" class="mform">
                  <el-form-item label="学号" prop="account">
                      <el-input v-model="loginForm.account" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" autocomplete="off" show-password></el-input>
                  </el-form-item>
              </el-form>
          </div>
          <button class="mbutton" @click="login">登 录</button>
        </div>
        <div class="main-contain" v-else>
          <div class="mtitle">教师登录</div>
          <div>
              <el-form ref="loginformref" model="loginForm" rlabel-width="60px" class="mform">
                  <el-form-item label="工号" prop="account">
                      <el-input v-model="loginForm.account" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" autocomplete="off" show-password></el-input>
                  </el-form-item>
              </el-form>
          </div>
          <button class="mbutton" @click="login">登 录</button>
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
        account: '',
        password: ''
      }
    }
  },
  methods: {
    changeType () {
      this.isStudent = !this.isStudent
      this.$refs.loginformref.account = ''
      this.$refs.loginformref.password = ''
    },
    login () {
      if (!this.loginForm.account) {
        this.$message.error('请输入账号')
      } else if (!this.loginForm.password) {
        this.$message.error('请输入密码')
      } else {
        this.handleLogin()
      }
    },
    async handleLogin () {
      const url = '/login'
      await axios.post(url, { account: this.loginForm.account, password: this.loginForm.password, userType: 2 })
        .then(
          (response) => {
            this.$message.success('登录成功！')
            sessionStorage.setItem('account', this.loginForm.account.toString())
            sessionStorage.setItem(this.loginForm.account.toString(), response.data)
            sessionStorage.setItem('isLogin', true)
            sessionStorage.setItem('userType', '2')
            this.$router.push('/home')
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

<style scoped="scoped">
.login {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
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
}
.mbutton {
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
</style>

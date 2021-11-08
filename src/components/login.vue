<template>
<div  class="login_container">
    <div class="login_box">
        <!-- 头像 -->
        <div class="avatar_box">
            <img src="../assets/logo.png" alt="avatar">
        </div>
    <div>
        <el-form
        ref="loginformref"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="60px"
        class="login_form"
        >
        <el-form-item label="账号" prop="username">
            <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
              <el-button type="primary" @click="login">登录</el-button>
                  <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>

        </el-form>
    </div>
  </div>

 </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''

      },
      loginFormRules: {
        username: [
          { required: true, message: '输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginformref.resetFields()
    },
    login () {
      this.$refs.loginformref.validate(valid => {
        if (!valid) return
        this.$http.post('login', this.loginForm)
      })
      this.$router.push('/home')
      this.$message.success('登录成功')
    }

  }

}
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
     width: 450px;
  height: 360px;
  background-color: #fff;
   border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

  .avatar_box{
      width:130px;
      height:130px;
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

.btns{
    display: flex;
    justify-content: center;

}
.login_form {
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.info{
    font-size: 13px;
    margin:10px 15px;
}

</style>

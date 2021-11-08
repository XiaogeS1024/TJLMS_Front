<template>
  <el-form :model="stuRegForm" status-icon :rules="rules" ref="stuRegForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="学号" prop="account" required>
      <el-input v-model.number="stuRegForm.account"></el-input>
    </el-form-item>
    <el-form-item label="电子邮件" prop="email" required>
      <el-input v-model.number="stuRegForm.email"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="veriCode" required>
      <el-input v-model.number="stuRegForm.veriCode"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass" required>
      <el-input type="password" v-model="stuRegForm.pass" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" required>
      <el-input type="password" v-model="stuRegForm.checkPass" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button style="text-align:center" type="primary" @click="submitForm('stuRegForm')">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.stuRegForm.checkPass !== '') {
          this.$refs.stuRegForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.stuRegForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      stuRegForm: {
        pass: '',
        checkPass: '',
        account: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Register()
        } else {
          this.$message.error('注册不成功，请重试')
          return false
        }
      })
    },
    async Register () {
      const url = '/SignUp'
      await axios.post(url, { userName: this.stuRegForm.account, password: this.stuRegForm.pass, userType: 'CUSTOMER' })
        .then(
          (response) => {
            this.$message.success('注册成功！' + '您的账号是' + response.data)
            location.reload()
          }
        ).catch(
          (err) => {
            console.log(err)
            this.$message.error('未知错误')
          }
        )
    }
  }
}
</script>

<style scoped>

</style>

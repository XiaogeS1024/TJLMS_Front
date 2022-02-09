<template>
  <div class="app-container">
    <div class="filter-container"></div>
    <el-form
      :model="formData"
      ref="formData"
      style="margin: auto;"
      width="60%"
    >
      <el-form-item label="实验目的" prop="aim" :rules="formDataRules.aim" >
        <el-input
          v-model="formData.aim"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 15 }"
          :disabled="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="实验原理" prop="principle" :rules="formDataRules.principle">
        <el-input
          v-model="formData.principle"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          :disabled="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="实验步骤" prop="step" :rules="formDataRules.step">
        <el-input
          v-model="formData.step"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          :disabled="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="实验结论" prop="result" :rules="formDataRules.result">
        <el-input
          v-model="formData.result"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 15 }"
          :disabled="readonly"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="upload">
      <div class="uploadtitle">附件上传</div>
      <div class="el-upload__tip" slot="tip">
        在这里上传实验报告附件
      </div>
      <el-upload
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        action=""
        :file-list="fileList"
        :http-request="saveFile"
        :before-upload="BeforeUpload"
        drag
        multiple
        :disabled="readonly"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <!-- 这里需要后面加一下暂存和提交调用的方法 -->
    <el-button type="warning" @click="save('formData')" :disabled="readonly">暂存</el-button>
    <el-button type="warning" @click="submit('formData')" :disabled="readonly">提交</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      stuId: JSON.parse(sessionStorage.getItem('detail')).id,
      labId: sessionStorage.getItem('labId'),
      formData: {
        aim: '',
        principle: '',
        step: '',
        result: ''
      },

      formDataRules: {
        aim: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        principle: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        step: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        result: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      newFile: new FormData(),
      fileInfo: {},
      readonly: false
    }
  },
  methods: {
    async getReport () {
      const url = '/post/report/content'
      await axios.post(url, {
        stuId: this.stuId,
        labId: this.labId
      })
        .then(
          (res) => {
            this.formData.aim = res.data[0].aim === null ? '' : res.data[0].aim
            this.formData.principle = res.data[0].principle === null ? '' : res.data[0].principle
            this.formData.step = res.data[0].step === null ? '' : res.data[0].step
            this.formData.result = res.data[0].result === null ? '' : res.data[0].result
            const now = new Date()
            const stringNow = now.getFullYear().toString() + '-' + now.getMonth().toString() + '-' + now.getDate()
            if (res.data[0].mutable === false) {
              this.$message.info('报告已提交，不可修改')
              this.readonly = true
            }
            if (stringNow > sessionStorage.getItem('ddl')) {
              if (res.data[0].mutable !== false) {
                this.$message.info('逾期未交，不可修改')
                this.readonly = true
              }
            }
          }
        )
    },
    // 因为是在加法器report基础上面改的，去掉了domain，所以后面可能也需要改一改
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSave()
        } else {
          console.log('error!!')
        }
      })
    },
    async handleSave () {
      const url = '/post/save/report'
      await axios
        .post(url, {
          aim: this.formData.aim,
          principle: this.formData.principle,
          result: this.formData.result,
          step: this.formData.step,
          stuId: this.stuId,
          labId: this.labId
        })
        .then((response) => {
          this.$message.success('暂存成功！')
          console.log(response)
        })
        .catch((err) => {
          this.$message.error('暂存失败！')
          console.log(err)
        })
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSubmit()
        } else {
          console.log('error!!')
        }
      })
    },

    /// /////////////////////////////////////////////////////////////
    /// /////////////////////////////////////////////////////////////
    /// ///////////////////////////起始//////////////////////////////
    /// ///////////////////////////开始//////////////////////////////
    /// /////////////////////////////////////////////////////////////
    /// /////////////////////////////////////////////////////////////
    async handleSubmit () {
      const url = '/post/submit/report'
      await axios
        .post(url, {
          aim: this.formData.aim,
          principle: this.formData.principle,
          result: this.formData.result,
          step: this.formData.step,
          stuId: this.stuId,
          labId: this.labId
        })
        .then((response) => {
          this.$message.success('提交成功！')
          console.log(response)
          location.reload()
        })
        .catch((err) => {
          this.$message.error('提交失败！')
          console.log(err)
        })
    },

    /// /////////////////////////////////////////////////////////////
    /// /////////////////////////////////////////////////////////////
    /// ///////////////////////////结束//////////////////////////////
    /// /////////////////////////////////////////////////////////////
    /// /////////////////////////////////////////////////////////////

    // async handleSubmit () {
    //   const url = '/post/submit/report'
    //   await axios.post(url, {
    //     stuId: this.stuId,
    //     labId: this.labId
    //   })
    //     .then(
    //       (res) => {
    //         this.$message.success('提交成功')
    //         console.log(res)
    //       }
    //     )
    //     .catch(
    //       (err) => {
    //         this.$message.error('提交失败')
    //         console.log(err)
    //       }
    //     )
    // },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    BeforeUpload (file) {
      if (file) {
        this.newFile.append('file', file) //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中。
        console.log(this.newFile.get('file'))
      } else {
        return false
      }
    },
    async saveFile () {
      const newData = this.newFile //  3. 拿到刚刚的数据，并将其传给后台
      await axios({
        url: 'http://114.55.35.220:8081/api/uploadFileReport',
        method: 'post',
        data: newData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          this.$message.success('上传成功')
          this.fileInfo = res.data
          // console.log('res:', res)
        })
        .catch((err) => {
          this.$message.error('上传失败')
          console.log(err)
        })
      const url = '/save/report/file'
      await axios.post(url, {
        labId: this.labId,
        location: this.fileInfo.path,
        name: this.fileInfo.fileName,
        stuId: this.stuId
      }).catch(
        (err) => {
          this.$message.error('存储数据库失败')
          console.log(err)
        }
      )
    }
  },
  created () {
    this.getReport()
  }
}
</script>

<style scoped>
.upload {
  margin-bottom: 20px;
}
.uploadtitle {
  font-size: 14px;
}
.el-button {
  color: #fff;
  margin-right: 20px;
}
.app-container {
  padding: 2%;
  width: 60%;
  margin-left: 20%;
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 30px #525151;
}
.el-input {
  width: 250px;
  height: 50px;
}
</style>

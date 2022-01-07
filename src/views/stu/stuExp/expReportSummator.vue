<template>
  <div class="app-container">
    <div class="filter-container"></div>
    <el-form
      :model="formData"
      ref="formData"
      style="margin: auto;"
      width="60%"
    >
      <el-form-item label="实验目的" prop="aim" :rules="formaDataRules.aim">
        <el-input
          v-model="formData.aim"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 15 }"
          :disabled="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="实验原理" prop="principle" :rules="formaDataRules.principle">
        <el-input
          v-model="formData.principle"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          :disabled="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="实验步骤" prop="step" :rules="formaDataRules.step">
        <el-input
          v-model="formData.step"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          :disabled="readonly"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="init()" icon="el-icon-circle-plus"
        >请点击展开加法器实验结果表格</el-button
      >
      <el-table :data="formData.domains">
        <el-table-column label="B1">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.b1'"
              :rules="formaDataRules.b1"
            >
              <el-input v-model="scope.row.b1" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="B2">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.b2'"
              :rules="formaDataRules.b2"
            >
              <el-input v-model="scope.row.b2" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="B3">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.b3'"
              :rules="formaDataRules.b3"
            >
              <el-input v-model="scope.row.b3" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="B4">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.b4'"
              :rules="formaDataRules.b4"
            >
              <el-input v-model="scope.row.b4" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="S1">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.s1'"
              :rules="formaDataRules.s1"
            >
              <el-input v-model="scope.row.s1" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="S2">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.s2'"
              :rules="formaDataRules.s2"
            >
              <el-input v-model="scope.row.s2" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="S3">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.s3'"
              :rules="formaDataRules.s3"
            >
              <el-input v-model="scope.row.s3" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="S4">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.s4'"
              :rules="formaDataRules.s4"
            >
              <el-input v-model="scope.row.s4" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="C">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.c'"
              :rules="formaDataRules.c"
            >
              <el-input v-model="scope.row.c" :disabled="readonly"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item label="实验结论" prop="result" :rules="formaDataRules.result">
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
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      stuId: JSON.parse(sessionStorage.getItem('detail')).id,
      formData: {
        aim: '',
        principle: '',
        step: '',
        result: '',
        domains: undefined
      },
      formaDataRules: {
        aim: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        principle: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        step: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        result: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        b1: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        b2: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        b3: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        b4: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        s1: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        s2: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        s3: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        s4: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        c: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      domains: [],
      readonly: false,
      newFile: new FormData(),
      fileInfo: {}
    }
  },
  methods: {
    initDomains () {
      this.domains = [
        {
          b1: undefined,
          b2: undefined,
          b3: undefined,
          b4: undefined,
          s1: undefined,
          s2: undefined,
          s3: undefined,
          s4: undefined,
          c: undefined
        },
        {
          b1: undefined,
          b2: undefined,
          b3: undefined,
          b4: undefined,
          s1: undefined,
          s2: undefined,
          s3: undefined,
          s4: undefined,
          c: undefined
        },
        {
          b1: undefined,
          b2: undefined,
          b3: undefined,
          b4: undefined,
          s1: undefined,
          s2: undefined,
          s3: undefined,
          s4: undefined,
          c: undefined
        },
        {
          b1: undefined,
          b2: undefined,
          b3: undefined,
          b4: undefined,
          s1: undefined,
          s2: undefined,
          s3: undefined,
          s4: undefined,
          c: undefined
        },
        {
          b1: undefined,
          b2: undefined,
          b3: undefined,
          b4: undefined,
          s1: undefined,
          s2: undefined,
          s3: undefined,
          s4: undefined,
          c: undefined
        },
        {
          b1: undefined,
          b2: undefined,
          b3: undefined,
          b4: undefined,
          s1: undefined,
          s2: undefined,
          s3: undefined,
          s4: undefined,
          c: undefined
        },
        {
          b1: undefined,
          b2: undefined,
          b3: undefined,
          b4: undefined,
          s1: undefined,
          s2: undefined,
          s3: undefined,
          s4: undefined,
          c: undefined
        }
      ]
    },
    init () {
      this.$set(this.formData, 'domains', this.domains)
    },
    async getReport () {
      const url = '/get/summator/content?id=' + this.stuId
      await axios.get(url)
        .then(
          (res) => {
            console.log(res.data.result)
            this.formData.aim = res.data.basic === null ? '' : res.data.basic.aim
            this.formData.principle = res.data.basic === null ? '' : res.data.basic.principle
            this.formData.step = res.data.basic === null ? '' : res.data.basic.step
            this.formData.result = res.data.basic === null ? '' : res.data.basic.conclusion
            for (let i = 0; i < res.data.result.length; i++) {
              this.domains.push({
                b1: res.data.result[i].b1,
                b2: res.data.result[i].b2,
                b3: res.data.result[i].b3,
                b4: res.data.result[i].b4,
                s1: res.data.result[i].s1,
                s2: res.data.result[i].s2,
                s3: res.data.result[i].s3,
                s4: res.data.result[i].s4,
                c: res.data.result[i].c
              })
            }
            console.log(this.domains)
            const now = new Date()
            const stringNow = now.getFullYear().toString() + '-' + now.getMonth().toString() + '-' + now.getDate()
            if (res.data.basic.mutable === false) {
              this.$message.info('报告已提交，不可修改')
              this.readonly = true
            }
            if (stringNow > sessionStorage.getItem('ddl')) {
              if (res.data.basic.mutable !== false) {
                this.$message.info('逾期未交，不可修改')
                this.readonly = true
              }
            }
          }
        )
        .catch(
          (err) => {
            console.log(err)
          }
        )
    },
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSave()
        } else {
          console.log('error!!')
          return false
        }
      })
    },
    async handleSave () {
      const url = '/save/summator'
      await axios
        .post(url, {
          summatorBasicDto: {
            aim: this.formData.aim,
            principle: this.formData.principle,
            conclusion: this.formData.result,
            step: this.formData.step,
            stuId: this.stuId
          },
          resultList: this.formData.domains
        })
        .then((response) => {
          this.$message.success('暂存成功！')
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
          return false
        }
      })
    },
    async handleSubmit () {
      const url = '/submit/summator'
      await axios.post(url, {
        summatorBasicDto: {
          aim: this.formData.aim,
          principle: this.formData.principle,
          conclusion: this.formData.result,
          step: this.formData.step,
          stuId: this.stuId
        },
        resultList: this.formData.domains
      })
        .then(
          (res) => {
            this.$message.success('提交成功')
          }
        )
        .catch(
          (err) => {
            this.$message.error('提交失败')
            console.log(err)
          }
        )
    },
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
        labId: 1,
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
  async created () {
    await this.getReport()
    if (this.domains.length === 0) {
      this.initDomains()
    }
  }
}
</script>

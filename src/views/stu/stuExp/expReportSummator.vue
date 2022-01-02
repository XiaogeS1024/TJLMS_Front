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

        ></el-input>
      </el-form-item>
      <el-form-item label="实验原理" prop="principle" :rules="formaDataRules.principle">
        <el-input
          v-model="formData.principle"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
        ></el-input>
      </el-form-item>
      <el-form-item label="实验步骤" prop="step" :rules="formaDataRules.step">
        <el-input
          v-model="formData.step"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
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
              <el-input v-model="scope.row.b1"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="B2">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.b2'"
              :rules="formaDataRules.b2"
            >
              <el-input v-model="scope.row.b2"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="B3">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.b3'"
              :rules="formaDataRules.b3"
            >
              <el-input v-model="scope.row.b3"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="B4">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.b4'"
              :rules="formaDataRules.b4"
            >
              <el-input v-model="scope.row.b2"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="S1">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.s1'"
              :rules="formaDataRules.s1"
            >
              <el-input v-model="scope.row.s1"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="S2">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.s2'"
              :rules="formaDataRules.s2"
            >
              <el-input v-model="scope.row.s2"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="S3">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.s3'"
              :rules="formaDataRules.s3"
            >
              <el-input v-model="scope.row.s3"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="S4">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.s4'"
              :rules="formaDataRules.s4"
            >
              <el-input v-model="scope.row.s4"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="C">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.c'"
              :rules="formaDataRules.c"
            >
              <el-input v-model="scope.row.c"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item label="实验结论" prop="result" :rules="formaDataRules.result">
        <el-input
          v-model="formData.result"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 15 }"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="upload">
      <div class="uploadtitle">附件上传</div>
      <div class="el-upload__tip" slot="tip">
        在这里上传实验报告需要上传的附件
      </div>
      <el-upload
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        action=""
        :file-list="fileList"
        :http-request="UploadAndAdd"
        :before-upload="BeforeUpload"
        drag
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <!-- 这里需要后面加一下暂存和提交调用的方法 -->

    <el-button type="warning" @click="save('formData')">暂存</el-button>
    <el-button type="warning" @click="save('formData')">提交</el-button>
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
      domains: []
    }
  },
  mounted () {
    this.initDomains()
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
      const url = '/post/save/report'
      await axios
        .post(url, {
          aim: this.formData.aim,
          labId: this.labId,
          principle: this.formData.principle,
          result: this.formData.result,
          step: this.formData.step,
          stuId: this.stuId
        })
        .then((response) => {
          this.$message.success('保存成功！')
          // console.log(this.isStudent)
        })
        .catch((err) => {
          this.$message.error('保存失败！')
          console.log(err)
        })
    }
  }
}
</script>

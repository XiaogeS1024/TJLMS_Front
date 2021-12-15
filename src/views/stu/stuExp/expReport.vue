<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="init()" icon="el-icon-circle-plus"
        >add</el-button
      >
    </div>
      <el-form :model="formData" ref="form"  style="margin: auto；" width='60%'>
        <el-form-item label="实验目的" prop="aim">
          <el-input v-model="formData.aim"></el-input>
        </el-form-item>
        <el-form-item label="实验原理" prop="principle">
          <el-input v-model="formData.principle"></el-input>
        </el-form-item>
        <el-form-item label="实验步骤" prop="step">
          <el-input v-model="formData.step"></el-input>
        </el-form-item>
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
      </el-form>
      <el-button type="warning" @click="submit('form')">submit</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        aim: '',
        principle: '',
        step: '',
        domains: undefined
      },
      formaDataRules: {
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
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.app-container {
  width: 60%;
  margin-left:20%;
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 30px #525151;
}
.el-input{
    width: 250px;
}
</style>

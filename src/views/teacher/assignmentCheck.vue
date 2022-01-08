<template>
  <div class="app-container">
    <div class="filter-container"></div>
    <el-card class="fixed">
      <h4>请对报告评分：</h4>
      <el-form :model="gradeForm">
        <el-form-item label="分数：" prop="score" :rules="[
      { required: true, message: '分数不能为空'},
      { type: 'number', message: '分数必须为数字值'}
    ]">
          <el-input v-model.number="gradeForm.score"></el-input>
        </el-form-item>
        <el-form-item label="评语：" prop="note">
          <el-input
            v-model="gradeForm.note"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 这里需要后面加一下暂存和提交调用的方法 -->
      <el-button type="warning" @click="saveGrade">暂存</el-button>
      <el-button type="warning" @click="releaseGrade">提交</el-button>
    </el-card>

    <el-descriptions class="margin-top" title="报告信息：" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          学号
        </template>
        {{ stuId }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          学生姓名
        </template>
        {{ stuName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          实验名称
        </template>
        {{ labname }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          提交时间
        </template>

        <div v-if="formData===''">
          暂未提交
        </div>
        <div v-else>
        {{ formData.updateDate }}
        </div>
      </el-descriptions-item>

     <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          报告状态
        </template>
        <div v-if="formData.isChecked===true">
已批改
        </div>
        <div v-else>
未批改
        </div>
        <!-- {{ formData.isChecked }} -->
      </el-descriptions-item>

    </el-descriptions>

    <h4 style="margin: 20px 0px">报告内容:</h4>

    <div class="checkexp">
      <div class="checkexptitle">&nbsp;实验目的</div>
      <el-card
        body-style="padding:5px 15px;  font-size: 14px ; color: rgb(96, 98, 102);"
        shadow="hover"
      >
        &nbsp;{{ formData.aim }}
      </el-card>
    </div>
    <div class="checkexp">
      <div class="checkexptitle">&nbsp;实验原理</div>
      <el-card
        body-style="padding:5px 15px;  font-size: 14px ; color: rgb(96, 98, 102);"
        shadow="hover"
      >
        &nbsp;{{ formData.principle }}
      </el-card>
    </div>
    <div class="checkexp">
      <div class="checkexptitle">&nbsp;实验步骤</div>
      <el-card
        body-style="padding:5px 15px;  font-size: 14px ; color: rgb(96, 98, 102);"
        shadow="hover"
      >
        &nbsp;{{ formData.step }}
      </el-card>
    </div>
    <div class="checkexp">
      <div class="checkexptitle">&nbsp;实验结论</div>
      <el-card
        body-style="padding:5px 15px;  font-size: 14px ; color: rgb(96, 98, 102);"
        shadow="hover"
      >
        &nbsp;{{ formData.result }}
      </el-card>
    </div>

    <div class="checkexp">
      <div class="checkexptitle">&nbsp;附件下载</div>
 <el-button type="warning" @click="downloadFile(fileInfo.name)" :disabled="fileInfo===null" >点击下载附件</el-button>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  position: fixed;
  right: 30px;
  top: 25vh;
}
.el-card {
  border-color: rgb(215, 228, 226);
}
.checkexp {
  margin-bottom: 20px;
}
.checkexptitle {
  font-size: 14px;
  margin-bottom: 10px;
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
      gradeForm: {
        note: '',
        score: ''
      },

      stuId: sessionStorage.getItem('stuId_to_checkExp'),
      labId: sessionStorage.getItem('labId_to_getlist'),
      stuName: sessionStorage.getItem('stuName'),

      labname: sessionStorage.getItem('labname'),
      formData: {
        // aim: "",
        // principle: "",
        // step: "",
        // result: "",
      },
      formaDataRules: {
        aim: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        principle: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        step: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        result: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      readonly: false,
      newFile: new FormData(),
      fileInfo: null
    }
  },
  methods: {
    async getReport () {
      const url = '/get/report/detail'
      await axios
        .post(url, {
          labId: this.labId,
          stuId: this.stuId
        })
        .then((res) => {
          this.fileInfo = res.data.file
          console.log(res.data.file)
          this.formData = res.data.content === null ? '' : res.data.content
          console.log(res.data.content)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    downloadFile (name) {
      window.location.href = 'http://114.55.35.220:8081/api/downloadFileReport/' + name
    },

    async saveGrade () {
      const url = '/post/save/grade'
      await axios
        .post(url, {
          classId: sessionStorage.getItem('classId'),
          labId: sessionStorage.getItem('labId_to_getlist'), // need to be modified
          note: this.gradeForm.note,
          score: this.gradeForm.score,
          stuId: sessionStorage.getItem('stuId_to_checkExp'),
          teacherId: JSON.parse(sessionStorage.getItem('detail')).id
        })
        .then((res) => {
          this.$message.success('成绩暂存成功')
        })
        .catch((err) => {
          this.$message.error('成绩暂存失败')
          console.log(err)
        })
    },

    async releaseGrade () {
      const url =
        '/post/release/individual?labId=' +
        sessionStorage.getItem('labId') +
        '&stuId=' +
        sessionStorage.getItem('stuId')
      await axios
        .post(url)
        .then((res) => {
          this.$message.success('成绩发布成功')
        })
        .catch((err) => {
          this.$message.error('成绩发布失败')
          console.log(err)
        })
    }
  },

  mounted () {
    this.stuId = sessionStorage.getItem('stuId_to_checkExp')
    this.labId = sessionStorage.getItem('labId_to_getlist')
    this.stuName = sessionStorage.getItem('stuName')
    this.getReport()
  }
}
</script>

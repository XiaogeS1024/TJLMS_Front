<template>
  <div>
    <div>
        <v-banner single-line height:24px style="font-size: 22px;">
    <v-icon
      slot="icon"
      color="warning"
      size="36"
    >
      mdi-creation
    </v-icon>
    班级：{{classId}}

    <template v-slot:actions>
      <v-btn
        color="primary"
        class="addStudentBtn"
        @click="writeStudentID"
      >
      <v-icon left dark>mdi-account-plus</v-icon>
        添加学生
      </v-btn>

      <v-btn
        color="blue"
        style="color: white;"
        class="addStudentBtn"
        @click="writeAssistID"
      >
      <v-icon left>mdi-account-plus</v-icon>
        添加助教
      </v-btn>
    </template>
  </v-banner>
    </div>

    <div style="box-shadow: 10px 10px 5px #888888">
      <v-tabs v-model="tab" background-color="primary"
      dark class="studentTab">
        <v-tab
      >
        学生管理
      </v-tab>
      <v-tab
      >
        可选助教
      </v-tab>
      <v-tab
      >
        成绩管理
      </v-tab>
      <v-tab
        :disabled="!isResp"
      >
        班级管理
      </v-tab>
    </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
            <el-table
              class="memberTable"
              stripe
              highlight-current-row
              :data="studentList.filter(data => search || data.studentName.includes(search)||data.studentId.includes(search))"
              height="470px"
              :row-style="{ height: '50px' }"
              :cell-style="{ padding: '0' }"
            >
            <el-table-column
      type="index"
      width="50">
    </el-table-column>
              <el-table-column prop="studentName" label="姓名" width="100px">
              </el-table-column>
              <el-table-column prop="studentId" label="学号" width="100px">
              </el-table-column>
              <el-table-column
      >
       <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template slot="header" slot-scope="scope" align="right">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入姓名/学号进行搜索"/>
      </template>
                  <template slot-scope="scope">

                    <v-btn color="error" fab x-small depressed dark style="margin-left: 50px"
                           @click="open(scope.row)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>

              </el-table-column>
            </el-table>
            <!-- <div class="block">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="studentList.length"
      >
      </el-pagination>
    </div> -->
          </v-tab-item>

            <v-tab-item>
            <el-table
              class="memberTable1"
              stripe
              :data="assistList.filter(data => !search || data.studentName.toLowerCase().includes(search.toLowerCase())||data.studentId.includes(search))"
              height="470px"
              :row-style="{ height: '50px' }"
              :cell-style="{ padding: '0' }"
            >
              <el-table-column prop="assistName" label="助教姓名" width="150px">
              </el-table-column>
              <el-table-column prop="assistId" label="学号" width="150px">
              </el-table-column>
              <el-table-column prop="assistEmail" label="邮箱">
              </el-table-column>
            </el-table>
          </v-tab-item>

          <v-tab-item>
              <v-banner single-line height:24px  style="color:#8BC34A;font-size:15px;margin-left:100px;">
    <v-icon
      slot="icon"
      color="cyan"
      size="24"
    >
      mdi-feather
    </v-icon>
    Tip:如果您是责任教师，可以点击修改成绩权重

    <template v-slot:actions>
      <v-btn
      style="margin-right:400px;"
        outlined
        @click="changeWeight"
      :disabled="!isResp"
      >
      <v-icon left dark>mdi-pencil</v-icon> 修改成绩权重
      </v-btn>

    </template>
  </v-banner>
            <v-card class="mx-4 rounded-xl pa-4 mt-5" :elevation=10>
            <h3 style="margin-left:20px;margin-top:15px">班级成绩概览{{ "\xa0\xa0\xa0\xa0" }}CLASS SCORE</h3>
            <v-divider></v-divider>
            <v-row style="margin-top:20px">
            <v-col  style="margin-left:100px" cols="12" sm="3">
            <v-progress-circular
                :rotate="-90"
                :size="120"
                :width="15"
                :value="value1"
                color="amber"
            >
            {{ value1 }}/100(%)
            </v-progress-circular><br />
            <span>出勤率</span>
            </v-col>
            <v-col cols="12" sm="3">
            <v-progress-circular
                :rotate="-90"
                :size="120"
                :width="15"
                :value="value2"
                color="cyan"
            >
            {{ value2 }}/100(%)
            </v-progress-circular><br />
            <span>平均实验成绩</span>
            </v-col>
            <v-col cols="12" sm="4">
            <v-progress-circular
                :rotate="-90"
                :size="120"
                :width="15"
                :value="value3"
                color="pink"
            >
            {{ value3 }}/100(%)
            </v-progress-circular><br />
            <span>平均总成绩</span>
            </v-col>
            </v-row>

            <v-divider></v-divider>
<!--            <h3 style="margin-left:20px;margin-top:15px">课程成绩概览{{ "\xa0\xa0\xa0\xa0" }}CLASS SCORE</h3>-->
<!--            <v-row style="margin-top:20px">-->
<!--            <v-col  style="margin-left:100px" cols="12" sm="3">-->
<!--            <v-progress-circular-->
<!--                :rotate="-90"-->
<!--                :size="120"-->
<!--                :width="15"-->
<!--                :value="value1"-->
<!--                color="amber"-->
<!--            >-->
<!--            {{ value1 }}/100(%)-->
<!--            </v-progress-circular><br />-->
<!--            <span>出勤率</span>-->
<!--            </v-col>-->
<!--            <v-col cols="12" sm="3">-->
<!--            <v-progress-circular-->
<!--                :rotate="-90"-->
<!--                :size="120"-->
<!--                :width="15"-->
<!--                :value="value2"-->
<!--                color="cyan"-->
<!--            >-->
<!--            {{ value2 }}/100(%)-->
<!--            </v-progress-circular><br />-->
<!--            <span>平均实验成绩</span>-->
<!--            </v-col>-->
<!--            <v-col cols="12" sm="4">-->
<!--            <v-progress-circular-->
<!--                :rotate="-90"-->
<!--                :size="120"-->
<!--                :width="15"-->
<!--                :value="value3"-->
<!--                color="pink"-->
<!--            >-->
<!--            {{ value3 }}/100(%)-->
<!--            </v-progress-circular><br />-->
<!--            <span>平均总成绩</span>-->
<!--            </v-col>-->
<!--            </v-row>-->
          </v-card>
          </v-tab-item>

                    <v-tab-item>
              <v-banner single-line height:24px  style="color:#8BC34A;font-size:15px;margin-left:100px;">
    <v-icon
      slot="icon"
      color="cyan"
      size="24"
    >
      mdi-feather
    </v-icon>
    Tip:作为责任教师，您可以进行班级建立与管理

    <v-dialog v-model="classDialogVisible" persistent max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            shadow="hover"
      style="margin-left:400px;"
        outlined
        @click="addClass"
        v-bind="attrs"
              v-on="on"
      >
      <v-icon left dark>mdi-pencil</v-icon> 建立新班级
      </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h3 class="font">新建班级</h3>
            </v-card-title>
            <v-card-text>
              <v-container style="margin-top: 20px">
                <!--班级信息表单-->
                <v-form ref="classInfo" :model="classInfo">
                  <v-row>
                    <v-col cols="3" >
                      <v-subheader class="font-weight-bold" style="font-size:1rem">班级编号</v-subheader>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        label=" Please enter the class's id"
                        prop="classId"
                        v-model="classInfo.classId"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="3" >
                      <v-subheader class="font-weight-bold" style="font-size:1rem">班级教师ID</v-subheader>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        label=" Please enter the teacher's id"
                        prop="teacherId"
                        v-model="classInfo.teacherId"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
      <v-col cols="3">
        <v-subheader class="font-weight-bold" style="font-size:1rem">班级学生名单</v-subheader>
      </v-col>
      <v-col cols="8">
        <el-form label-width="80px">
    <el-form-item >

      <el-upload
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        action=""
        :file-list="fileList"
        :http-request="Upload"
        :before-upload="BeforeUpload"
        drag
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">支持的文件格式有：xls/xlsx</div>
      </el-upload>
      </el-form-item>
  </el-form>

      </v-col>
    </v-row>

                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div slot="footer" class="dialog-footer">
                <v-btn color="blue darken-1" text @click="classDialogVisible = false"
                  >Close</v-btn
                >
                <v-btn color="blue darken-1" text @click="classDialogVisible = false"
                  >Save</v-btn
                >
                <v-btn
                  color="blue darken-1" text
                  @click="submitClass"
                  >Release</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </v-banner>
            <v-card class="mx-4 rounded-xl pa-4 mt-5" :elevation=10>
<el-table
              class="memberTable"
              stripe
              highlight-current-row
              :data="classList"
              height="470px"
              :header-cell-style="{'text-align':'center'}"
              :row-style="{ height: '50px' }"
              :cell-style="{ padding: '0', 'text-align':'center'}"
            >
            <el-table-column prop="classId" label="班级编号" width="120px">
              </el-table-column>
              <el-table-column prop="respName" label="责任教师" width="120px">
              </el-table-column>
              <el-table-column prop="teacherName" label="教师" width="100px">
              </el-table-column>
              <el-table-column prop="stuNum" label="学生数量" width="100px">
              </el-table-column>
              <el-table-column label="操作"
      >
       <!-- eslint-disable-next-line vue/no-unused-vars -->
                <template slot-scope="scope">
                    <v-btn color="error" fab x-small depressed dark style="margin-left: 0px"
              @click="deleteClass(scope.row)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
                </template>
              </el-table-column>
            </el-table>
          </v-card>
          </v-tab-item>
    </v-tabs-items>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      teacherId: JSON.parse(sessionStorage.getItem('detail')).id,
      classId: '',
      tab: null,
      studentList: [],
      assistList: [],
      dialogVisible: false,
      addStudentID: '',
      search: '',
      interval1: {},
      interval2: {},
      interval3: {},
      value1: 0.0,
      value2: 0,
      value3: 0,
      classDialogVisible: false,
      classInfo: {
        classId: '',
        teacherId: ''
      },
      newFile: new FormData(),
      fileList: [],
      classList: [],
      isResp: false
    //   currentPage: 1, // 当前页码
    //   total: 20, // 总条数
    //   pageSize: 20 // 每页的数据条数
    }
  },
  methods: {
    // // 每页条数改变时触发 选择一页显示多少行
    // handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
    //   this.currentPage = 1
    //   this.pageSize = val
    // },
    // // 当前页改变时触发 跳转其他页
    // handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`)
    //   this.currentPage = val
    // },
    // 删除学生的提示，确认后调用api删除学生
    open (row) {
      this.$confirm(
        '你确定要删除此学生吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteStudent(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
    },

    // 调用api向后端发送删除学生的id
    deleteStudent (data) {
      axios.post('/delete/class/student', { classId: this.classId, studentId: data.studentId })
        .then((response) => {
        //   this.tableData.splice(data, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.reload()
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败! 请稍后再试'
          })
        })
    },

    // 填写添加学生的id并检验
    writeStudentID () {
      this.$prompt('请输入学生学号', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputPattern: /^\d\d\d\d\d\d\d$/,
        inputErrorMessage: 'ID格式错误!'
      })
        .then(({ value }) => {
          this.addStudent(value)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
    },

    // 调用api，像后端发送添加学生的id
    addStudent (data) {
      axios.post('/post/student', { classId: this.classId, stuId: data })
        .then((response) => {
          if (response.data) {
            this.loadData()
            this.$message({
              type: 'success',
              message: '添加成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message:
                '添加失败！该学生已存在于当前班级中！'
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '添加失败，请重新尝试！'
          })
        })
    },

    // 填写添加助教的id并检验
    writeAssistID () {
      this.$prompt('请输入助教学号', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputPattern: /^\d\d\d\d\d\d\d$/,
        inputErrorMessage: 'ID格式错误!'
      })
        .then(({ value }) => {
          this.addAssist(value)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
    },

    // 调用api，像后端发送添加学生的id
    addAssist (data) {
      axios.post('/post/set/assistant', { assistId: data, classId: this.classId })
        .then((response) => {
          if (response.data) {
            this.reload()
            this.$message({
              type: 'success',
              message: '添加成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message:
                '添加失败！'
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '添加失败，请重新尝试！'
          })
        })
    },

    // 调用api，加载列表
    loadData () {
      this.studentList.length = 0
      axios
        .get('/get/my/classes?teacherId=' + this.teacherId, {
          params: {}
        })
        .then((response) => {
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].teacherId === this.teacherId || response.data[i].respId === this.teacherId || response.data[i].assistId === this.teacherId) {
              this.classId = response.data[i].id
            }
          }
          axios
            .get('/get/students/' + this.classId, {
              params: {
                classId: this.classId
              }
            })
            .then((response) => {
              console.log(response.data)
              for (let i = 0; i < response.data.length; i++) {
                this.studentList.push({
                  studentId: response.data[i].stuId,
                  studentName: response.data[i].stuName
                })
              }
              axios
                .get('/get/assist', {
                  params: {
                    // classId: this.classId
                  }
                })
                .then((response) => {
                  console.log(response.data)
                  for (let i = 0; i < response.data.length; i++) {
                    this.assistList.push({
                      assistId: response.data[i].id,
                      assistName: response.data[i].name,
                      assistEmail: response.data[i].emailAddr
                    })
                  }
                  axios
                    .get('/get/classes', {
                      params: {
                      }
                    })
                    .then((response) => {
                      console.log(response.data)
                      for (let i = 0; i < response.data.length; i++) {
                        this.classList.push({
                          classId: response.data[i].id,
                          respName: response.data[i].respId,
                          teacherName: response.data[i].teacherId,
                          stuNum: response.data[i].stuNum
                        })
                      }
                    })
                })
            })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 修改成绩权重
    changeWeight () {
      this.$prompt('请输入考勤分数占比(%)', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          this.change(value)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
    },
    change (data) {
      axios.post('/post/attendance/ratio', { attendanceRatio: data })
        .then((response) => {
          if (response.data) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message:
                '修改失败！'
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '修改失败，请重新尝试！'
          })
        })
    },
    handleRemove (file, fileList1) {
      console.log(file, fileList1, this.fileList, '移除')
      this.fileList = fileList1
    },
    handlePreview (file) {
      console.log(file)
    },
    BeforeUpload (file) {
      if (file) {
        this.newFile.append('file', file) //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中。
        this.fileList.push({
          name: file.name
          // url: file.url
        })
        console.log(this.newFile.get('file'))
      } else {
        return false
      }
    },

    submitClass () {
      if (!this.classInfo.classId) {
        this.$message.error('请输入班级编号')
      } else if (!this.classInfo.classId) {
        this.$message.error('请输入班级教师工号')
      } else {
        this.submit()
      }
    },
    // 提交实验项目信息
    async submit () {
      const url = '/post/class'
      await axios.post(url, { assistId: '', classId: this.classInfo.classId, respId: this.teacherId, teacherId: this.classInfo.teacherId })
        .then((response) => {
          const newData = this.newFile //  3. 拿到刚刚的数据，并将其传给后台
          axios({
            url: 'http://114.55.35.220:8081/api/uploadFileUser',
            method: 'post',
            data: newData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then((response) => {
              this.$message.success('发布成功！')
              const url = '/post/students/class'
              axios.post(url, {
                classId: this.classInfo.classId,
                filePath: response.data.path
              })
                .then(
                  (res) => {
                    this.$message.success('学生添加成功')
                    console.log(res)
                  }
                )
                .catch(
                  (err) => {
                    this.$message.error('学生添加失败')
                    console.log(err)
                  }
                )
              this.classDialogVisible = false
              this.reload()
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除班级的提示
    deleteClass (row) {
      this.$confirm(
        '你确定要删除此班级吗？请慎重操作！',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.delete(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
    },
    delete (data) {
      axios.post('/delete/class/' + data.classId, { classId: data.classId })
        .then((response) => {
        //   this.tableData.splice(data, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.reload()
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败! 请稍后再试'
          })
        })
    },
    async checkResp () {
      const url = '/check/notice/' + this.teacherId
      await axios.get(url)
        .then((res) => {
          this.isResp = true
          console.log(this.isResp)
        })
    }
  },
  mounted () {
    this.checkResp()
    this.loadData()
    this.interval1 = setInterval(() => {
      if (66.7 - this.value1 <= 1) {
        return (this.value1 = 66.7)
      }
      this.value1 += 1
    }, 1)

    this.interval2 = setInterval(() => {
      if (80 - this.value2 <= 1) {
        return (this.value2 = 80)
      }
      this.value2 += 1
    }, 1)

    this.interval3 = setInterval(() => {
      if (75.5 - this.value3 <= 1) {
        return (this.value3 = 75.5)
      }
      this.value3 += 1
    }, 1)
  }
}
</script>

<style scoped>
.el-button{
  color: #FFFFFF;
}
.studentTab {
  height: 100%;
  margin-top: 20px;
  /* margin-right: 50px;
  margin-left: 40px; */
  background-color: white;
  width:100%
}

.addStudentBtn {
  position: relative;
  margin-left: 40px;
  margin-right: 20px;
}

.memberTable {
  width: 90%;
  margin-top: 20px;
  margin-left: 60px;
}
.memberTable1 {
  width: 90%;
  margin-top: 20px;
  margin-left: 100px;
}
</style>

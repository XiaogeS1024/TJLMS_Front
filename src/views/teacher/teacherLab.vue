<template>
  <!-- eslint-disable -->
  <v-container class="container--fluid">
    <v-row>
      <v-col cols="12">
        <img src="@/assets/2.png" class="img" />
      </v-col>
    </v-row>
    <v-row style="margin-top: -120px">
      <v-col cols="12" sm="8">
        <h2 class="font">批改实验报告</h2>
        <v-divider></v-divider>
        <v-expansion-panels
          focusable
          v-for="(experiment, index) in experimentList.labs"
          style="margin-top: 20px"
        >
          <v-expansion-panel>
            <v-expansion-panel-header
              style="font-weight: bold; font-size: 20px"
              >{{ experiment.name }}</v-expansion-panel-header
            >
            <v-expansion-panel-content style="margin-top: 10px">
              <span style="font-weight: bold">发布教师：</span>
              {{ experimentList.names[index] }}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <span style="font-weight: bold">截止日期：</span>
              {{ experiment.deadline }}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <span style="font-weight: bold">实验介绍：</span>
              {{ experiment.intro }}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <!-- <template v-slot:activator="{ on, attrs }"> -->

              <!-- v-bind="attrs"
                    v-on="on" -->
<!--              <template>-->
<!--                <v-btn-->
<!--                  class="px-3"-->
<!--                  color="green"-->
<!--                  dark-->
<!--                  style="margin-left: 240px"-->
<!--                  >进入实验</v-btn-->
<!--                >-->
<!--              </template>-->
              <!-- <template v-slot:activator="{ on, attrs }"> -->

              <!-- v-bind="attrs"
                    v-on="on" -->
              <template>
                <v-btn
                  class="px-3"
                  color="indigo"
                  dark
                  style="margin-left: 300px"
                  @click="clickmethod2(experiment.id, experiment.name)"
                  disabled="canGrade"
                  >批改实验</v-btn
                >
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="8" sm="4">
        <v-dialog v-model="projectDialogVisible" persistent max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <h2 class="font">发布实验</h2>
            <v-divider></v-divider>
            <v-card
              shadow="hover"
              v-bind="attrs"
              v-on="on"
              style="cursor:pointer; margin-top: 20px"
              @click="checkRelease"
            >
              <img
                src="@/assets/4.png"
                width="200px"
                style="margin-left: 50px"
              />
            </v-card>
          </template>
          <v-card>
            <v-card-title>
              <h3 class="font">发布实验项目</h3>
            </v-card-title>
            <v-card-text>
              <v-container style="margin-top: 20px">
                <!--填写实验项目信息-->
                <!--实验信息表单-->
                <v-form ref="ProjectInfo" :model="projectInfo">
                  <v-row>
                    <v-col cols="3">
                      <v-subheader
                        class="font-weight-bold"
                        style="font-size: 1.1rem"
                        >实验项目名称</v-subheader
                      >
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        label=" 请输入实验名称"
                        prop="name"
                        v-model="projectInfo.name"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="3">
                      <v-subheader
                        class="font-weight-bold"
                        style="font-size: 1.1rem"
                        >实验项目简介</v-subheader
                      >
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        v-model="projectInfo.intro"
                        clearable
                        clear-icon="mdi-close-circle"
                        label="请输入实验简介"
                        outlined
                        rows="2"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="3">
                      <v-subheader
                        class="font-weight-bold"
                        style="font-size: 1.1rem"
                        >项目截止时间</v-subheader
                      >
                    </v-col>
                    <v-col cols="5">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Please select the project's deadline"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            suffix="23:59"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="3">
                      <v-subheader
                        class="font-weight-bold"
                        style="font-size: 1.1rem"
                        >实验指导书</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <el-form label-width="80px">
                        <el-form-item>
                          <el-upload
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            action=""
                            :file-list="fileList"
                            :before-upload="BeforeUpload"
                            drag
                            multiple
                          >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                              将文件拖到此处，或<em>点击上传</em>
                            </div>
                            <div class="el-upload__tip" slot="tip">
                              支持的文件格式有：doc/docx/ppt/pptx/xls/pdf等
                            </div>
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
                <v-btn
                  color="blue darken-1"
                  text
                  @click="projectDialogVisible = false"
                  >关闭</v-btn
                >
                <v-btn color="blue darken-1" text @click="submitProject"
                  >发布</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <!-- 第一个dialog -->
<!--    <v-dialog-->
<!--      v-model="dialog"-->
<!--      fullscreen-->
<!--      hide-overlay-->
<!--      transition="dialog-bottom-transition"-->
<!--    >-->
<!--      <v-card>-->
<!--        <v-toolbar dark color="teal">-->
<!--          <v-btn icon dark @click="dialog = false">-->
<!--            <v-icon>mdi-close</v-icon>-->
<!--          </v-btn>-->
<!--          <v-toolbar-title-->
<!--            >EXPERIMENT{{ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"-->
<!--            }}{{ labname }}</v-toolbar-title-->
<!--          >-->
<!--          <v-spacer></v-spacer>-->
<!--&lt;!&ndash;          <v-toolbar-items>&ndash;&gt;-->
<!--&lt;!&ndash;            <v-btn dark text @click="dialog = false">Save</v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;          </v-toolbar-items>&ndash;&gt;-->
<!--        </v-toolbar>-->
<!--        <v-bottom-navigation-->
<!--          v-model="bottomNav"-->
<!--          :value="activeBtn"-->
<!--          color="teal"-->
<!--          horizontal-->
<!--          height="70"-->
<!--        >-->
<!--          <v-btn width="200px" @click="goTutorial">-->
<!--            <span style="font-size: 15px; font-weight: bold">实验教程</span>-->
<!--            <v-icon>mdi-book-open-page-variant</v-icon>-->
<!--          </v-btn>-->
<!--          <v-btn width="200px" @click="goDocs">-->
<!--            <span style="font-size: 15px; font-weight: bold">文件中心</span>-->
<!--            <v-icon>mdi-folder-multiple</v-icon>-->
<!--          </v-btn>-->
<!--          <v-btn width="200px" @click="goGrade">-->
<!--            <span style="font-size: 15px; font-weight: bold">作业详情</span>-->
<!--            <v-icon>mdi-chart-areaspline</v-icon>-->
<!--          </v-btn>-->
<!--        </v-bottom-navigation>-->
<!--        <router-view></router-view>-->
<!--      </v-card>-->
<!--    </v-dialog>-->

    <!-- 第二个dialog -->
    <v-dialog
      v-model="Checkdialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <!-- v-bind="attrs"
                    v-on="on" -->
      <!-- <template v-slot:activator="{ on, attrs }"> -->

      <v-card>
        <v-toolbar dark color="teal">
          <v-btn icon dark @click="clickmethod">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title
            >EXPERIMENT{{ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
            }}{{ labname }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-bottom-navigation
          v-model="bottomNav"
          :value="activeBtn"
          color="teal"
          horizontal
          height="70"
        >
          <v-btn width="150px" @click="goList()">
            <span style="font-size: 15px; font-weight: bold">报告列表</span>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-btn>
          <span
            v-if="this.$route.path === '/teacherAssignmentCheck'"
            style="height: 70px"
          >
            <span style="font-size: 20px; font-weight: bold; margin-top: 24px"
              >></span
            >
            <v-btn width="150px">
              <span style="font-size: 15px; font-weight: bold">实验批改</span>
              <v-icon>mdi-chart-areaspline</v-icon>
            </v-btn>
          </span>
                    <span
            v-if="this.$route.path === '/teacherAssignmentSummatorCheck'"
            style="height: 70px"
          >
            <span style="font-size: 20px; font-weight: bold; margin-top: 24px"
              >></span
            >
            <v-btn width="150px">
              <span style="font-size: 15px; font-weight: bold">实验批改</span>
              <v-icon>mdi-chart-areaspline</v-icon>
            </v-btn>
          </span>
        </v-bottom-navigation>
        <router-view></router-view>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Lab',
  inject: ['reload'],
  data () {
    return {
      counter: 0,
      labname: '',
      teacherId: JSON.parse(sessionStorage.getItem('detail')).id,
      experimentList: {},
      // thisSessionStorage:sessionStorage,
      show: false,
      dialog: false,
      Checkdialog: false,
      notifications: false,
      projectDialogVisible: false,
      projectInfo: {
        name: '',
        intro: '',
        deadline: this.date
      },
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      newFile: new FormData(),
      fileList: [],
      fileInfo: {},
      thisId: 0,
      canGrade: true,
      canRelease: false
    }
  },
  async mounted () {
    await axios
      .get('/get/all/labs', {
        params: {}
      })
      .then((response) => {
        console.log(response.data)
        this.experimentList = response.data
        console.log(this.experimentList.names)
      })
  },
  methods: {
    async clickmethod2 (id, name) {
      const url = '/check/grade/' + JSON.parse(sessionStorage.getItem('detail')).id
      await axios.get(url)
        .then(
          (res) => {
            this.canGrade = res.data
          }
        )
        .catch(
          (err) => {
            this.canGrade = false
            console.log(err)
          }
        )
      if (this.canGrade === true) {
        if (sessionStorage.getItem('labId_to_getlist') !== null) {
          sessionStorage.removeItem('labId_to_getlist')
          sessionStorage.removeItem('labname')
        }
        sessionStorage.setItem('labId_to_getlist', id)
        sessionStorage.setItem('labname', name)
        this.Checkdialog = true
        this.labname = sessionStorage.getItem('labname')
        this.$router.push('/teacherAssignmentList')
      }
    },

    clickmethod () {
      this.Checkdialog = false
      this.$router.push('/teacherLab')
    },
    goList () {
      this.$router.push('/teacherAssignmentList')
    },
    goCheck () {
      this.$router.push('/teacherAssignmentCheck')
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

    submitProject () {
      if (!this.projectInfo.name) {
        this.$message.error('请输入实验项目名称')
      } else if (!this.projectInfo.intro) {
        this.$message.error('请输入实验简介')
      } else {
        this.submit()
      }
    },
    // 提交实验项目信息
    async submit () {
      const url = '/release/lab'
      await axios
        .post(url, {
          deadline: this.date,
          intro: this.projectInfo.intro,
          name: this.projectInfo.name,
          releaseTeacher: this.teacherId
        })
        .then((response) => {
          this.$message.success('实验发布成功')
          this.projectDialogVisible = false
          this.thisId = response.data
          this.reload()
        })
        .catch((err) => {
          console.log(err)
        })
      if (this.newFile.get('file') !== null) {
        await this.upload()
      }
    },
    async upload () {
      const newData = this.newFile //  3. 拿到刚刚的数据，并将其传给后台
      await axios({
        url: 'http://114.55.35.220:8081/api/uploadFileLab',
        method: 'post',
        data: newData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.fileInfo = response.data
      })
        .catch((err) => {
          this.$message.error('指导书上传失败')
          console.log(err)
        })
      const url = '/post/material'
      await axios.post(url, {
        labId: this.thisId,
        location: this.fileInfo.path,
        name: this.fileInfo.fileName,
        uploader: this.teacherId

      })
        .then(
          (res) => {
            this.$message.success('指导书上传成功')
            this.projectDialogVisible = false
            this.reload()
          }
        ).catch(
          (err) => {
            this.$message.error('指导书上传失败')
            console.log(err)
          }
        )
    },
    async checkRelease () {
      const url = '/check/release/' + JSON.parse(sessionStorage.getItem('detail')).id
      await axios.get(url)
        .then(
          (res) => {
            this.projectDialogVisible = true
          }
        )
        .catch(
          (err) => {
            this.projectDialogVisible = false
            this.$message.error('您无权访问该页面')
            console.log(err)
          }
        )
    }
  }

}
</script>

<style scoped>
.img {
  margin-left: -75px;
  position: relative;
  width: 117%;
  height: 70%;
  box-shadow: 3px 10px 10px 0 #636363;
}
.font {
  color: rgb(2, 160, 160);
}
</style>

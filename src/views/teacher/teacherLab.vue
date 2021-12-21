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
        <h3>实验列表</h3>
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
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="px-3"
                    color="green"
                    dark
                    style="margin-left: 300px"
                    v-bind="attrs"
                    v-on="on"
                    >进入实验</v-btn
                  >
                </template>
                <v-card>
                  <v-toolbar dark color="teal">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title
                      >EXPERIMENT{{ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
                      }}{{ experiment.name }}</v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-bottom-navigation
                    v-model="bottomNav"
                    :value="activeBtn"
                    color="teal"
                    horizontal
                    height="70"
                  >
                    <v-btn width="200px" @click="goTutorial">
                      <span style="font-size: 15px; font-weight: bold"
                        >实验教程</span
                      >
                      <v-icon>mdi-book-open-page-variant</v-icon>
                    </v-btn>
                    <v-btn width="200px" @click="goDocs">
                      <span style="font-size: 15px; font-weight: bold"
                        >文件中心</span
                      >
                      <v-icon>mdi-folder-multiple</v-icon>
                    </v-btn>
                    <v-btn width="200px" @click="goGrade">
                      <span style="font-size: 15px; font-weight: bold"
                        >作业详情</span
                      >
                      <v-icon>mdi-chart-areaspline</v-icon>
                    </v-btn>
                  </v-bottom-navigation>
                  <router-view></router-view>
                </v-card>
              </v-dialog>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="8" sm="4">
        <v-dialog v-model="projectDialogVisible" persistent max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <h3>发布实验</h3>
            <v-card
              shadow="hover"
              v-bind="attrs"
              v-on="on"
              style="cursor: pointer"
            >
              <img src="@/assets/4.png" width="200px" />
            </v-card>
          </template>
          <v-card>
            <v-card-title>
              <h3>发布实验项目</h3>
            </v-card-title>
            <v-card-text>
              <v-container style="margin-top: 20px">
                <!--填写实验项目信息-->
                <!--实验信息表单-->
                <v-form
                  ref="ProjectInfo"
                  :model="projectInfo"
                >
                  <v-row>
      <v-col cols="3" >
        <v-subheader class="font-weight-bold" style="font-size:1.1rem">实验项目名称</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field
          label=" Please enter the project's name"
          prop="name"
          v-model="projectInfo.name"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-subheader class="font-weight-bold" style="font-size:1.1rem">实验项目简介</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-textarea
          v-model="projectInfo.intro"
          clearable
          clear-icon="mdi-close-circle"
          label="Please enter the project's introduction"
          outlined
          rows="2"
        ></v-textarea>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="3">
        <v-subheader class="font-weight-bold" style="font-size:1.1rem">项目截止时间</v-subheader>
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
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
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
        <v-subheader class="font-weight-bold" style="font-size:1.1rem">实验指导书</v-subheader>
      </v-col>
      <v-col cols="8">
                    <!-- <el-upload
                      ref="projectUploadFile"
                      action="#"
                      multiple
                      :limit="3"
                      :auto-upload="false"
                      :file-list="projectInfo.fileList"
                      :on-change="handleChange"
                      :on-exceed="handleExceed"
                      :http-request="uploadProjectFile"
                      drag
                    >
                      <v-btn slot="trigger" color="blue-grey" class="ma-2 white--text"> 选择文件
                        <v-icon right dark>mdi-cloud-upload</v-icon>
                      </v-btn>
                      <div slot="tip" class="el-upload__tip">
                        文件大小限制：10 MB
                      </div>
                    </el-upload> -->
      </v-col>
    </v-row>



                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div slot="footer" class="dialog-footer">
                <v-btn color="blue darken-1" text @click="dialog = false"
                  >Close</v-btn
                >
                <v-btn color="blue darken-1" text @click="dialog = false"
                  >Save</v-btn
                >
                <v-btn
                  color="blue darken-1" text
                  @click="submitProject"
                  >Release</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Lab',
  data () {
    return {
      teacherId: JSON.parse(sessionStorage.getItem('detail')).id,
      experimentList: {},
      show: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      bottomNav: 3,
      activeBtn: 1,
      projectDialogVisible: false,
      projectInfo: {
        name: '',
        intro: '',
        deadline: this.date
        // fileList: []
      },
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false
    }
  },
  mounted () {
    axios
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
      await axios.post(url, { deadline: this.date, intro: this.projectInfo.intro, name: this.projectInfo.name, releaseTeacher: this.teacherId })
        .then(
          (response) => {
            this.$message.success('发布成功！')
            // 重置表单
            this.projectDialogVisible = false
            console.log(response)
          }
        ).catch(
          (err) => {
            this.$message.error('帐号或密码错误！')
            console.log(err)
          }
        )
    },

    goTutorial () {
      this.$router.push('/stuExpTutorial')
    },
    goDocs () {
      this.$router.push('/stuExpDocs')
    },
    goGrade () {
      this.$router.push('/assignment')
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
</style>

<template >
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
          v-for="(experiment,index) in experimentList.labs"
          style="margin-top: 20px"
        >
          <v-expansion-panel>
            <v-expansion-panel-header style="font-weight:bold;font-size:20px">{{experiment.name}}</v-expansion-panel-header>
            <v-expansion-panel-content style="margin-top:10px">
              <span style="font-weight:bold">发布教师：</span>
              {{experimentList.names[index]}}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <span style="font-weight:bold">截止日期：</span>
              {{experiment.deadline}}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <span style="font-weight:bold">实验介绍：</span>
              {{experiment.intro}}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="px-3" color="green" dark style="margin-left: 300px" v-bind="attrs" v-on="on" @click="storeSomething(experiment.id,experiment.deadline,experiment.name)">进入实验</v-btn>
                </template>
      <v-card>
        <v-toolbar dark color="teal">
          <v-btn icon dark @click="clickQuit">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>EXPERIMENT{{ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' }}{{thisSessionStorage.getItem('labName')}}</v-toolbar-title>
          <v-spacer></v-spacer>
<!--          <v-toolbar-items>-->
<!--            <v-btn dark text @click="dialog = false">{{this.Msg}}</v-btn>-->
<!--          </v-toolbar-items>-->
        </v-toolbar>
        <v-bottom-navigation
    v-model="bottomNav"
    :value="activeBtn"
    color="teal"
    horizontal
    height="70"
  >
    <v-btn width="200px" @click="goReport()">
      <span style="font-size:15px;font-weight:bold">报告填写</span>
      <v-icon>mdi-lead-pencil</v-icon>
    </v-btn>
    <v-btn width="200px" @click="goDocs">
      <span style="font-size:15px;font-weight:bold">文件中心</span>
      <v-icon>mdi-folder-multiple</v-icon>
    </v-btn>
    <v-btn width="200px" @click="goGrade">
      <span style="font-size:15px;font-weight:bold">作业详情</span>
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
        <h3>课程信息</h3>
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://globbsecurity.com/wp-content/uploads/2019/05/wan.jpg"
            height="200px"
            class="white--text align-end"
          >
            <v-card-title style="font-size: 25px; font-weight: bold">
              计算机组成原理实验
            </v-card-title>
            <v-card-subtitle> 国家级精品课程 </v-card-subtitle>
          </v-img>

          <v-card-text class="text--primary">
            <div>主讲老师：张晶</div>
            <div>开课学期：2021-2022 秋季学期</div>
            <div>学时：34{{ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' }}学分：2</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="purple" text @click="show = !show">
              查看详情 Explore more
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                同济大学软件学院计算机组成原理课程配套实验
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <btt></btt>
  </v-container>
</template>

<script>
import btt from '@/components/backToTop.vue'
import axios from 'axios'
export default {
  name: 'Lab',
  components: {
    btt
  },
  data () {
    return {
      experimentList: {},
      show: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      bottomNav: 3,
      activeBtn: 1,
      thisSessionStorage: sessionStorage
    }
  },
  mounted () {
    axios.get('/get/all/labs',
      {
        params: {
        }
      })
      .then((response) => {
        console.log(response.data)
        this.experimentList = response.data
        console.log(this.experimentList.names)
      })
  },
  methods: {
    storeSomething (id, ddl, name) {
      if (sessionStorage.getItem('labId') !== null) {
        sessionStorage.removeItem('labId')
      }
      sessionStorage.setItem('labId', id)
      if (sessionStorage.getItem('ddl') !== null) {
        sessionStorage.removeItem('ddl')
      }
      sessionStorage.setItem('ddl', ddl)
      if (sessionStorage.getItem('labName') !== null) {
        sessionStorage.removeItem('labName')
      }
      sessionStorage.setItem('labName', name)
      console.log('STORED')
    },
    goReport () {
      if (sessionStorage.getItem('labId') === '1') {
        this.$router.push('/stuExpReportSummator')
      } else {
        this.$router.push('/stuExpReportGeneral')
      }
    },
    goDocs () {
      this.$router.push('/stuExpDocs')
    },
    goGrade () {
      this.$router.push('/stuExpGrade')
    },
    clickQuit () {
      this.dialog = false
      this.$router.push('/stuLab')
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

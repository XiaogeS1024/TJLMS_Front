<template>
  <!-- eslint-disable -->
  <v-container class="container--fluid">
    <v-row style="margin-top: -20px">
<v-col cols="12" sm="4">
<img src="@/assets/feedbackTeacher.png" style="opacity: 0.75;">
</v-col>

      <v-col cols="12" sm="8">
        <h2 class="font">反馈列表</h2>
        <v-divider></v-divider>
        <v-expansion-panels
          focusable
          v-for="(feedback, index) in feedbackList.content"
          style="margin-top: 20px"
        >
          <v-expansion-panel>
            <v-expansion-panel-header
              style="font-weight: bold; font-size: 20px;background-color:#70d886;color:white"
              >
              <div style="width: 20px;">
                <v-chip
      :color="feedback.isReplied === false ? '#FDD835' : 'blue'"
      text-color="white"
    >{{feedback.isReplied === false ? '待回复' : '已回复'}}
      <v-icon right>mdi-star</v-icon> </v-chip>
      </div>
      <div>
         {{ feedback.fbTitle }}     
</div>
              </v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <span style="font-weight: bold">反馈时间：</span>
              {{ feedback.fbTime }}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <span style="font-weight: bold">反馈人：</span>
              {{ feedback.feedbacker }}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <span style="font-weight: bold">反馈内容：</span>
              {{ feedback.fbContent }}
            </v-expansion-panel-content>
            <v-divider></v-divider>
            <v-expansion-panel-content>
              <span style="font-weight: bold">回复时间：</span>
              {{ feedback.rpTime }}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <span style="font-weight: bold">回复人：</span>
              {{ feedback.replier }}
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <span style="font-weight: bold">回复内容：</span>
              {{ feedback.rpContent }}
            </v-expansion-panel-content>

            <v-expansion-panel-content>
              <v-dialog
                v-model="dialog"
                hide-overlay
                transition="dialog-bottom-transition"
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="px-3"
                    color="#64B5F6"
                    dark
                    style="margin-left: 300px"
                    v-bind="attrs"
                    v-on="on"
                    >回复反馈</v-btn
                  >
                </template>
                <v-card>
        <v-card-title>
          <span class="h2">回复反馈</span>
        </v-card-title>
        <v-card-text>
          <v-container style="margin-top: 20px">
                <!--表单-->
                <v-form ref="feedbackInfo" :model="feedbackInfo">
                  <v-row>
                    <v-col cols="3" >
                      <v-subheader class="font-weight-bold" style="font-size:1rem">回复标题</v-subheader>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        label=" Please enter the feedback's title"
                        prop="name"
                        v-model="feedbackInfo.title"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="3" >
                      <v-subheader class="font-weight-bold" style="font-size:1rem">回复内容</v-subheader>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        v-model="feedbackInfo.content"
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Please enter the feedback's content"
                        outlined
                        :rows="4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  </v-form>
                </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" text @click="submitProject(feedback.id)">提交</v-btn>
        </v-card-actions>
      </v-card>
              </v-dialog>
            </v-expansion-panel-content>    
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Lab',
  inject: ['reload'],
  data () {
    return {
      teacherId: JSON.parse(sessionStorage.getItem('detail')).id,
      teacherName: JSON.parse(sessionStorage.getItem('detail')).name,
      feedbackList: {},
      show: false,
      dialog: false,
      notifications: false,
      projectDialogVisible: false,
      feedbackInfo: {
        title: '',
        content: ''
      }
    }
  },
  mounted () {
    axios
      .get('/get/all/feedback', {
        params: {}
      })
      .then((response) => {
        console.log(response.data)
        this.feedbackList = response.data
      })
  },
  methods: {
    submitProject (row) {
      if (!this.feedbackInfo.title) {
        this.$message.error('请输入反馈标题')
      } else if (!this.feedbackInfo.content) {
        this.$message.error('请输入反馈内容')
      } else {
        this.submit(row)
      }
    },

    async submit (row) {
      const url = '/post/reply'
      await axios.post(url, { content: this.feedbackInfo.content, id: row, replier: this.teacherId, title: this.feedbackInfo.title })
        .then((response) => {
          this.$message.success('回复成功！')
          this.projectDialogVisible = false
          this.reload()
        })
        .catch((err) => {
          console.log(err)
        })
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
  color: rgb(2, 160, 160) ;
}
</style>

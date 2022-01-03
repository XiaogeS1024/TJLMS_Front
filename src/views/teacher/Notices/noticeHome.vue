<template>
<!-- eslint-disable -->
  <div class="notice">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-hover v-slot="{ hover }">
          <v-card class="mx-4 rounded-xl pa-4 mt-12"  :elevation="hover ? 20 : 5" height="390px">
            <h3 style="margin-left:20px;margin-top:15px">公告管理</h3>
            <router-link to='/noticeManagement'>
            <img src="@/assets/noticeboard.png" class="img1">
            </router-link>
        </v-card>
        </v-hover>
        </v-col>
        <v-col cols="12" sm="6">
          <v-hover v-slot="{ hover }">
          <v-card class="mx-4 rounded-xl pa-4 mt-12"  :elevation="hover ? 20 : 5" height="390px">
            <h3 style="margin-left:20px;margin-top:15px">反馈中心</h3>
            <router-link to='/teacherFeedback'>
            <img src="@/assets/feedback.png" class="img2">
            </router-link>
        </v-card>
        </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  name: 'stuNotice',
  data () {
    return {
      titleList: [],
      queryId: 0,
      notice: {
        releaser: '',
        title: '',
        content: '',
        releaseTime: ''
      },
      errMsg: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.img1 {
    width: 500px;
    height:300px;
    left: 50%;
    top:50%;
}
.img2 {
    width: 400px;
    height:350px;
    left: 50%;
    top:50%;
}
</style>

<template>
  <v-main>
    <v-navigation-drawer
      dark
      app
      style="background-color: #00BFA5"
      :width="isCollapse ? '64' : '175'"
      drawer
    >
      <div class="text-center mt-5">
        <v-avatar :size="isCollapse ? '50' : '75'" class="badge">
          <img src="@/assets/tongji.jpg" alt="image">
        </v-avatar>
      </div>
      <v-list flat class="mt-5">
        <v-list-item-group
          color="black"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          active-class="border"
          class="ml-2 my-3"
          :ripple="false"
          router :to="item.route"
        >
          <b></b>
          <b></b>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="margin-left:20px">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>

      <div
        style="
          position: absolute;
          bottom: 20px;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
          text-align: center;
        "
      >
        <v-app-bar-nav-icon @click="toggleCollapse" light>
        <div v-if="this.isCollapse === true">
          <v-icon >{{ "mdi-keyboard-tab" }}</v-icon>
        </div>
        <div v-else>
          <v-icon style="font-size: 40px;color:white">{{ "mdi-keyboard-tab-reverse" }}</v-icon>
        </div>
      </v-app-bar-nav-icon>
      </div>
    </v-navigation-drawer>

    <v-app-bar app elevation="1">
      <v-spacer></v-spacer>
      <div class="text-xs-center pr-3 mt-2">
<!--        <v-badge left="">-->
<!--          <span slot="badge">6</span>-->
<!--          <v-icon large color="grey lighten-1">mdi-bell-outline</v-icon>-->
<!--        </v-badge>-->

        <v-btn text @click="toggleFullScreen">
          <v-icon>{{ toggleFullScreenIcon }}</v-icon>
        </v-btn>

        <v-menu
      v-model="value"
      offset-y
    origin="center center"
    :nudge-bottom="10"
    transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-avatar :size=50
          v-on="on" class="avatar">
          <img src="@/assets/2.jpg" alt="image">
        </v-avatar>
      </template>
      <v-list>
       <v-list-item
          :key="index"
        ripple="ripple"
        @click="drawer1 = true"
        >
          <v-icon>mdi-account</v-icon>
          <v-list-item-title style="margin-left:20px">{{ '个人资料' }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          :key="index"
        ripple="ripple"
        @click="logout"
        >
          <v-icon>mdi-exit-to-app</v-icon>
          <v-list-item-title style="margin-left:20px">{{ '退出系统' }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      </div>

      <template  v-slot:extension>
        <v-tabs v-model="curTab" @change="change">
          <v-tab v-for="(item, i) in tabs" :key="i" color="blue" show-arrows>
                {{ item.meta.title }}
            <v-btn v-if="curTab === i" small icon class="ml-1">
              <v-icon small>mdi-cached</v-icon>
            </v-btn>
            <v-btn v-if="tabs.length > 1" small icon @click.stop="onClose(i)">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content class="content">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer
      :inset="true"
      style="justify-content: center; text-align: center"
      app
    >
      <span>&copy; TJLMS 2021</span>
    </v-footer>
    <el-drawer title="个人资料" :visible.sync="drawer1" :direction="direction" size="25%">
      <div class="personalInfo">

        <el-descriptions title="" direction="vertical" :column="1" border>
          <el-descriptions-item label="学号：">{{information.stuId}}</el-descriptions-item>
          <el-descriptions-item label="姓名：">{{information.stuName}}</el-descriptions-item>
          <el-descriptions-item label="邮箱：" :span="2">{{information.email}}</el-descriptions-item>
          <el-descriptions-item label="专业：" :span="2">软件工程</el-descriptions-item>
          <el-descriptions-item label="年级：" :span="2">2019级</el-descriptions-item>
        </el-descriptions>
      </div>
      <v-btn rounded color="primary" dark class="text-center" style="top:100px;margin-left:140px" @click="changePwd">修改密码</v-btn>

    </el-drawer>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    information: {
      stuId: JSON.parse(sessionStorage.getItem('detail')).id,
      stuName: JSON.parse(sessionStorage.getItem('detail')).name,
      email: JSON.parse(sessionStorage.getItem('detail')).emailAddr
    },
    drawer: true,
    drawer1: false,
    direction: 'rtl',
    isCollapse: false,
    items: [
      { title: '控制面板', icon: 'mdi-view-dashboard', route: '/stuDashboard' },
      { title: '实验中心', icon: 'mdi-school', route: '/stuLab' },
      { title: '文件中心', icon: 'mdi-clipboard-check-multiple-outline', route: '/stuDocument' },
      { title: '我的签到', icon: 'mdi-map-marker-outline', route: '/stuSignIN' },
      { title: '我的成绩', icon: 'mdi-chart-multiple', route: '/stuGrade' },
      { title: '消息中心', icon: 'mdi-bell-ring', route: '/stuNotice' }
    ],
    right: null,
    tabs: [],
    curTab: 0,
    disabled: false,
    absolute: false,
    openOnHover: false,
    value: false,
    closeOnClick: true,
    closeOnContentClick: true,
    offsetX: false,
    offsetY: true,
    isFullScreen: false
  }),
  computed: {
    toggleFullScreenIcon () {
      return this.isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-arrow-expand-all'
    }
  },
  watch: {
    $route (val) {
      // console.log(val);
      let has = false
      this.tabs.forEach((item, index) => {
        if (item.name === val.name) {
          has = true
          this.curTab = index
        }
      })
      if (!has) {
        this.tabs.push(val)
        this.curTab = this.tabs.length - 1
      }
    }
  },
  created () {
    this.tabs.push(this.$route)
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    change (val) {
      const { fullPath, path, name } = this.tabs[val]
      this.$router.replace({ fullPath, path, name })
    },
    onClose (i) {
      if (this.curTab.length === 1) return
      this.tabs.splice(i, 1)
      const item = this.tabs[i] || this.tabs[i - 1]
      if (this.curTab !== i) return
      const { fullPath, path, name } = item
      this.$router.replace({ fullPath, path, name })
    },
    toggleFullScreen () {
      const doc = window.document
      const el = doc.documentElement
      const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
      const crfs = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        rfs.call(el)
        this.isFullScreen = true
      } else {
        crfs.call(doc)
        this.isFullScreen = false
      }
    },
    changePwd () {
      this.$router.push('/pwdRecover')
    },
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
      location.reload()
    }
  }
}
</script>

<style scoped>
.personalInfo{
  margin-left: 20px;
  margin-right: 20px;
  font-size:18px;
  color:#464545;
}
.border {
  background: #fff;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  text-decoration: none;
}

.border b:nth-child(1) {
  position: absolute;
  top: -20px;
  height: 20px;
  width: 151.5px;
  background: rgb(255, 255, 255);
  display: none;
}
.border b:nth-child(1)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom-right-radius: 20px;
  background: #00BFA5;
}

.border b:nth-child(2) {
  position: absolute;
  bottom: -20px;
  height: 20px;
  width: 151.5px;
  background: #fff;
  display: none;
}
.border b:nth-child(2)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top-right-radius: 20px;
  background: #00BFA5;
}
.border b:nth-child(1),
.border b:nth-child(2) {
  display: block;
}
.content{
    margin-top:-100px;
    margin-left:-100px;
}
.badge{
    border:2px rgb(0, 0, 0);
    box-shadow:3px 10px 10px 0 #636363;
}
.avatar {
    border:3px solid rgb(147, 210, 218);
    box-shadow:-3px 3px 3px 0 #636363;
}
</style>

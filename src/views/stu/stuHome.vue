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
        <v-btn fab color="white" x-large>
          <v-icon color="black">{{ "mdi-asymmetri" }}k</v-icon>
        </v-btn>
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
        <div v-if="this.isCollapse == true">
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
        <v-badge left="">
          <span slot="badge">6</span>
          <v-icon large color="grey lighten-1">mdi-bell-outline</v-icon>
        </v-badge>

        <v-badge color="red">
          <span slot="badge">!</span>
          <v-icon large color="grey">mdi-email-outline</v-icon>
        </v-badge>
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
  </v-main>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    isCollapse: false,
    items: [
      { title: '控制面板', icon: 'mdi-view-dashboard', route: '/stuDashboard' },
      { title: '实验中心', icon: 'mdi-school', route: '/stuLab' },
      { title: '文件中心', icon: 'mdi-clipboard-check-multiple-outline', route: '/stuDocument' },
      { title: '我的成绩', icon: 'mdi-chart-multiple', route: '/stuGrade' },
      { title: '消息中心', icon: 'mdi-bell-ring', route: '/stuNotice' },
      { title: '我的账户', icon: 'mdi-account', route: '/stuInfo' }
    ],
    right: null,
    tabs: [],
    curTab: 0
  }),
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
    }
  }
}
</script>

<style>
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
</style>

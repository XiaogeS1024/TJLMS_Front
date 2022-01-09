<template>
  <v-app id="inspire">
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-card class="mx-4 rounded-xl pa-4" color="grey lighten-3" :elevation=10>
            <v-row>
              <v-col cols="12" sm="8">
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h4 mb-1">
                      {{ helloMsg }}
                    </v-list-item-title>
                    <v-divider></v-divider>
                    <v-list-item-subtitle
                      >欢迎来到TJLMS实验教学平台<br />
                      让我们一起探索实验的奥秘！
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <router-link to='/stuLab'>
                  <v-btn
                    class="px-3"
                    color="green"
                    dark
                    style="margin-left: 300px"
                  >
                    进入实验中心
                  </v-btn>
                  </router-link>
                </v-card-actions>
              </v-col>
              <v-col cols="12" sm="4">
                <v-img src="@/assets/1.png" class="mt-n16"></v-img>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="rounded-xl pa-4 mt-10" color="grey lighten-4" :elevation=5>
          <v-toolbar flat color="rgba(0,0,0,0)" dense class="mt-n1">
            <v-toolbar-title style="margin-left:10px;font-weight:bold;font-size:25px">日程安排</v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="grey--text">不要忘记重要日期哦~<br /></span>
          </v-toolbar>
          <v-divider></v-divider>
          <v-row class="mt-4">
            <v-col cols="12" sm="12">
              <v-sheet tile height="54" color="grey lighten-3" class="d-flex">
                <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-select
                  v-model="type"
                  :items="types"
                  dense
                  outlined
                  hide-details
                  class="ma-2"
                  label="type"
                ></v-select>
                <v-select
                  v-model="mode"
                  :items="modes"
                  dense
                  outlined
                  hide-details
                  label="event-overlap-mode"
                  class="ma-2"
                ></v-select>
                <v-select
                  v-model="weekday"
                  :items="weekdays"
                  dense
                  outlined
                  hide-details
                  label="weekdays"
                  class="ma-2"
                ></v-select>
                <v-spacer></v-spacer>
                <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-sheet>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="value"
                  :weekdays="weekday"
                  :type="type"
                  :events="events"
                  :event-overlap-mode="mode"
                  :event-overlap-threshold="100"
                  :event-color="getEventColor"
                  @change="getEvents"
                ></v-calendar>
              </v-sheet>
            </v-col>
          </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card class="mx-4 rounded-xl pa-4" color="grey lighten-3" :elevation=10>
            <template>
              <v-card class="mx-auto" max-width="434" tile >
                <v-img >
                  <v-row
                   align="end"
                   class="mt-2"
                  >
                    <v-col
                     align-self="start"
                     class="pa-5"
                     cols="12"
                    >
                      <v-avatar class="profile" color="grey" size="100" :elevation=20 >
                        <v-img src="@/assets/2.jpg"></v-img>
                      </v-avatar>
                  </v-col>
                  <v-col class="py-0">
                  <v-list-item color="black">
                    <v-list-item-content>
                      <v-list-item-title class="title">{{name}}</v-list-item-title>
                      <v-list-item-subtitle>2019级 软件学院 软件工程</v-list-item-subtitle>
                    </v-list-item-content>
                   </v-list-item>
                  </v-col>
                 </v-row>
               </v-img>
             </v-card>
        </template>
      </v-card>
      <v-card class="mx-4 rounded-xl pa-4" color="grey lighten-3" :elevation=10 style="margin-top:50px">
        <v-card-title>最新发布</v-card-title>
        <v-divider></v-divider>
        <el-table :data="latestmaterial" style="width: 100%">
          <el-table-column prop="name" label="文件名称" width="180">
          </el-table-column>
          <el-table-column label="下载" width="auto">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-download"
                circle
                style="color: #fff"
                @click="download(scope.row.name)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</v-app>
</template>

<script>
// import { VueperSlides, VueperSlide } from 'vueperslides'
import axios from 'axios'
export default {
  name: 'Home',
  data: () => ({
    helloMsg: '',
    schedule: [],
    latestmaterial: [],
    name: '',
    type: 'month',
    types: ['month', 'week', 'day', '4day'],
    mode: 'stack',
    modes: ['stack', 'column'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] }
    ],
    value: '',
    events: [],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1'
    ],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party'
    ],
    select: { state: 'EN' },
    items: ['EN', 'ES', 'DZ'],
    text: 'weekly',
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    fill: false,
    autoLineWidth: false,
    slides: [{ src: require('@/assets/1.png') }]
  }),
  //   components: {
  //     VueperSlides,
  //     VueperSlide
  //   },
  methods: {
    async getNewRelease () {
      const url = '/get/latest/material'
      await axios
        .get(url)
        .then((res) => {
          this.latestmaterial = res.data
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getEvents () {
      const events = []

      // const min = new Date(`${start.date}T00:00:00`)
      // const max = new Date(`${end.date}T23:59:59`)
      // const days = (max.getTime() - min.getTime()) / 86400000
      // this.rnd(days, days + 20)
      console.log(this.schedule)
      for (let i = 0; i < this.schedule.length; i++) {
        const first = new Date()
        const second = new Date(Date.parse(this.schedule[i].deadline))

        events.push({
          name: this.schedule[i].labName,
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: false
        })
      }

      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    getHelloMsg () {
      const obj = JSON.parse(sessionStorage.getItem('detail'))
      this.helloMsg = '你好 ' + obj.id + obj.name
      this.name = obj.name
    },
    async getSchedule () {
      const url = '/get/schedule'
      await axios.get(url)
        .then(
          (res) => {
            this.schedule = res.data
          }
        )
    },
    download (name) {
      window.location.href =
        'http://114.55.35.220:8081/api/downloadFileLab/' + name
    }
  },
  async created () {
    await this.getHelloMsg()
    await this.getSchedule()
    await this.getNewRelease()
    await this.getEvents()
  }
}
</script>

<style scoped></style>

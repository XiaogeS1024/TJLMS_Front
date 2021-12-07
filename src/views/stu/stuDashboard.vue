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
                      你好，1953067 宋潇歌！
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
                  :event-overlap-threshold="30"
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
                      <v-list-item-title class="title">宋潇歌</v-list-item-title>
                      <v-list-item-subtitle>2019级 软件学院 软件工程</v-list-item-subtitle>
                    </v-list-item-content>
                   </v-list-item>
                  </v-col>
                 </v-row>
               </v-img>
             </v-card>
        </template>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</v-app>
</template>

<script>
// import { VueperSlides, VueperSlide } from 'vueperslides'
export default {
  name: 'Home',
  data: () => ({
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
    getEvents ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        })
      }

      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }
  }
}
</script>

<style scoped></style>

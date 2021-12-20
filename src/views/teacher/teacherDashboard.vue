<template>
  <v-app id="inspire">
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-row>
          <v-card class="mx-4 rounded-xl pa-4"  :elevation=10>
            <v-row>
              <v-col cols="12" sm="4">
                <v-img src="@/assets/teacher1.png" class="mt-n20"></v-img>
              </v-col>
              <v-col cols="12" sm="8">
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h4 mb-1">
                      老师您好！
                    </v-list-item-title>
                    <v-divider></v-divider>
                    <v-list-item-subtitle
                      >欢迎来到TJLMS实验教学平台<br />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <router-link to='/teacherLab'>
                  <v-btn
                    class="px-3"
                    color="green"
                    dark
                    style="margin-left: 300px"
                  >
                    进入实验管理
                  </v-btn>
                  </router-link>
                  <router-link to='/teacherClass'>
                  <v-btn
                    class="px-3"
                    color="green"
                    dark
                    style="margin-left: 300px"
                  >
                    我的班级
                  </v-btn>
                  </router-link>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
          </v-row>
          <v-row>
            <v-col cols="12" sm="8">
              <h3>课程信息</h3>
        <v-card class="mx-auto" max-width="600">
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
            <div>主讲老师：黄杰</div>
            <div>开课学期：2021-2022 秋季学期</div>
            <div>学时：34{{ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" }}学分：2</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="purple" text @click="show = !show">
              查看详情 Explore more
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                这里是对课程的详细描述，可以添加其他老师的信息blabla
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
            </v-col>
          </v-row>
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
                        <v-img src="@/assets/teacher.png"></v-img>
                      </v-avatar>
                  </v-col>
                  <v-col class="py-0">
                  <v-list-item color="black">
                    <v-list-item-content>
                      <v-list-item-title class="title">黄杰</v-list-item-title>
                      <v-list-item-subtitle>软件学院</v-list-item-subtitle>
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
export default {
  name: 'Home',
  data: () => ({
    show: false
  }),
  methods: {
  }
}
</script>

<style scoped>

</style>

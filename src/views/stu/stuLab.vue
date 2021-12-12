<template>
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
          :data="this.experiments"
          style="margin-top: 20px"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>实验1</v-expansion-panel-header>
            <v-expansion-panel-content>
              实验信息（发布时间、ddl...）
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <v-card-actions>
                <router-link to="/exp1">
                  <v-btn
                    class="px-3"
                    color="green"
                    dark
                    style="margin-left: 300px"
                  >
                    进入实验
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>实验2</v-expansion-panel-header>
            <v-expansion-panel-content>
              实验信息（发布时间、ddl...）
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <v-card-actions>
                <router-link to="/exp2">
                  <v-btn
                    class="px-3"
                    color="green"
                    dark
                    style="margin-left: 300px"
                  >
                    进入实验
                  </v-btn>
                </router-link>
              </v-card-actions>
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
  </v-container>
</template>

<script>
export default {
<<<<<<< HEAD
  name: 'Lab',
  data () {
    return {
      experiments: [],
      show: false
    }
  }
=======
  name: 'stuNotice'
>>>>>>> cf82a32861978709557e4c7281d60d1029c181c2
}
</script>

<style scoped>
<<<<<<< HEAD
.img {
  margin-left: -75px;
  position: relative;
  width: 117%;
  height: 70%;
  box-shadow: 3px 10px 10px 0 #636363;
}
=======

>>>>>>> cf82a32861978709557e4c7281d60d1029c181c2
</style>

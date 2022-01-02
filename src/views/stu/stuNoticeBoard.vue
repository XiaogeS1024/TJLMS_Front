<template>
<!-- eslint-disable -->
  <v-card>

    <v-list>
      <v-list-item-group multiple active-class="blue--text">
        <template v-for="(item,index) in this.items">
          <v-list-item>
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title" style="font-size: 25px;font-weight:bold"></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.time"
                  style="margin-top: 10px;font-size: 15px;font-weight:bold"
                ></v-list-item-subtitle>
                <v-divider></v-divider>
<!--                <v-list-item-subtitle v-text="item.subtitle" style="margin-top: 10px;"></v-list-item-subtitle>-->
<!--                <v-list-item-action>-->
<!--                <v-list-item-action-text-->
<!--                  v-text="item.action"-->
<!--                ></v-list-item-action-text>-->
<!--                <v-icon v-if="!active" color="grey lighten-1">-->
<!--                  mdi-star-->
<!--                </v-icon>-->

<!--                <v-icon v-else color="yellow"> mdi-star </v-icon>-->
<!--              </v-list-item-action>-->
                <v-dialog v-model="dialog">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green lighten-2" dark v-bind="attrs" v-on="on" @click="getConcreteNotice(item.id)" class="btn"> 点击查看详情 </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>{{concreteNotice.title}}</v-card-title>
                    <v-card-text>{{concreteNotice.content}}</v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text  @click="dialog = false">我已知晓</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item-content>


            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    // selected: [],
    pageNum: 1,
    pageSize: 20,
    items: [],
    hasNotice: true,
    dialog: false,
    concreteNotice: {}
  }),
  methods: {
    async getAllTitles () {
      const url = '/get/titles?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize
      await axios.get(url)
        .then(
          (response) => {
            this.items = response.data
            // console.log(this.items)
          }
        )
        .catch(
          (err) => {
            this.hasNotice = false
            console.log(err)
          }
        )
    },
    async getConcreteNotice (id) {
      const url = '/get/notice/id/' + id
      await axios.get(url)
        .then(
          (response) => {
            this.concreteNotice = response.data.notice
          }
        )
        .catch(
          (err) => {
            this.$message.error('公告不存在')
            console.log(err)
          }
        )
    }
  },
  created () {
    this.getAllTitles()
  }
}
</script>

<style scoped>
.btn{
  width: 20%;
}
</style>

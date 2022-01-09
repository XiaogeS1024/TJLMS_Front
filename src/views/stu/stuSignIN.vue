<template>
  <v-container class="container--fluid">
    <h3 style="margin-bottom: 10px; text-align: center">
      我的签到{{ "\xa0\xa0\xa0\xa0" }}STUDENT SIGNIN
    </h3>
    <el-divider></el-divider>
    <app-widget title="Complex Table" padding-hide>
      <div slot="widget-content">
        <v-card-text class="pa-0">
          <template>
            <el-table
              :data="checkInTable"
              v-loading="loading"
              element-loading-text="拼命加载中"
              style="width: 100%"
            >
              <el-table-column label="ID" type="index" width="150">
              </el-table-column>
              <el-table-column prop="startTime" label="开始时间" width="180">
              </el-table-column>
              <el-table-column prop="endTime" label="结束时间" width="180">
              </el-table-column>
              <el-table-column prop="hasChecked" label="状态" width="180">
                <template slot-scope="scope">
                  <el-tag
                    size="medium"
                    :type="scope.row.hasChecked === true ? 'success' : 'danger'"
                    disable-transitions
                    plain
                    >{{ scope.row.hasChecked ? "已签到" : "未签到" }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="SignIn(scope.row.id, scope.row.hasChecked)"
                  >
                    点击签到<i class="el-icon-location el-icon--right"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </v-card-text>
      </div>
    </app-widget>
  </v-container>
</template>

<style scoped>
.el-divider {
  margin: 10px 0px;
}
.el-button {
  color: #ffffff;
}
.el-input {
  margin-bottom: 10px;
}
.container--fluid {
  padding: 2%;
  width: 90%;
  margin-left: 5%;
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 20px #a0a0a0;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Documents',
  data: () => ({
    checkId: '',

    checkInTable: [],

    search: '',
    complex: {
      selected: [],
      items: []
    },

    pageNum: 1,
    pageSize: 20,
    errMsg: ''
  }),
  methods: {
    async SignIn (id, hasChecked) {
      if (hasChecked) {
        this.$message.warning('无需重复签到')
      } else {
        const url =
          '/check/in?checkId=' +
          id +
          '&stuId=' +
          JSON.parse(sessionStorage.getItem('detail')).id
        await axios
          .post(url)
          .then((response) => {
            this.$message.success('签到成功！')
            location.reload()
          })
          .catch((err) => {
            this.$message.error('签到失败，不在签到时间内')
            console.log(err)
          })
      }
    },

    async getAllSignInInto () {
      const url =
        '/stu/get/check?stuId=' +
        JSON.parse(sessionStorage.getItem('detail')).id
      await axios
        .get(url)
        .then((response) => {
          this.checkInTable = response.data
          console.log(response.data)
        })
        .catch((err) => {
          this.errMsg = '暂无签到信息'
          console.log(err)
        })
    }
  },
  created () {
    this.getAllSignInInto()
  }
}
</script>

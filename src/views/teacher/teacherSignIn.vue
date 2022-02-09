<template>
  <div>
    <el-card>
      <el-button
        type="primary"
        @click="dialogVisible = true"
        style="float: right; margin-top: 0px"
        >发布签到</el-button
      >
      <el-dialog title="发布签到" :visible.sync="dialogVisible" width="30%">
        <h3 style="margin-bottom: 20px">选择日期:</h3>
        <el-date-picker v-model="value0" type="date" placeholder="请选择日期">
        </el-date-picker>

        <h3 style="margin: 20px 0px">签到起始时间:</h3>
        <el-time-picker
          is-range
          v-model="value1"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>

        <div slot="footer" class="dialog-footer">
          <el-button style="color: #000" @click="dialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="releaseSignIn()">发 布</el-button>
        </div>
      </el-dialog>

      <h3 style="margin-bottom: 10px; margin-top: 10px">
        签到信息{{ "\xa0\xa0\xa0\xa0" }}SIGNIN INFO
      </h3>

      <el-divider></el-divider>
      <el-table
        :data="checkInfoTable"
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%"
      >
        <el-table-column label="ID" type="index" width="150"> </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="220">
        </el-table-column>
        <el-table-column prop="endTime" label="截止时间" width="220">
        </el-table-column>
        <el-table-column label="签到状态" width="auto">
          <template slot-scope="scope">
            已签{{ scope.row.checked }}/总人数{{ scope.row.all }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      checkInfoTable: [],
      classId: '',
      dialogVisible: false,
      value0: '',
      value1: '',
      gradeForm: {
        note: '',
        score: ''
      }
    }
  },
  methods: {
    async getcheckInfo () {
      const url = '/teacher/get/check?classId=' + this.classId
      await axios
        .get(url)
        .then((response) => {
          console.log(response.data)
          this.checkInfoTable = response.data
        })
        .catch((err) => {
          // this.errMsg = "暂无classid";
          console.log(err)
        })
    },

    async getclass () {
      const url =
        '/get/my/classes?teacherId=' +
        JSON.parse(sessionStorage.getItem('detail')).id
      await axios
        .get(url)
        .then((response) => {
          this.classId = response.data[0].id
          this.getcheckInfo()
        })
        .catch((err) => {
          // this.errMsg = "暂无classid";
          console.log(err)
        })
    },

    /// /////////////////////////////////
    /// /////////////起始///////////////
    /// /////////////开始////////////////
    /// /////////////////////////////////

    async releaseSignIn () {
      // var str0 = this.value0.toISOString().slice(0, 10);
      // 2022/1/11
      // 012345678
      var str5 = this.value0.toLocaleDateString().slice(0, 4)
      var str6 = this.value0.toLocaleDateString().slice(5, 6)
      var str7 = this.value0.toLocaleDateString().slice(7, 9)
      var str9 = str5 + '-0' + str6 + '-' + str7
      console.log(str9)
      console.log(str9)
      console.log(str9)
      console.log(str9)
      console.log(str9)
      console.log(str9)
      console.log(str9)
      console.log(str9)
      console.log(str9)
      var str1 = this.value1[0].toTimeString().slice(0, 8)
      var str2 = this.value1[1].toTimeString().slice(0, 8)
      // console.log(str0, str1, str2);

      var startTime = str9 + ' ' + str1
      var endTime = str9 + ' ' + str2

      const url = '/post/check'
      await axios
        .post(url, {
          classId: this.classId,
          end: endTime,
          start: startTime
        })

        .then((response) => {
          this.$message.success('考勤发布成功！')
          this.dialogVisible = false
          location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    }

    /// /////////////////////////////////
    /// /////////////////////////////////
    /// /////////////结束////////////////
    /// /////////////////////////////////
    /// /////////////////////////////////

  },
  mounted () {
    this.getclass()
  }
}
</script>

<style scoped>
.el-button {
  color: #fff;
}
.el-divider {
  margin: 10px 0px;
}
.el-card {
  padding: 1% 2% 2% 2%;
  width: 80%;
  margin-left: 10%;
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 30px #525151;
}
</style>

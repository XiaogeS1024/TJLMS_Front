<template>
  <el-content>
    <el-card>
      <h3 style="margin-bottom: 0px">
        报告列表（{{ labName }}）{{ "\xa0\xa0\xa0\xa0" }}REPORT LIST
      </h3>
      <v-divider style="margin-top: 10px"></v-divider>
      <el-table
        class="memberTable"
        stripe
        highlight-current-row
        :data="
          studentList.filter(
            (data) =>
              !search ||
              data.studentName.toLowerCase().includes(search.toLowerCase()) ||
              data.studentId.includes(search)
          )
        "
        height="470px"
        :row-style="{ height: '50px' }"
        :cell-style="{ padding: '0' }"
      >
        <el-table-column type="index" width="50px"> </el-table-column>

        <el-table-column prop="stuId" label="学号" width="100px">
        </el-table-column>
        <el-table-column prop="stuName" label="姓名" width="80px">
        </el-table-column>

        <el-table-column prop="classId" label="班级" width="100px">
        </el-table-column>

        <el-table-column prop="mutable" label="提交情况" width="100px">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="scope.row.mutable === false ? 'success' : 'danger'"
              disable-transitions
              plain
              >{{ scope.row.mutable === false ? "已提交" : "未提交" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="checked" label="批改情况" width="100px">
          <template slot-scope="scope">
            <div v-if="scope.row.checked === true">
              <div v-if="scope.row.visible === false">
                <el-tag size="medium" type="warning" disable-transitions plain>
                  已暂存
                </el-tag>
              </div>

              <div v-else>
                <el-tag size="medium" type="success" disable-transitions plain>
                  已批改
                </el-tag>
              </div>
            </div>

            <div v-else>
              <el-tag size="medium" type="danger" disable-transitions plain>
                未批改
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="labGrade" label="实验成绩" width="auto">
          <template slot-scope="scope">
            <div v-if="scope.row.checked === true">
              &nbsp;&nbsp;{{ getonegrade(scope.row.stuId) }}
            </div>
            <div v-else>&nbsp;&nbsp;</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              style="color: #fff"
              @click="
                goCheck(scope.row.stuId, scope.row.classId, scope.row.stuName)
              "
              >进入批改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-content>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      teacherId: JSON.parse(sessionStorage.getItem('detail')).id,
      counter: 0,
      labId: '',
      tab: null,
      score: null,
      labName: sessionStorage.getItem('labname'),

      studentList: [
        // {
        //   stuId: "1851881",
        //   labId: 33,
        //   classId: "42000001",
        //   stuName: "程凡",
        //   teacherId: "89066",
        //   labName: "触发器实验",
        //   mutable: null,
        //   checked: null,
        // },
        // {
        //   stuId: "1953067",
        //   labId: 33,
        //   classId: "42000001",
        //   stuName: "宋潇歌",
        //   teacherId: "89066",
        //   labName: "触发器实验",
        //   mutable: null,
        //   checked: null,
        // },
        // {
        //   stuId: "1953902",
        //   labId: 33,
        //   classId: "42000001",
        //   stuName: "高杨帆",
        //   teacherId: "89066",
        //   labName: "触发器实验",
        //   mutable: false,
        //   checked: false,
        // },
      ]
    }
  },
  methods: {
    async getgrade (stuId) {
      const url =
        'get/grade/individual?labId=' +
        sessionStorage.getItem('labId_to_getlist') +
        '&stuId=' +
        stuId
      await axios
        .get(url)
        .then((res) => {
          this.score = res.data.score
        })
        .catch((err) => {
          this.$message.error('获取失败')
          console.log(err)
        })
    },
    getonegrade (stuId) {
      this.getgrade(stuId)
      console.log(this.score)
      return this.score
    },

    async getReportList () {
      const url =
        'get/lab/report?labId=' +
        sessionStorage.getItem('labId_to_getlist') +
        '&teacherId=' +
        this.teacherId
      await axios
        .get(url)
        .then((res) => {
          this.studentList = res.data
        })
        .catch((err) => {
          //   this.$message.error("获取失败");
          console.log(err)
        })
    },

    async getSummatorList () {
      const url =
        'get/summator/list?pagenum=1&pagesize=20&teacherId=' + this.teacherId
      await axios
        .get(url)
        .then((res) => {
          this.studentList = res.data.content
        })
        .catch((err) => {
          //   this.$message.error("获取失败");
          console.log(err)
        })
    },

    goCheck (stuId, classId, stuName) {
      sessionStorage.setItem('stuId_to_checkExp', stuId)
      sessionStorage.setItem('classId', classId)
      sessionStorage.setItem('stuName', stuName)
      if (sessionStorage.getItem('labId_to_getlist') === '1') {
        this.$router.push('/teacherAssignmentSummatorCheck')
      } else {
        this.$router.push('/teacherAssignmentCheck')
      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('labId_to_getlist') === '1') {
      this.getSummatorList()
    } else {
      this.getReportList()
    }
  }
}
</script>

<style scoped>
.el-card {
  padding: 1%;
  width: 62%;
  margin-left: 19%;

  /* position: absolute;
   left: 50%;
   transform: translateX(-50%); */
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 20px #a0a0a0;
  border-radius: 20px;
}
</style>

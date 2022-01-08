<template>
<div class="messageForm">
  <div class="text-center">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card class="mx-4 rounded-xl pa-4 mt-5" :elevation=10>
            <h3 style="margin-left:20px;margin-top:15px">我的成绩{{ "\xa0\xa0\xa0\xa0" }}MY SCORE</h3>
            <v-divider></v-divider>
            <v-row>
            <v-col cols="12" sm="3">
            <v-progress-circular
                :rotate="-90"
                :size="120"
                :width="15"
                :value="attendance"
                color="amber"
            >
            {{ attendance}}/100
            </v-progress-circular><br />
            <span>考勤成绩</span>
            </v-col>
<!--            <v-col cols="12" sm="3">-->
<!--            <v-progress-circular-->
<!--                :rotate="-90"-->
<!--                :size="120"-->
<!--                :width="15"-->
<!--                :value="final"-->
<!--                color="cyan"-->
<!--            >-->
<!--            {{ final }}/100-->
<!--            </v-progress-circular><br />-->
<!--            <span>总成绩</span>-->
<!--            </v-col>-->
            <v-col cols="12" sm="6">
            <v-progress-circular
                :rotate="-90"
                :size="120"
                :width="15"
                :value="final"
                color="pink"
            >
            {{ final }}/100
            </v-progress-circular><br />
            <span>总成绩</span>
            </v-col>
            </v-row>
          </v-card>
        </v-col>
        </v-row>

        <v-row>
        <v-col cols="12" sm="12">
          <v-card class="mx-4 rounded-xl pa-4 mt-10" :elevation=10>
            <h3 style="font-size:20px">成绩详情{{ "\xa0\xa0\xa0\xa0" }}SCORE DETAILS</h3>
            <v-divider></v-divider>
            <el-table
        ref="filterTable"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column
          prop="queryGradeEntity.updateDate"
          label="批改日期"
          sortable
          width="250"
          column-key="date"
        >
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="status"-->
<!--          label="批阅状态"-->
<!--          width="250"-->
<!--          :filters="[-->
<!--            { text: '未批阅', value: '未批阅' },-->
<!--            { text: '已批阅', value: '已批阅' },-->
<!--          ]"-->
<!--          :filter-method="filterStatus"-->
<!--          filter-placement="bottom-end"-->
<!--        >-->
<!--          <template slot-scope="scope">-->
<!--            <el-tag-->
<!--              :type="scope.row.status === '未批阅' ? 'primary' : 'success'"-->
<!--              disable-transitions-->
<!--            >-->
<!--              {{ scope.row.status }}-->
<!--            </el-tag>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="queryGradeEntity.name" label="实验模块" width="250"></el-table-column>
<!--        <el-table-column label="操作">-->
<!--          <el-button size="mini" @click="dialogTableVisible = true"-->
<!--            >查看详情</el-button-->
<!--          >-->
<!--          <el-dialog title="作业详情" :visible.sync="dialogTableVisible">-->
<!--            <el-descriptions direction="vertical" :column="4" border>-->
<!--              <el-descriptions-item label="提交日期">AAA</el-descriptions-item>-->
<!--              <el-descriptions-item label="提交时间">AAA</el-descriptions-item>-->
<!--              <el-descriptions-item label="所属实验模块">AAA</el-descriptions-item>-->
<!--              <el-descriptions-item label="内容">-->
<!--                <el-link type="primary">查看文件</el-link>-->
<!--              </el-descriptions-item>-->
<!--              <el-descriptions-item label="评分">AAA</el-descriptions-item>-->
<!--              <el-descriptions-item label="批阅人">AAA</el-descriptions-item>-->
<!--              <el-descriptions-item label="评语">AAA</el-descriptions-item>-->
<!--            </el-descriptions>-->
<!--          </el-dialog>-->
<!--        </el-table-column>-->
        <el-table-column
          prop="queryGradeEntity.score"
          label="得分"
          width="250"
        ></el-table-column>
              <el-table-column
                prop="grade"
                label="成绩"
                width="250"
              ></el-table-column>
      </el-table>
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        style="margin-top: 20px;"
      >
      </el-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      stuId: JSON.parse(sessionStorage.getItem('detail')).id,
      tableData: [
        // {
        //   date: '2016-05-02',
        //   status: '未批阅',
        //   module: '',
        //   score: '89'
        // },
        // {
        //   date: '2016-05-02',
        //   status: '未批阅',
        //   module: '实验一',
        //   score: '89'
        // },
        // {
        //   date: '2016-05-02',
        //   status: '未批阅',
        //   module: '实验一',
        //   score: '89'
        // },
        // {
        //   date: '2016-05-02',
        //   status: '未批阅',
        //   module: '实验一',
        //   score: '89'
        // }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      form: {
        reason: '',
        region: 0,
        delivery: false
      },
      formLabelWidth: '120px',
      intervalAttend: {},
      intervalFinal: {},
      attendance: 0.0,
      final: 0.0,
      valueAttend: 0.0,
      valueFinal: 0.0
    }
  },
  async mounted () {
    await this.queryGrade()
    this.intervalAttend = setInterval(() => {
      if (this.valueAttend === this.attendance) {
        return (this.valueAttend = this.attendance)
      }
      this.valueAttend += 10.0
    }, 1)
    this.intervalFinal = setInterval(() => {
      if (this.valueFinal === this.final) {
        return (this.valueFinal = this.final)
      }
      this.valueFinal += 10.0
    }, 1)
  },
  methods: {
    filterHandler (value, row, column) {
      const property = column['.property']
      return row[property] === value
    },
    filterStatus (value, row) {
      return row.status === value
    },
    filterType (value, row) {
      return row.type === value
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    async queryGrade () {
      const url = '/get/grade/' + this.stuId
      await axios.get(url)
        .then(
          (res) => {
            this.tableData = res.data.eachGrades
            this.attendance = res.data.attendance
            this.final = res.data.finalScore
          }
        )
        .catch(
          (err) => {
            console.log(err)
          }
        )
    }
  }
}
</script>

<style scoped>
.messageForm {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form {
  float: left;
  width: 100%;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.block {
  float: left;
  width: 100%;
  margin-top: 20px;
}
</style>

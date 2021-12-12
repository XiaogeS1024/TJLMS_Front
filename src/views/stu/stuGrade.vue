<template>
<div class="messageForm">
    <div class="form" style="margin-top: 15px">
    <el-table
        ref="filterTable"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="提交日期"
          sortable
          width="150"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="批阅状态"
          width="100"
          :filters="[
            { text: '未批阅', value: '未批阅' },
            { text: '已批阅', value: '已批阅' },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '未批阅' ? 'primary' : 'success'"
              disable-transitions
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="module" label="实验模块" width="150"></el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" @click="dialogTableVisible = true"
            >查看详情</el-button
          >
          <el-dialog title="作业详情" :visible.sync="dialogTableVisible">
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item label="提交日期">AAA</el-descriptions-item>
              <el-descriptions-item label="提交时间">AAA</el-descriptions-item>
              <el-descriptions-item label="所属实验模块">AAA</el-descriptions-item>
              <el-descriptions-item label="内容">
                <el-link type="primary">查看文件</el-link>
              </el-descriptions-item>
              <el-descriptions-item label="评分">AAA</el-descriptions-item>
              <el-descriptions-item label="批阅人">AAA</el-descriptions-item>
              <el-descriptions-item label="评语">AAA</el-descriptions-item>
            </el-descriptions>
          </el-dialog>
        </el-table-column>
        <el-table-column
          prop="score"
          label="得分"
          width="100"
        ></el-table-column>
      </el-table>
      <div class="block">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          status: '未批阅',
          module: '实验一',
          score: '89'
        },
        {
          date: '2016-05-02',
          status: '未批阅',
          module: '实验一',
          score: '89'
        },
        {
          date: '2016-05-02',
          status: '未批阅',
          module: '实验一',
          score: '89'
        },
        {
          date: '2016-05-02',
          status: '未批阅',
          module: '实验一',
          score: '89'
        }
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
      formLabelWidth: '120px'
    }
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
  position: fixed;
  margin-top: 20px;
}
</style>

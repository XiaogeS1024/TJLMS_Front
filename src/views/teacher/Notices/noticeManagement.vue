<template>
  <div class="messageForm">
    <div class="form1" style="margin-top: 15px">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%;"
        :row-style="{height: '80px'}"
        highlight-current-row
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column
          prop="time"
          label="发布时间"
          sortable
          width="200"
          column-key="time"
        >
        </el-table-column>

<el-table-column
          prop="releaser"
          label="发布人"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="300"
        ></el-table-column>

        <el-table-column label="">
          <template slot-scope="scope">
            <v-btn small color="light-green" dark @click="loadNoticeInfo(scope.row)"
              >查看详情</v-btn
            >
            <el-dialog title="公告内容" :visible.sync="dialogTableVisible" width="750px">
              <span>{{noticeInfo}}</span>
<span slot="footer" class="dialog-footer">
    <v-btn color="green" dark @click="dialogTableVisible = false" style="margin-right:20px">我已知晓</v-btn>
  </span>
            </el-dialog>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <v-btn color="error" fab small dark style="margin-left: 20px"
              @click="del(scope.row)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {

      tableData: [],
      dialogTableVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      noticeInfo: ''
    }
  },

  mounted () {
    axios
      .get('/get/titles', {
        params: {}
      })
      .then((response) => {
        console.log(response.data)
        this.tableData = response.data
      })
  },

  methods: {
    filterHandler (value, row, column) {
      const property = column.property
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

    loadNoticeInfo (row) {
      this.dialogTableVisible = true
      this.noticeInfo = undefined
      // eslint-disable-next-line no-array-constructor
      this.noticeInfo = new Array()
      axios
        .get('/get/notice/id/' + row.id, {
          params: {
            id: row.id
          }
        })
        .then((response) => {
          this.noticeInfo = response.data.notice.content
        })
        .catch((error) => {
          console.log(error)
        })
    },

    del (row) {
      this.$confirm('确定要删除此公告吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteTweet(row)
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '操作取消'
          })
        })
    },

    deleteTweet (data) {
      axios.post('/delete/notice/' + data.id, { noticeId: data.id })
        .then(() => {
          this.tableData.splice(data, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败! 请稍后再试'
          })
        })
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
.form1 {
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
  bottom: 75px;
}
</style>

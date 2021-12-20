<template>
  <el-container direction="vertical">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/adminHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminHome' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-input placeholder="请输入学号或姓名搜索" v-model="search" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button
        type="primary"
        class="adduser"
        @click="dialogFormVisible = true"
        >添加学生</el-button
      >
      <el-dialog title="添加学生" :visible.sync="dialogFormVisible" width="40%">
        <!-- 表单 -->
        <el-form :model="form">
          <el-form-item label="学号：" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertStudent()">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.name.toLowerCase().includes(search.toLowerCase()) ||
              data.id.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%"
      >
        <el-table-column prop="id" label="学号" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="emailAddr" label="邮箱" width="320">
          <template slot-scope="scope">
            <div v-if="scope.row.emailAddr === null">暂未设定</div>
            <div v-else>
              {{ scope.row.emailAddr }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="verified" label="激活状态" width="auto">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="scope.row.verified === true ? 'success' : 'danger'"
              disable-transitions
              plain
              >{{ scope.row.verified ? '已激活' : '未激活' }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column prop="edit" label="操作" width="240">
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="danger"
              @click="
                ;(deletedname = scope.row.name),
                  (deletedId = scope.row.id),
                  (deleteDialogVisible = true)
              "
              >删除学生</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="删除学生"
        :visible.sync="deleteDialogVisible"
        width="30%"
      >
        <div>确定删除{{ deletedname }}同学吗？</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteStudent(deletedId)"
            >确 定</el-button
          >
        </div>
      </el-dialog>

    </el-card>
  </el-container>
</template>

<style scoped>
.el-radio-group {
  margin-top: 15px;
  margin-bottom: 20px;
}
.el-radio {
  margin-right: 10px;
}
.el-switch {
  margin-bottom: 10px;
}
.el-tag {
  margin-right: 10px;
}
.adduser {
  margin-left: 20px;
}
.el-input {
  width: 50%;
}
.el-table {
  margin-top: 20px;
}
.el-breadcrumb {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-container {
  height: auto;
}
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: true,
      dialogFormVisible: false,
      deleteDialogVisible: false,
      deletedname: '',
      deletedId: '',

      form: {
        id: '',
        emailAddr: null,
        name: '',
        password: null,
        verified: false
      },
      formLabelWidth: '120px',
      tableData: [],
      search: ''
    }
  },
  methods: {
    async getAllStudents () {
      const url = '/get/all/students'
      await axios
        .get(url)
        .then((response) => {
          this.tableData = response.data
        })
        .catch((err) => {
          console.log(err)
        })
      this.loading = false
    },
    async insertStudent () {
      const url = '/admin/post/student'
      this.dialogFormVisible = false
      await axios.post(url, {
        emailAddr: this.form.emailAddr,
        id: this.form.id,
        name: this.form.name,
        password: this.form.password,
        verified: this.form.verified

      })
        .then(
          (response) => {
            this.$message.success('学生添加成功')
            location.reload()
            console.log(response)
          }
        )
        .catch(
          (err) => {
            this.$message.error('学生添加失败')
            console.log(err)
          }
        )
    },
    async deleteStudent (id) {
      const url = '/delete/student/' + id
      await axios.post(url)
        .then(
          (response) => {
            this.$message.success('删除成功')
            console.log(response)
            location.reload()
          }
        )
        .catch(
          (err) => {
            this.$message.error('删除失败')
            console.log(err)
          }
        )
    }
  },

  created () {
    this.getAllStudents()
  }
}
</script>

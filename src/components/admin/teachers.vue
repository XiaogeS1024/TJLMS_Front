<template>
  <el-container direction="vertical">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/teachers' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>教师列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-input placeholder="请输入工号或姓名搜索" v-model="search" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button
        type="primary"
        class="adduser"
        @click="dialogFormVisible = true"
        >添加教师</el-button
      >
      <el-dialog title="添加教师" :visible.sync="dialogFormVisible" width="50%">
        <!-- 表单 -->
        <el-form :model="form">
          <el-form-item label="工号：" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertTeacher()">确 定</el-button>
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
        <el-table-column prop="id" label="工号" width="120"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="emailAddr" label="邮箱" width="240">
          <template slot-scope="scope">
            <div v-if="scope.row.emailAddr === null">暂未设定</div>
            <div v-else>
              {{ scope.row.emailAddr }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="verified" label="激活状态" width="120">
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

        <el-table-column prop="verified" label="身份" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 0">
              <el-tag size="medium" type="primary" plain>{{
                '责任教师'
              }}</el-tag>
            </div>
            <div v-else-if="scope.row.type === 1">
              <el-tag size="medium" type="success" plain>{{ '教 师' }}</el-tag>
            </div>
            <div v-else-if="scope.row.type === 2">
              <el-tag size="medium" type="warning" plain>{{ '助 教' }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <!-- 权限 -->
        <el-table-column prop="verified" label="权限" width="240">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.grade === true"
              size="medium"
              type="success"
              plain
              >{{ '作业评分' }}</el-tag
            >
            <el-tag
              v-if="scope.row.releaseLab === true"
              size="medium"
              type="success"
              plain
              >{{ '发布实验' }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column prop="edit" label="操作" width="auto">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="
                ;(modifyform.id = scope.row.id),
                  (modifyname = scope.row.name),
                  (modifyform.type = scope.row.type),
                  (modifyform.grade = scope.row.grade),
                  (modifyform.releaseLab = scope.row.releaseLab),
                  (modifyDialogVisible = true)
              "
              >修改权限</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="
                ;(deletedname = scope.row.name),
                  (deletedId = scope.row.id),
                  (deleteDialogVisible = true)
              "
              >删除用户</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="删除教师"
        :visible.sync="deleteDialogVisible"
        width="30%"
      >
        <div>确定删除{{ deletedname }}教师吗？</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteTeacher(deletedId)"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <el-dialog
        title="修改权限"
        :visible.sync="modifyDialogVisible"
        width="30%"
      >
        <div>
          <div>{{ modifyname }}教师的身份：</div>
          <el-radio-group v-model="modifyform.type">
            <el-radio :label="0">责任教师</el-radio>
            <el-radio :label="1">教师</el-radio>
            <el-radio :label="2">助教</el-radio>
          </el-radio-group>
          <br />
          <el-switch
            inactive-text="作业打分："
            v-model="modifyform.grade"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <br />
          <el-switch
            inactive-text="发布实验："
            v-model="modifyform.releaseLab"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyTeacher()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </el-container>
</template>

<style scoped>
.el-button{
  color: #FFF;
}
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
      modifyDialogVisible: false,
      modifyname: '',
      deletedname: '',
      deletedId: '',
      modifyform: {
        id: '',
        type: 1,
        grade: false,
        releaseLab: false
      },
      form: {
        id: '',
        emailAddr: null,
        name: '',
        password: null,
        verified: false,
        type: 1,
        grade: false,
        releaseLab: false
      },
      formLabelWidth: '120px',
      tableData: [],
      search: ''
    }
  },
  methods: {
    async getAllTeachers () {
      const url = '/get/all/teachers'
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
    async insertTeacher () {
      const url = '/admin/post/teacher'
      this.dialogFormVisible = false
      await axios
        .post(url, {
          id: this.form.id,
          emailAddr: this.form.emailAddr,
          name: this.form.name,
          password: this.form.password,
          verified: this.form.verified,
          type: this.form.type,
          grade: this.form.grade,
          releaseLab: this.form.releaseLab
        })
        .then((response) => {
          this.$message.success('教师添加成功')
          location.reload()
          // this.getAllTeachers()
          console.log(response)
        })
        .catch((err) => {
          this.$message.error('教师添加失败')
          console.log(err)
        })
    },
    async modifyTeacher () {
      const url = '/post/modify'
      this.modifyDialogVisible = false
      console.log()
      await axios
        .post(url, {
          id: this.modifyform.id,
          type: this.modifyform.type,
          grade: this.modifyform.grade,
          releaseLab: this.modifyform.releaseLab
        })
        .then((response) => {
          this.$message.success('权限修改成功')
          location.reload()
          // this.getAllTeachers()
          console.log(response)
        })
        .catch((err) => {
          this.$message.error('权限修改失败')
          console.log(err)
        })
    },
    async deleteTeacher (deletedId) {
      const url = '/delete/teacher/'
      this.deleteDialogVisible = false
      console.log(deletedId)
      await axios
        .post(url + deletedId)
        .then((response) => {
          this.$message.success('教师删除成功')
          location.reload()
          console.log(response)
          // this.getAllTeachers()
        })
        .catch((err) => {
          this.$message.error('教师删除失败')
          console.log(err)
        })
    }
  },
  created () {
    this.getAllTeachers()
  }
}
</script>

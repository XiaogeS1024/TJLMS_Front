<template>
  <el-card>
    <div class="toright">
      <el-button type="success" @click="dialogFormVisible = true"
        >点击反馈！</el-button
      >
    </div>

    <el-dialog title="填写反馈" :visible.sync="dialogFormVisible" width="50%">
      <!-- 表单 -->
      <el-form
        :model="feedbackForm"
        ref="formData"
        style="margin: auto;"
        width="60%"
      >
        <el-form-item label="反馈标题" prop="title" required>
          <el-input
            v-model="feedbackForm.title"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 3 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="反馈内容" prop="content" required>
          <el-input
            v-model="feedbackForm.content"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="匿名反馈" prop="isAnonymous">
          <el-switch v-model="feedbackForm.isAnonymous"> </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="color: #000" @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="feedback()">提 交</el-button>
      </div>
    </el-dialog>

    <h3>反馈界面</h3>

    <el-table
      :data="myFeedback.feedbacks"
      v-loading="loading"
      element-loading-text="拼命加载中"
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="80"> </el-table-column>
      <el-table-column prop="fbTitle" label="标题" width="150">
      </el-table-column>
      <el-table-column prop="fbContent" label="内容" width="250">
        <template slot-scope="scope">
          <span>{{ ellipsis(scope.row.fbContent, 24) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fbTime" label="时间" width="150">
      </el-table-column>
      <el-table-column prop="isReplied" label="状态" width="auto">
        <template slot-scope="scope">
          <el-tag
            size="medium"
            :type="scope.row.isReplied === true ? 'success' : 'danger'"
            disable-transitions
            plain
            >{{ scope.row.isReplied ? "已回复" : "未回复" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="(replyVisible = true), (reply = scope.row)"
            size="small"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="反馈与回复详情" :visible.sync="replyVisible" width="50%">
      <el-descriptions
        class="margin-top"
        title="反馈信息："
        :size="size"
        border
      >
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            反馈标题
          </template>
          {{ reply.fbTitle }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            反馈者
          </template>
          {{ reply.feedbacker }}
          <span v-if="reply.anonymous===true">
              （已匿名）
            </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            反馈时间
          </template>
          {{ reply.fbTime }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        title=""
        direction="vertical"
        :column="4"
        border
        class="thebottom"
      >
        <el-descriptions-item label="反馈内容：">
          {{ reply.fbContent }}</el-descriptions-item
        >
      </el-descriptions>

<div v-if="reply.isReplied===true">
      <el-descriptions
        class="margin-top"
        title="回复信息："
        :size="size"
        border
      >

          <el-descriptions-item>
            <template slot="label">
            <i class="el-icon-tickets"></i>
              回复标题
            </template>
            {{ reply.rpTitle }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              回复者
            </template>
            {{ reply.replier }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
               <i class="el-icon-time"></i>
              回复时间
            </template>
            {{ reply.rpTime }}
          </el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        title=""
        direction="vertical"
        :column="4"
        border
        class="thebottom"
      >
        <el-descriptions-item label="回复内容：">{{
          reply.rpContent
        }}</el-descriptions-item>
      </el-descriptions>
</div>

<div v-if="reply.isReplied===false">

  <h3>
    回复信息：
  </h3>
      <h3>
    &nbsp;
  </h3>
    <h3>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂无回复！
  </h3>
</div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="replyVisible = false"
          >关 闭</el-button
        >
      </div>
    </el-dialog>
  </el-card>
</template>

<style scoped>
.thebottom {
  margin-bottom: 20px;
}
.toright {
  float: right;
}
.el-button {
  color: #fff;
}
.el-card {
  width: 80%;
  margin-left: 10%;
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 30px #525151;
}
h3{
    color: #000;
}
</style>

<script>
import axios from 'axios'
export default {
  name: 'feedback',
  data: () => ({
    reply: {},
    replyVisible: false,
    dialogFormVisible: false,
    feedbackForm: {
      title: '',
      content: '',
      isAnonymous: false
    },
    feedbackFormNull: {
      title: '',
      content: '',
      isAnonymous: false
    },
    pageNum: 1,
    pageSize: 20,
    myFeedback: {},
    errMsg: ''
  }),
  methods: {
    ellipsis (value, limit) {
      if (!value) return ''
      if (value.length > limit) {
        return value.slice(0, limit) + '...'
      }
      return value
    },
    feedback () {
      if (!this.feedbackForm.title) {
        this.$message.error('请输入反馈标题')
      } else if (!this.feedbackForm.content) {
        this.$message.error('请输入反馈内容')
      } else {
        this.dialogFormVisible = false
        this.handleFeedback()
      }
    },
    async handleFeedback () {
      const url = '/post/feedback'
      const obj = JSON.parse(sessionStorage.getItem('detail'))
      await axios
        .post(url, {
          content: this.feedbackForm.content,
          feedbacker: obj.id,
          isAnonymous: this.feedbackForm.isAnonymous,
          title: this.feedbackForm.title
        })
        .then((response) => {
          this.$message.success('反馈提交成功')
          this.feedbackForm = this.feedbackFormNull
          console.log(response)
          location.reload()
        })
        .catch((err) => {
          this.$message.error('反馈提交失败')
          console.log(err)
        })
    },
    async getMyFeedback () {
      const obj = JSON.parse(sessionStorage.getItem('detail'))
      // 这里改了
      const url =
        // "/get/my/reply?id=" +
        '/get/my/feedback?id=' +
        obj.id +
        '&pageNum=' +
        this.pageNum +
        '&pageSize=' +
        this.pageSize
      await axios
        .get(url)
        .then((response) => {
          this.myFeedback = response.data
        })
        .catch((err) => {
          this.errMsg = '暂无发出的反馈'
          console.log(err)
        })
    }
  },
  created () {
    this.getMyFeedback()
  }
}
</script>

<style scoped>
</style>

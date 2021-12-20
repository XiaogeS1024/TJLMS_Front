<template>
  <div class="feedback">
    <h1>This is the feedback page</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'teacherFeedback',
  data: () => ({
    replyForm: {
      title: '',
      content: ''
    },
    pageNum: 1,
    pageSize: 20,
    myReply: [],
    allFeedback: [],
    errMsg: ''
  }),
  methods: {
    reply (id) {
      if (!this.replyForm.title) {
        this.$message.error('请输入回复标题')
      } else if (!this.replyForm.content) {
        this.$message.error('请输入回复内容')
      } else {
        this.handleReply(id)
      }
    },
    async handleReply (feedbackId) {
      const url = '/post/reply'
      const email = sessionStorage.getItem('email')
      const obj = JSON.parse(sessionStorage.getItem(email))
      await axios.post(url, {
        content: this.replyForm.content,
        id: feedbackId,
        replier: obj.id,
        title: this.replyForm.title
      })
        .then(
          (response) => {
            this.$message.success('回复成功')
            console.log(response)
          }
        )
        .catch(
          (err) => {
            this.$message.error('回复失败')
            console.log(err)
          }
        )
    },
    async getMyReply () {
      const obj = JSON.parse(sessionStorage.getItem('detail'))
      const url = '/get/my/reply?id=' + obj.id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize
      await axios.get(url)
        .then(
          (response) => {
            this.myReply = response.data
          }
        )
        .catch(
          (err) => {
            this.errMsg = '暂无您已回复的反馈'
            console.log(err)
          }
        )
    },
    async getAllFeedback () {
      const url = '/get/all/feedback?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize
      await axios.get(url)
        .then(
          (response) => {
            this.allFeedback = response.data
          }
        )
        .catch(
          (err) => {
            this.errMsg = '暂无未回复的反馈'
            console.log(err)
          }
        )
    }
  }

}
</script>

<style scoped>

</style>

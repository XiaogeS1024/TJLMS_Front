<template>
  <div class="feedback">
    <h1>This is the feedback page</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'feedback',
  data: () => ({
    feedbackForm:
      {
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
    feedback () {
      if (!this.feedbackForm.title) {
        this.$message.error('请输入反馈标题')
      } else if (!this.feedbackForm.content) {
        this.$message.error('请输入反馈内容')
      } else {
        this.handleFeedback()
      }
    },

    async handleFeedback () {
      const url = '/post/feedback'
      const obj = JSON.parse(sessionStorage.getItem('detail'))
      await axios.post(url, {
        content: this.feedbackForm.content,
        feedbacker: obj.id,
        isAnonymous: this.feedbackForm.isAnonymous,
        title: this.feedbackForm.title

      })
        .then(
          (response) => {
            this.$message.success('反馈提交成功')
            console.log(response)
          }
        )
        .catch(
          (err) => {
            this.$message.error('反馈提交失败')
            console.log(err)
          }
        )
    },
    async getMyFeedback () {
      const obj = JSON.parse(sessionStorage.getItem('detail'))
      const url = '/get/my/reply?id=' + obj.id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize
      await axios.get(url)
        .then(
          (response) => {
            this.myFeedback = response.data
          }
        )
        .catch(
          (err) => {
            this.errMsg = '暂无发出的反馈'
            console.log(err)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>

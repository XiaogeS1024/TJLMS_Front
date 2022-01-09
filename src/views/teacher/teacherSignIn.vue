<template>
  <div>

      <h1>
          This is teacher SIGN IN page
      </h1>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    postForm: {
      classId: sessionStorage.getItem('classId'),
      start: '',
      end: ''
    },
    items: []
  }),
  methods: {
    async postSignIn () {
      const url = '/post/check'
      await axios.post(url, {
        classId: this.postForm.classId,
        end: this.postForm.end,
        start: this.postForm.start
      })
        .then(
          (res) => {
            this.$message.success(res.data)
            console.log(res)
          }
        )
        .catch(
          (err) => {
            this.$message.error('考勤发布失败')
            console.log(err)
          }
        )
    },
    async getSignIn () {
      const url = '/teacher/get/check?classId=' + this.postForm.classId
      await axios.get(url)
        .then(
          (res) => {
            this.items = res.data
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

<style>

</style>

<template>
  <div class="notice">
    <h1>This is a notice page</h1>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'stuNotice',
  data () {
    return {
      titleList: [],
      queryId: 0,
      notice: {
        releaser: '',
        title: '',
        content: '',
        releaseTime: ''
      },
      errMsg: ''
    }
  },
  methods: {
    async getTitles () {
      const url = '/get/titles'
      await axios.get(url)
        .then(
          (response) => {
            this.titleList = response.data
          }
        )
        .catch(
          (err) => {
            this.errMsg = '暂无公告'
            console.log(err)
          }
        )
    },
    async getContent () {
      const url = '/get/notice/id/' + this.queryId
      await axios.get(url)
        .then(
          (response) => {
            this.notice.content = response.data.content
          }
        )
    }
  }
}
</script>

<style scoped>

</style>

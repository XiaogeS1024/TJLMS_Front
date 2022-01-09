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
    classId: ''

  }),
  methods: {
    async postSignIn () {
      const url = '/post/check'
      await axios.post(url, {

      })
    }
  }
}
</script>

<style>

</style>

<template>
  <v-app>
    <router-view router-view v-if="isRouterAlive"/>
  </v-app>
</template>
<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  updated () {
    const dom = document.getElementById('loading')
    if (dom) {
      dom.remove()
    }
  },
  created () {
    // console.log(process.env);
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

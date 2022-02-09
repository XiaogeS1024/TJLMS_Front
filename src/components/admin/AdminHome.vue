<template>
<el-container>
      <el-header><header1></header1></el-header>

  <el-container>

  <el-aside width="auto">

   <aside1></aside1>
  </el-aside>
  <el-main>

    <router-view></router-view>
    </el-main>

    <!-- <el-main><main1></main1></el-main>
    <el-main><main2></main2></el-main> -->
  </el-container>
</el-container>
</template>

<style lang="scss" scoped>
.el-button{
  color: #FFF;
}
.el-container {
height: 100vh;
}
.el-aside {
display: block;
position: relative;
background-color: #545c64;
}
.el-header{
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left:0;
  align-items: center;
  color: #fff;
  font-size:20px;
}
.el-main{
  padding-top: 0;
  background-color: #E9EEF3;
  height: auto;
}
.el-menu-vertical-demo {
  width: auto;
  min-height: 400px;
}
h3{
   text-align: center;
   color:#fff;
}

</style>

<script>
import aside1 from './aside.vue'
import header1 from './header.vue'

export default {

  components: { aside1, header1 },
  data () {
    return {
      menuList: [],
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }

  },

  beforeRouteEnter (to, from, next) {
    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style', '')
    next()
  },
  created () {
    this.$router.push('/students')
  }
}
</script>

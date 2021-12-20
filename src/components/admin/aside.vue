<template>
  <el-menu
    default-active="activePath"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#409eff"
    unique-opened
    router
  >
    <!-- active-text-color="#ffd04b" -->
    <!-- <h3 >用户管理系统</h3> -->
    <span class="t">用户管理系统</span>
    <div class="toggle-button" @click="toggleCollapse">| | |</div>
    <!-- 这里是整理好的菜单 -->
    <!-- 注意这里的index，要修改！！！！！！！！！ -->
    <el-submenu >
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </template>

      <el-menu-item index="teachers" @click="saveNavState('/' + item.path)">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">教师列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="students" @click="saveNavState('/' + item.path)">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">学生列表</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-submenu >
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">批量导入</span>
      </template>

      <el-menu-item index="batchteachers" @click="saveNavState('/' + item.path)">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">教师批量导入</span>
        </template>
      </el-menu-item>
      <el-menu-item index="batchstudents" @click="saveNavState('/' + item.path)">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">学生批量导入</span>
        </template>
      </el-menu-item>
    </el-submenu>

  </el-menu>
</template>
<style lang="scss" scoped>
.toggle-button {
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.t {
  display: flex;

  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 30px;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-menu {
  border-right: none;
}
.el-container {
  height: 100vh;
}
.el-aside {
  display: block;
  position: relative;

  background-color: #545c64;
}
.el-header {
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-main {
  padding-top: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
h3 {
  text-align: center;
  color: #fff;
}
</style>

<script>
export default {
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data () {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }, // 菜单折叠展开
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      console.log(activePath)
    }
  },
  computed: {
    noChildren () {
      return this.menu.filter((item) => !item.childern)
    },
    hasChildren () {
      return this.menu.filter((item) => item.childern)
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
  }
}
</script>

<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="titlechangeflag=!titlechangeflag"></el-button>
      <h3 style="color: #fff" v-if="titlechangeflag===false">TJLMS ADMIN</h3>
      <h3 style="color: #fff" v-if="titlechangeflag===true">用户管理系统</h3>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img src="../../assets/logo.png" class="user"  alt="image"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="padding:10px 20px"
            ><h2 @click="logout()">退出系统</h2></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<style lang="scss" scoped>

header {
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    color:rgb(70, 181, 236);
    margin-right: 20px;
    margin-left: 20px;
  }
}

.r-content {
  position: absolute;
  right: 30px;
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>

<script>
export default {

  data () {
    return {
      titlechangeflag: false
    }
  },
  methods: {
    logout () {
      console.log(1)
      window.sessionStorage.clear()
      this.$router.push('/adminLogin')
    }

  }
}
</script>

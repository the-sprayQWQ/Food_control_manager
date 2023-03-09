<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="@/assets/logo.png" alt="" width="80" height="60" />
        <span>餐饮管理系统</span>
      </div>
      <div>
        <el-button type="primary" @click="unLogin">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="rgb(51,55,68)"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#409EFF"
          :unique-opened="true"
          :router="true"
        >
          <el-menu-item index="/user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/goods">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <i class="el-icon-menu"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/type">
            <i class="el-icon-menu"></i>
            <span slot="title">类型管理</span>
          </el-menu-item>
          <el-menu-item index="/status">
            <i class="el-icon-menu"></i>
            <span slot="title">状态管理</span>
          </el-menu-item>
          <el-menu-item index="/Admin">
            <i class="el-icon-menu"></i>
            <span slot="title">管理员中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <h1 v-if="home">欢迎使用本系统</h1>
        <h1 v-if="home">本系统使用Vue全家桶 + Element Ui + Node.js 实现</h1>
        <h1 v-if="home">免费开源,未经授权请勿商用,否则后果自负</h1>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      categoryList: [],
      home: true,
    };
  },
  mounted() {
    this.getPersonalInfo();
    this.judgePage();
  },
  beforeUpdate() {
    this.judgePage();
  },
  methods: {
    unLogin() {
      localStorage.removeItem("TOKEN");
      this.$router.push("/login");
    },
    async getPersonalInfo() {
      let res = await this.$API.getPersonInfo();
      if (res.status == 1) {
        this.unLogin();
      }
    },
    async getCate() {
      let res = await this.$API.getCategory();
      if (res.status == 0) {
        this.categoryList = res.data;
      }
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    judgePage() {
      if (this.$route.path == "/home") {
        return (this.home = true);
      }
      this.home = false;
    },
  },
};
</script>

<style scoped lang="css">
.el-header {
  background: rgb(55, 61, 65);
  text-align: center;
  line-height: 60px;
  display: flex;
  font-size: 22px;
  color: #fff;
  justify-content: space-between;
}
.el-header img {
  vertical-align: middle;
}

.el-aside {
  background: rgb(55, 55, 68);
  text-align: center;
  min-height: 100vh;
  line-height: 200px;
}

.el-main {
  background: rgb(234, 237, 241);
  text-align: center;
  min-height: 100vh;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

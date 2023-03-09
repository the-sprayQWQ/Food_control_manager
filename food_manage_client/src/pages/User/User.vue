<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><router-link to="/user">用户管理</router-link></el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 主体部分 -->
    <el-card class="box">
      <!-- 添加文章分类 -->
      <el-row>
        <el-col class="top_box">
          <el-input placeholder="请输入关键词进行查找" class="input-with-select" v-model="users">
            <el-button
              slot="append"
              icon="el-icon-search"
              class="btn1"
              @click="searchUserInfo"
            ></el-button>
          </el-input>
        </el-col>
        <el-col class="bottom_box">
          <el-button type="primary" class="btn" @click="dialogVisible = true"
            >添加用户</el-button
          >
          <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
            <el-form label-position="left" label-width="80px">
              <el-form-item label="用户名" class="lbl">
                <el-input v-model="username"></el-input>
              </el-form-item>
              <el-form-item label="密码" class="lbl">
                <el-input v-model="password"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" class="lbl">
                <el-input v-model="nickname"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" class="lbl">
                <el-input v-model="email"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>

      <!-- 表格主体部分 -->
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 85vw"
        height="80vh"
      >
        <el-table-column label="用户ID" prop="id" class="head">
        </el-table-column>
        <el-table-column label="用户名" prop="username" class="head">
        </el-table-column>
        <el-table-column label="用户昵称" prop="nickname" class="head">
        </el-table-column>
        <el-table-column label="用户邮箱" prop="email" class="head">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header"> </template>
          <template slot-scope="scope">
            <el-button
              size="medium"
              class="edit"
              @click="showDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-dialog title="编辑用户" :visible.sync="Visible1" width="30%">
              <el-form label-position="left" label-width="80px">
                <el-form-item label="用户昵称" class="lbl">
                  <el-input v-model="newnickname"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" class="lbl">
                  <el-input v-model="newemail"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="Visible1 = false">取 消</el-button>
                <el-button type="primary" @click="updateinfo()"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-button
              size="medium"
              type="danger"
              class="del"
              @click="delUser(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogVisible: false,
      Visible1: false,
      username: "",
      password: "",
      nickname: "",
      email: "",
      newnickname: "",
      newemail: "",
      id:'',
      users:""
    };
  },
  mounted() {
    this.getAlluserinfo();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    //获取用户信息
    async getAlluserinfo() {
      let res = await this.$API.getAllInfo();
      if (res.status == 0) {
        this.tableData = res.data;
      }
    },

    //添加用户
    async addUser() {
      let res = await this.$API.adduserinfo({
        username: this.username,
        password: this.password,
        nickname: this.nickname,
        email: this.email,
      });
      if (res.status == 0) {
        alert(res.message);
        this.dialogVisible = false;
        this.getAlluserinfo();
      }
    },
    //删除用户
    async delUser(id) {
      let res = await this.$API.deluserinfo(id);
      this.getAlluserinfo();
    },
    //编辑用户信息
    async updateinfo() {
      let res = await this.$API.updateuserinfo({
        id: this.id,
        nickname:this.newnickname,
        email:this.newemail
      });
      this.Visible1 = false
      this.getAlluserinfo();
    },

    //模糊搜索
    async searchUserInfo(){
      console.log(this.users);
      let username = this.users
      let nickname = this.users
      let email = this.users
      let res = await this.$API.searchUserInfo(username,nickname,email)
      if(res.status == 0){
        if(!username && !nickname && !email){
         return this.getAlluserinfo();
        }
        this.tableData = res.data
      }
    },

    //传id值 父传子
    showDialog(id){
      this.Visible1 = true
      this.id = id
    }
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.box {
  display: flex;
  margin-top: 20px;
  height: 100vh;
}
.top_box {
  display: flex;
  height: 40px;
}
.bottom_box {
  display: flex;
  height: 50px;
}
.btn {
  width: 100px;
  height: 30px;
  margin-top: 10px;
}
.input-with-select {
  width: 500px;
}
.btn1 {
  height: 40px;
}
.del,
.edit {
  width: 50px;
  height: 30px;
}
.head {
  height: 10px;
}
.form {
  p {
    display: inline-block;
    width: 70px;
    height: 40px;
  }
  .oldpassword {
    width: 145px;
    height: 30px;
    margin-left: 30px;
    outline: none;
    line-height: 30px;
  }
  .newpassword {
    width: 145px;
    height: 30px;
    margin-left: 30px;
    outline: none;
    line-height: 30px;
  }
}
.lbl {
  margin-top: 30px;
}
</style>

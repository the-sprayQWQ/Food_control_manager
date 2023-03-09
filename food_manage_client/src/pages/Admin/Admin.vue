<template>
  <div>
    <el-button class="edit" @click="showDialog()">修改密码</el-button>
    <el-dialog title="修改密码" :visible.sync="Visible1" width="30%">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="用户id" class="lbl">
          <el-input
            v-model="userID"
            placeholder="请输入要修改用户的ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="原密码" class="lbl">
          <el-input
            v-model="oldpassword"
            placeholder="请输入该用户的原始密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" class="lbl">
          <el-input
            v-model="newpassword"
            placeholder="请输入要修改的新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible1 = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Visible1: false,
      userID: "",
      oldpassword: "",
      newpassword: "",
    };
  },
  methods: {
    showDialog() {
      this.Visible1 = true;
    },
    async updatePassword() {
      let res = await this.$API.updateUserPassword({
        id: this.userID,
        oldpassword: this.oldpassword,
        password: this.newpassword,
      });
      if (res.status == 0) {
        alert("修改密码成功!");
        localStorage.removeItem("TOKEN");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
</style>
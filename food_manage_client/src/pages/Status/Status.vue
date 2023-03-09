<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><router-link to="/status">状态管理</router-link></el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 主体部分 -->
    <el-card class="box">
      <!-- 添加文章分类 -->
      <el-row>
        <el-col class="top_box">
          <el-input placeholder="请输入关键词进行查找" class="input-with-select" v-model="status">
            <el-button
              slot="append"
              icon="el-icon-search"
              class="btn1"
              @click="searchStatus"
            ></el-button>
          </el-input>
        </el-col>
        <el-col class="bottom_box">
          <el-button type="primary" class="btn" @click="dialogVisible = true"
            >添加状态</el-button
          >
          <el-dialog title="添加状态" :visible.sync="dialogVisible" width="30%">
            <el-form label-position="left" label-width="80px">
              <el-form-item label="状态名称" class="lbl">
                <el-input v-model="status_name"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addStatus">确 定</el-button>
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
        <el-table-column label="状态ID" prop="id" class="head">
        </el-table-column>
        <el-table-column label="状态名" prop="status_name" class="head">
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
            <el-dialog
              title="编辑状态"
              :visible.sync="Visible1"
              width="30%"
            >
              <el-form label-position="left" label-width="80px">
                <el-form-item label="状态名称" class="lbl">
                  <el-input v-model="newstatus"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="Visible1 = false">取 消</el-button>
                <el-button type="primary" @click="updateStatus()"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-button
              size="medium"
              type="danger"
              class="del"
              @click="delStatus(scope.row.id)"
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
      status_name:"",
      newstatus: "",
      id: "",
      status:""
    };
  },
  mounted() {
    this.getStatus();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    //获取状态信息
    async getStatus() {
      let res = await this.$API.getStatusInfo();
      if (res.status == 0) {
        this.tableData = res.data;
      }
    },

    //添加状态信息
    async addStatus() {
      let res = await this.$API.addStatusInfo({
        status_name: this.status_name,
      });
      if (res.status == 0) {
        alert(res.message);
        this.dialogVisible = false;
        this.getStatus();
      }
    },
    //删除状态信息
    async delStatus(id) {
      let res = await this.$API.delStatusInfo(id);
      this.getStatus();
    },
    //编辑状态信息
    async updateStatus() {
      let res = await this.$API.updateStatusInfo({
        id: this.id,
        status_name: this.newstatus,
      });
      if (res.status == 0) {
        this.Visible1 = false;
        this.getStatus();
      }
    },

    async searchStatus(){
      let status_name = this.status
      let res = await this.$API.searchStatusInfo(status_name)
      if(res.status == 0){
        if(!status_name){
          return this.getStatus()
        }
        this.tableData = res.data
      }
    },

    //传id值 父传子
    showDialog(id) {
      this.Visible1 = true;
      this.id = id;
    },

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
.img {
  height: 100px;
  width: 100px;
  border: none;
}
</style>

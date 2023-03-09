<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><router-link to="/goods">商品管理</router-link></el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 主体部分 -->
    <el-card class="box">
      <!-- 添加文章分类 -->
      <el-row>
        <el-col class="top_box">
          <el-input placeholder="请输入关键词进行查找" class="input-with-select" v-model="goods">
            <el-button
              slot="append"
              icon="el-icon-search"
              class="btn1"
              @click="searchgoods"
            ></el-button>
          </el-input>
        </el-col>
        <el-col class="bottom_box">
          <el-button type="primary" class="btn" @click="dialogVisible = true"
            >添加商品</el-button
          >
          <el-dialog title="添加商品" :visible.sync="dialogVisible" width="30%">
            <el-form label-position="left" label-width="80px">
              <el-form-item label="商品名" class="lbl">
                <el-input v-model="goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" class="lbl">
                <el-select placeholder="请选择" v-model="id" ref="mySelected">
                  <el-option
                    v-for="cates in categoryInfo"
                    :key="cates.id"
                    :label="cates.category_name"
                    :value="cates.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品价格" class="lbl">
                <el-input v-model="price"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addGoodsList">确 定</el-button>
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
        <el-table-column label="商品ID" prop="id" class="head">
        </el-table-column>
        <el-table-column label="商品名" prop="goods_name" class="head">
        </el-table-column>
        <el-table-column label="商品图片" prop="goods_pic" class="head">
          <template slot-scope="scope">
            <img :src="scope.row.goods_pic" alt="" class="img" />
          </template>
        </el-table-column>
        <el-table-column label="商品分类" prop="goods_category" class="head">
        </el-table-column>
        <el-table-column label="商品价格" prop="price" class="head">
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
              title="编辑商品信息"
              :visible.sync="Visible1"
              width="30%"
            >
              <el-form label-position="left" label-width="80px">
                <el-form-item label="商品名称" class="lbl">
                  <el-input v-model="newgoodsname"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" class="lbl">
                  <el-select
                    placeholder="请选择"
                    v-model="id"
                    ref="mySelected1"
                  >
                    <el-option
                      v-for="cates in categoryInfo"
                      :key="cates.id"
                      :label="cates.category_name"
                      :value="cates.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品价格" class="lbl">
                  <el-input v-model="newprice"></el-input>
                </el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleSelectImgClickEvent"
                  >选择图片</el-button
                >
                <el-button
                  type="primary"
                  icon="el-icon-upload"
                  @click="handleUploadClickEvent"
                  >更换商品图片</el-button
                >
                <el-button
                  type="primary"
                  icon="el-icon-delete-solid"
                  @click="handleClearImgClickEvent"
                  >清空图片</el-button
                >
                <input
                  type="file"
                  @change="handleImgChangeEvent"
                  ref="uploadInputRef"
                />

                <div class="show-img-box">
                  <img
                    :src="imgBase64Str"
                    ref="showImgRef"
                    v-if="imgBase64Str"
                  />
                  <h2 v-else>暂无图片</h2>
                </div>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="Visible1 = false">取 消</el-button>
                <el-button type="primary" @click="updategoodsinfo()"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-button
              size="medium"
              type="danger"
              class="del"
              @click="delGoods(scope.row.id)"
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
      categoryInfo: [],
      search: "",
      dialogVisible: false,
      Visible1: false,
      goods_name: "",
      goods_category: "",
      newgoodsname: "",
      newcategory: "",
      newprice: "",
      picture: "",
      id1: "",
      id: "",
      price:"",
      imgBase64Str: "",
      goods:""
    };
  },
  mounted() {
    this.getGoodsList();
    this.getCategory();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    //获取分类信息
    async getCategory() {
      let res = await this.$API.getCategoryInfo();
      if (res.status == 0) {
        this.categoryInfo = res.data;
      }
    },

    //获取商品信息
    async getGoodsList() {
      let res = await this.$API.getGoods();
      if (res.status == 0) {
        this.tableData = res.data;
      }
    },

    //添加商品
    async addGoodsList() {
      const label = this.$refs.mySelected.selected.label;
      let res = await this.$API.addGoods({
        goods_name: this.goods_name,
        goods_category: label,
        price: this.price,
      });
      if (res.status == 0) {
        alert(res.message);
        this.dialogVisible = false;
        this.getGoodsList();
      }
    },
    //删除商品
    async delGoods(id) {
      let res = await this.$API.delGoods(id);
      this.getGoodsList();
    },
    //编辑用户信息
    async updategoodsinfo() {
      const label = this.$refs.mySelected1.selected.label;
      let res = await this.$API.updateGoods({
        id: this.id1,
        goods_name: this.newgoodsname,
        goods_category: label,
        price: this.newprice,
      });
      if (res.status == 0) {
        this.Visible1 = false;
        this.getGoodsList();
      }
    },

    //更换商品图片
    async changeGoodImg() {
      let res = await this.$API.changeGoodsImg({ 
        id:this.id1,
        goods_pic:this.imgBase64Str
      });
      alert(res.message);
      if (res.status == 0) {
        this.Visible1 = false;
        this.getGoodsList();
      }
    },
    handleSelectImgClickEvent() {
      this.$refs.uploadInputRef.click();
    },
    handleImgChangeEvent() {
      let that = this;

      let file = this.$refs.uploadInputRef.files[0];
      if (file.size / 1024 / 1024 > 5) {
        return alert("选择的图片不要超过5M");
      }
      let r = new FileReader();
      r.onload = function () {
        that.imgBase64Str = r.result;
        console.log(r);
      };
      r.readAsDataURL(file);
    },
    handleClearImgClickEvent() {
      this.$refs.uploadInputRef.value = "";
      this.imgBase64Str = "";
    },
    handleUploadClickEvent() {
      if (!this.imgBase64Str) {
        Message.error("请选择图片!");
      }
      this.changeGoodImg();
    },
    async searchgoods(){
      let goods_name = this.goods
      let goods_category = this.goods
      let price = this.goods
      let res = await this.$API.searchGoodsInfo(goods_name,goods_category,price)
      if(res.status == 0){
        if(!goods_name && !goods_category && !price){
         return this.getGoodsList();
        }
        this.tableData = res.data
      }

    },
    //传id值 父传子
    showDialog(id) {
      this.Visible1 = true;
      this.id1 = id;
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
.row2 {
  margin-top: 20px;
}
.img {
  height: 100px;
  width: 100px;
  border: none;
}
.show-img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 178px;
  height: 178px;
  margin-top: 20px;
  border: 1px dashed #ccc;
  border-radius: 10px;
}
.show-img-box img {
  width: 100%;
  height: 100%;
}
</style>

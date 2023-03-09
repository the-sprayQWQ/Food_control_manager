<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><router-link to="/order">订单管理</router-link></el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 主体部分 -->
    <el-card class="box">
      <!-- 添加文章分类 -->
      <el-row>
        <el-col class="top_box">
          <el-input placeholder="请输入关键词进行查找" class="input-with-select" v-model="orders">
            <el-button
              slot="append"
              icon="el-icon-search"
              class="btn1"
              @click="searchOrders"
            ></el-button>
          </el-input>
        </el-col>
        <el-col class="bottom_box">
          <el-button type="primary" class="btn" @click="dialogVisible = true"
            >添加订单</el-button
          >
          <el-dialog title="添加订单" :visible.sync="dialogVisible" width="30%">
            <el-form label-position="left" label-width="80px">
              <el-form-item label="商品名称" class="lbl">
                <el-select
                  placeholder="请选择"
                  v-model="formData.name"
                  ref="mySelected"
                >
                  <el-option
                    v-for="goods in goodsName"
                    :key="goods.id"
                    :label="goods.label"
                    :value="goods.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单数量" class="lbl">
                <el-input
                  v-model="formData.count"
                  type="number"
                  :min="0"
                ></el-input>
              </el-form-item>
              <el-form-item label="订单价格" class="lbl">
                <el-input
                  v-model="formData.totalPrice"
                  type="number"
                  :min="0"
                ></el-input>
              </el-form-item>
              <el-form-item label="订单状态" class="lbl">
                <el-select placeholder="请选择" v-model="id" ref="mySelected3">
                  <el-option
                    v-for="status in statusInfo"
                    :key="status.id"
                    :label="status.status_name"
                    :value="status.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addOrder">确 定</el-button>
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
        <el-table-column label="订单ID" prop="id" class="head">
        </el-table-column>
        <el-table-column label="商品名称" prop="goods_name" class="head">
        </el-table-column>
        <el-table-column label="订单数量" prop="order_num" class="head">
        </el-table-column>
        <el-table-column label="订单价格" prop="order_price" class="head">
        </el-table-column>
        <el-table-column label="订单状态" prop="order_states" class="head">
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
            <el-dialog title="编辑订单" :visible.sync="Visible1" width="30%">
              <el-form label-position="left" label-width="80px">
                <el-form-item label="商品名称" class="lbl">
                  <el-select
                    placeholder="请选择"
                    v-model="formData1.name"
                    ref="mySelected"
                  >
                    <el-option
                      v-for="goods in goodsName"
                      :key="goods.id"
                      :label="goods.label"
                      :value="goods.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="订单数量" class="lbl">
                  <el-input
                    v-model="formData1.count"
                    type="number"
                    :min="0"
                  ></el-input>
                </el-form-item>
                <el-form-item label="订单价格" class="lbl">
                  <el-input
                    v-model="formData1.totalPrice"
                    type="number"
                    :min="0"
                  ></el-input>
                </el-form-item>
                <el-form-item label="订单状态" class="lbl">
                  <el-select
                    placeholder="请选择"
                    v-model="id"
                    ref="mySelected4"
                  >
                    <el-option
                      v-for="status in statusInfo"
                      :key="status.id"
                      :label="status.status_name"
                      :value="status.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="Visible1 = false">取 消</el-button>
                <el-button type="primary" @click="updateOrder()"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-button
              size="medium"
              type="danger"
              class="del"
              @click="delOrder(scope.row.id)"
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
      formData: {
        name: "",
        count: 0,
        totalPrice: 0,
        status: "",
      },
      tableData: [],
      search: "",
      dialogVisible: false,
      Visible1: false,
      statusInfo: [],
      goodsName: [],
      value: 0,
      orders:"",
      id: "",
      id1: "",
      allGoosData: [],
      formData1: {
        name: "",
        count: 0,
        totalPrice: 0,
        status: "",
      },
    };
  },
  mounted() {
    this.getOrderinfo();
    this.getGoodsList();
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
        this.statusInfo = res.data;
      }
    },

    //获取订单列表信息
    async getOrderinfo() {
      let res = await this.$API.getOrdersInfo();
      if (res.status == 0) {
        this.tableData = res.data;
      }
    },

    //获取商品信息
    async getGoodsList() {
      let res = await this.$API.getGoods();
      if (res.status == 0) {
        res.data.forEach((item) => {
          this.goodsName.push({
            value: item.id,
            label: item.goods_name,
          });
        });
        this.allGoosData = res.data;
      }
    },

    //添加订单
    async addOrder() {
      const label = this.$refs.mySelected.selected.label;
      const status = this.$refs.mySelected3.selected.label;
      let res = await this.$API.addOrdersInfo({
        goods_name: label,
        order_num: this.formData.count,
        order_price: this.formData.totalPrice,
        order_states: status,
      });
      if (res.status == 0) {
        alert(res.message);
        this.dialogVisible = false;
        this.getOrderinfo();
      }
    },
    //删除订单
    async delOrder(id) {
      let res = await this.$API.delOrdersInfo(id);
      this.getOrderinfo();
    },
    //编辑订单信息
    async updateOrder() {
      const label = this.$refs.mySelected.selected.label;
      const status = this.$refs.mySelected4.selected.label;
      let res = await this.$API.updateOrderInfo({
        id: this.id1,
        goods_name: label,
        order_num: this.formData1.count,
        order_price: this.formData1.totalPrice,
        order_states: status,
      });
      if (res.status == 0) {
        alert(res.message);
        this.Visible1 = false;
        this.getOrderinfo();
      }
    },

    async searchOrders(){
      let goods_name = this.orders
      let order_states = this.orders
      let res = await this.$API.searchOrdersInfo(goods_name,order_states)
      if(res.status == 0){
        if(!goods_name && !order_states){
          return this.getOrderinfo();
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
  watch: {
    formData: {
      handler(newValue) {
        // 找到对应的商品的价格
        let currentGood = this.allGoosData.filter((item) => {
          return item.id === newValue.name;
        });
        this.formData.totalPrice = currentGood[0].price * newValue.count;
      },
      deep: true,
    },
    formData1: {
      handler(newValue) {
        // 找到对应的商品的价格
        console.log(newValue);
        let currentGood = this.allGoosData.filter((item) => {
          return item.id === newValue.name;
        });
        this.formData1.totalPrice = currentGood[0].price * newValue.count;
      },
      deep: true,
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
</style>

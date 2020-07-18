<template>
  <div id="order">
    <Panel>
      <span slot="header">订单管理</span>
      <div slot="content" class="content">
        <!-- 表单部分 -->
        <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
          <el-form-item label="订单号">
            <el-input v-model="form.orderNo" placeholder="订单号" style="width:130px"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="form.consignee" placeholder="收货人" style="width:130px"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="手机号" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="form.orderState" placeholder="订单状态" style="width:130px">
              <el-option value="已受理"></el-option>
              <el-option value="已派送"></el-option>
              <el-option value="已完成"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-date-picker
              v-model="form.date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格部分 -->
        <el-table :data="orderData" border :style="{width:setWidth}">
          <el-table-column fixed prop="orderNo" label="订单号" width="120"></el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="150"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="100"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 30px;"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total,prev,pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </Panel>
  </div>
</template>

<script>
// 面板组件引入
import Panel from "@/components/Panel/Panel.vue";
// 引入业务模块
import { getOrderList, editOrder, OrderDetail } from "@/api/order";
//本地存储
import local from "@/utils/local";
// 引入moment时间处理函数
import moment from "moment";
export default {
  data() {
    return {
      form: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      },
      orderData: [],
      // 订单表格数据
      currentPage: 1, // 当前页
      pageSize: 4, // 每页条数
      total: 16 // 总条数
    };
  },
  components: {
    Panel
  },
  computed: {
    setWidth() {
      return document.body.clientWidth - 320 + "px";
    }
  },
  methods: {
    // 取出数据,同时可将查询参数传入，有就查询，没有就不管
    // 渲染到页面
    async fetchData() {
      let { total, data } = await getOrderList({
        // 数据渲染参数
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        // 表单查询参数
        orderNo: this.form.orderNo,
        consignee: this.form.consignee,
        phone: this.form.phone,
        orderState: this.form.orderState,
        date:
          this.form.date == null
            ? JSON.stringify([])
            : JSON.stringify(this.form.date)
      });
      // 数据发送完毕
      // 接收数据，对前端相对应的数据进行字段处理
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY年MM月DD日");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.total = total;
      this.orderData = data;
    },

    // 查询
    search() {
      // 提取数据中已经带有查询参数，查询功能将页面初始化为第一页，并且提取数据即可。
      this.currentPage = 1;
      this.fetchData();
    },

    // 重置
    reset() {
      // 表单值，清空
      // 默认页码改为1
      this.form = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      };
      this.search();
    },
    // 编辑
    edit(id) {
      this.$router.push({
        name: "OrderEdit",
        // /通过id来获取一个订单的详情
        query: {
          id
        }
      });
    },

    // 当前页码改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    }
  },

  // 虚拟dom创建，提取列表数据
  created() {
    this.fetchData();
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/css/common.less";
</style>

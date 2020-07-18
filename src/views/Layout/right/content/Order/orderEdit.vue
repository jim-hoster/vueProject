<template>
  <div id="orderEdit">
    <Panel>
      <span slot="header">订单管理</span>
      <div slot="content" class="content">
        <!-- 表格部分 -->
        <el-form label-width="80px" style="width:400px" size="small" :model="data">
          <el-form-item label="订单号">
            <el-input placeholder="请输入订单号" v-model="data.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker v-model="data.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="请输入手机号" v-model="data.phone">></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input placeholder="请输入收货人" v-model="data.consignee"></el-input>
          </el-form-item>
          <el-form-item label="配送地址">
            <el-input placeholder="请输入输送地址" v-model="data.deliverAddress"></el-input>
          </el-form-item>

          <el-form-item label="送达时间">
            <el-date-picker v-model="data.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="用户备注">
            <el-input placeholder="请输入用户备注" v-model="data.remarks"></el-input>
          </el-form-item>
          <el-form-item label="订单金额">
            <el-input placeholder="请输入订单金额" v-model="data.orderAmount"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select placeholder="请输入订单状态" v-model="data.orderState">
              <el-option value="已受理">已受理</el-option>
              <el-option value="已完成">已完成</el-option>
              <el-option value="已派送">已派送</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Panel>
  </div>
</template>

<script>
// 面板组件引入
import Panel from "@/components/Panel/Panel.vue";
// 引入业务模块
import { editOrder, OrderDetail } from "@/api/order";
//本地存储
import local from "@/utils/local";
// 引入moment时间处理函数
import moment from "moment";
export default {
  data() {
    return {
      data: {
        id: "",
        orderNo: "",
        orderTime: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: ""
      }
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
      let { data } = await OrderDetail({
        id: this.$route.query.id
      });
      this.data = data;
    },
    async submit() {
      let { code } = await editOrder(this.data);
      if (code === 0) {
        this.$router.push("/order");
      }
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
#orderEdit {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

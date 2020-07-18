<template>
  <div id="home">
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(val, i) in cardVal" :key="i">
          <Card :card="val"></Card>
        </el-col>
      </el-row>
    </div>
    <LineCharts :options="options"></LineCharts>
  </div>
</template>

<script>
import echarts from "echarts";
// 引入组件
// 卡片组件
import Card from "@/components/Card/Card.vue";
// echarts组件
import LineCharts from "@/components/Charts/LineCharts.vue";
// 订单业务模块组件
import { IndexData } from "@/api/order";
// 面板组件
export default {
  data() {
    return {
      cardVal: [
        {
          img: require("@/assets/images/deal.svg"),
          title: "总订单",
          num: ""
        },
        {
          img: require("@/assets/images/order.svg"),
          title: "总销售额",
          num: ""
        },
        {
          img: require("@/assets/images/sales.svg"),
          title: "今日订单",
          num: ""
        },
        {
          img: require("@/assets/images/total.svg"),
          title: "今日销售额",
          num: ""
        }
      ],
      options: {
        title: "订单统计", //副标题
        lengend: ["订单", "销售额"], //图例
        xAxisData: [], //x轴数据
        series: [] // 主轴数据
      }
    };
  },
  // 获取首页数据
  async mounted() {
    let {
      // 表格数据
      xData, //x轴数据
      orderData, //订单数据
      amountData, //金额数据
      // 卡片数据
      totalOrder, //总订单
      totalAmount, //总销售额
      todayOrder, //今日订单
      totayAmount //今日销售额
    } = await IndexData();

    // 卡片组件数据字段处理
    let arr = [totalOrder, totalAmount, todayOrder, totayAmount];
    arr.forEach((v, i) => {
      this.cardVal[i].num = v;
    });

    // echats部分字段处理
    // x轴线字段处理
    this.options.xAxisData = xData;
    this.options.series = [
      {
        name: "订单",
        type: "line",
        data: orderData
      },
      {
        name: "销售额",
        type: "line",
        data: amountData
      }
    ];
  },

  // 组件注册位置
  components: {
    Card,
    LineCharts
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/css/common.less";
#home {
  background-color: @hcolor;
  .header {
  }
  .footer {
    width: 100%;
    height: 400px;
    background-color: white;
    box-sizing: border-box;
    padding: 40px;
  }
}
</style>

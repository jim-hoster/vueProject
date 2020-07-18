<template>
  <div id="productSale">
    <el-form :model="formData">
      <el-form-item>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <BarChart :options="options"></BarChart>
  </div>
</template>

<script>
import echarts from "echarts";
// 引入组件
import Card from "@/components/Card/Card.vue";
// 引入echarts组件
import BarChart from "@/components/Charts/BarCharts.vue";
// 引入业务模块组件
import { orderStats } from "@/api/order";
export default {
  data() {
    return {
      options: {
        Xdata: "",
        series: []
      },
      formData: {
        date: ""
      }
    };
  },

  // 组件注册位置
  components: {
    Card,
    BarChart
  },
  async mounted() {
    let { data } = await orderStats({
      date: JSON.stringify(this.formData.date)
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/css/common.less";
</style>

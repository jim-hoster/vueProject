<template>
  <div ref="BarChart" class="BarChart"></div>
</template>

<script>
// 引入echart
import echarts from "echarts";
export default {
  props: {
    BarData: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  // 前奏
  //三步骤
  // 给一个宽高合适的盒子

  methods: {
    BarChart(BarData) {
      // 初始化  echarts   目的是给一个合适的盒子去装生成的图表
      let myChart = echarts.init(this.$refs.BarChart);

      //   设置配置文件
      let option = {
        xAxis: {
          type: "category",
          data: BarData.Xdata //x轴数据标题   数组
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: BarData.series, //核心数据  数组
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      };

      //   调用数据，生成报表
      myChart.setOption(option);
    }
  },
  //   挂载后，渲染数据
  mounted() {
    this.BarChart(this.BarData);
  },
  //   监听事件，数据变化，随时渲染
  watch: {
    BarData: {
      handler(newVal, oldVal) {
        this.BarChart(newVal);
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.BarChart {
  height: 500px;
  background-color: white;
}
</style>
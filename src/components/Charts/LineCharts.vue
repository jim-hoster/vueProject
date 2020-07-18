<template>
  <div ref="lineChart" class="lineCharts"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  //写echas配置
  // 调用数据，生成报表
  //   子组件调用的数据选项

  // 组件完成echrs的全部功能，父组件负责完成数据
  props: {
    options: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  methods: {
    //   设置调用函数
    drawLineChart(options) {
      // 初始化echarts,将echart放到这个盒子中，并且保存为变量myChart
      let myChart = echarts.init(this.$refs.lineChart);
  
      //   设置option  配置
      let option = {
        //   主标题
        title: {
          text: options.title
        },
        // 工具提示
        tooltip: {
          trigger: "axis",
          show: true,
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        // 图例  传入的数据显示标题部分
        legend: {
          top: "auto",
          data: options.lengend //外部传入的数据部分
        },
        // 右上角工具函数   可切换图表，生成图片等！
        toolbox: {
          feature: {
            magicType: {
              type: ["line", "bar", "stack", "tiled"]
            },
            saveAsImage: {}
          }
        },
        // 网格显示部分
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          width: "auto",
          containLabel: true
        },
        // x轴线
        xAxis: [
          {
            type: "category",
            boundaryGap: ["50%", "20%"],

            data: options.xAxisData //外部传入的数据
          }
        ],
        // y轴
        yAxis: [
          {
            type: "value"
          }
        ],
        //  核心数据
        series: options.series
      };

      // 调用数据，生成报表    （固定写法）
      myChart.setOption(option);
    }
  },
  // 节点挂载，调用函数
  mounted() {
    this.drawLineChart(this.options);
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.drawLineChart(newVal);
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.lineCharts {
  padding: 20px;
  margin-top: 10px;
  background-color: white;
  height: 200px;
  width: 500px;
}
</style>
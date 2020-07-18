<template>
  <div id="home">
    <div class="main"></div>
    <div class="footer" id="myChart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
// 引入组件
import Card from "../../../../../components/Card/Card.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["订单", "销售额", "注册人数", "管理人数"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "1%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "2020/6/30",
              "2020/6/30",
              "2020/7/1",
              "2020/7/2",
              "2020/7/4",
              "2020/7/5"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "订单",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "注册人数",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "管理人数",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      });
    }
  },
  // 组件注册位置
  components: {
    Card
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/css/common.less";
#home {
  background-color: @hcolor;
  .header {
    width: 100%;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .userinfo {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 20px;
      }
    }
  }
  .main {
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

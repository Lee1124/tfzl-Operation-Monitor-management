//柱状图分析
<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "2rem"
    }
  },
  components: {},
  data() {
    return {
      echartData: {
        legend: ["订单量(个)", "环比(%)"],
        xData: ["2020/01", "2020/02", "2020/03"],
        yData1: [100, 10, 20],
        yData2: [1.0, 3.0, 80]
      },
      chart: null,
      commonStyle: {
        //刻度线每个刻度的样式
        axisTick: {
          lineStyle: {
            color: "#999"
          }
        },
        //刻度轴线的样式
        axisLine: {
          lineStyle: {
            color: "#999"
          }
        },
        //刻度线对应的文字的样式
        axisLabel: {
          color: "#999"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.initChart();
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      let self = this;
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: self.echartData.legend
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },

        xAxis: [
          {
            data: self.echartData.xData,
            ...this.commonStyle
          }
        ],
        yAxis: [
          {
            type: "value",
            name: self.echartData.legend ? self.echartData.legend[0] : "",
            axisLabel: {
              formatter: "{value}"
            },
            ...this.commonStyle
          },
          {
            type: "value",
            name: self.echartData.legend ? self.echartData.legend[1] : "",
            axisLabel: {
              formatter: "{value} %"
            },
            ...this.commonStyle
          }
        ],

        series: [
          {
            name: self.echartData.legend ? self.echartData.legend[0] : "",
            type: "bar",
            data: self.echartData.yData1,
            barMaxWidth: "32px",
            itemStyle: {
              borderColor: "#22E17E",
              color: "#A1F4C9"
            }
          },
          {
            name: self.echartData.legend ? self.echartData.legend[1] : "",
            type: "line",
            symbolSize: 10, //设定实心点的大小
            yAxisIndex: 1,
            data: self.echartData.yData2,
            itemStyle: {
              color: "#22E17E"
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
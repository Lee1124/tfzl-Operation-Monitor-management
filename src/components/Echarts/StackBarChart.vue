//堆叠状树状图
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
        legend: ["订单量(个)"],
        xData: [],
        yData: []
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
      },
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
            type: "category",
            data: self.echartData.xData,
            ...this.commonStyle
          }
        ],
        yAxis: [
          {
            type: "value",
            name: self.echartData.yTitle ? self.echartData.yTitle[0] : "",
            axisLabel: {
              formatter: "{value}"
            },
            ...this.commonStyle
          }
        ],

        series: [
          ...self.echartData.yData,
          {
            name: "总计",
            type: "line",
            lineStyle: {
              opacity: 0
            },
            label: {
              show: true,
              textStyle: {
                color: "#000"
              }
            },
            data: self.echartData.total
          }
        ]
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
//在线问诊曲线分析
<template>
  <div class="order-echart-analysis">
    <div class="tab-scroll-container tab-scroll-container-nopagination scrollbarStyle2">
      <div class="search-view">
        <!-- 查询 -->
        <div class="search-filter">
          <select-one
            class="search-btn"
            labelText="期间类型"
            :options="periodTypes"
            @change="changePeriodType"
            ref="periodTypes"
          />
          <QuarterSelection labelText="起止时间" @change="changeDate" v-if="dateType==='quarter'" />
          <date-picker
            class="search-btn"
            labelText="起止时间"
            v-else
            :type="dateType"
            ref="timeSelect"
          />

          <select-one class="search-btn" :alignNum="4" labelText="院区" :options="options" />
          <select-one class="search-btn" :alignNum="4" labelText="科室" :options="options" />
          <my-input class="search-btn" labelText="医务人员" />
          <select-one class="search-btn" labelText="费用项目" :options="options" />
        </div>
        <!-- 查询按钮 -->
        <div class="search-handle-view no-print">
          <el-button size="medium" type="success">查询</el-button>
          <el-button size="medium">重置</el-button>
        </div>
      </div>
      <div class="handle-btn-view">
        <el-button size="medium" @click.stop="doPrint">打印</el-button>
        <el-button size="medium">导出</el-button>
      </div>
      <!-- echart柱状图 -->
      <div class="order_echart _marginTopFu" id="visitPayEchartPrint">
        <!-- 标题 -->
        <div class="_title">2019/01至2019/12次均就诊费用趋势分析</div>
        <!-- 内容 -->
        <div class="echart-content" ref="echartContent">
          <page-bar-chart class="Echart visitPay-echart" ref="Echart"/>
          <img class="echartImg" ref="echartImg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pageBarChart from "@/components/Echarts/BarChart.vue";
import initData from "@/mixins/req.js";
import { timeFrame,openPrint } from "@/utils/index";
import QuarterSelection from "@/components/QuarterSelection";
export default {
  mixins: [initData],
  components: {
    pageBarChart,
    QuarterSelection
  },
  data() {
    return {
      options: [
        { label: "哈哈哈1", value: 0 },
        { label: "哈哈哈2", value: 1 }
      ],
      // 选择日期类型
      dateType: "daterange"
    };
  },
  computed: {
    periodTypes() {
      return [
        { label: "日", value: 0 },
        { label: "月", value: 1 },
        { label: "季", value: 2 },
        { label: "年", value: 3 }
      ];
    }
  },
  mounted() {
    this.initSearch();
    this.$refs.Echart.echartData = {
      legend: ["订单量(个)", "环比(%)"],
      xData: [1, 2, 3, 4],
      yData1: [100, 22, 33, 44],
      yData2: [10, 2, 3, 4]
    };
    this.$refs.Echart.initChart();
  },
  methods: {
    //改变期间类型
    changePeriodType(val) {
      console.log(val);
      // this.$refs.periodTypes.value = val;
      switch (val) {
        case 0:
          this.dateType = "daterange";
          break;
        case 1:
          this.dateType = "monthrange";
          break;
        case 2:
          this.dateType = "quarter";
          break;
        case 3:
          this.dateType = "year";
          break;
      }
    },
    // 改变时间
    changeDate(val) {
      console.log(val);
    },
    //初始化查询数据
    initSearch() {
      this.$refs.periodTypes.value = 0;
      this.$refs.timeSelect.value = timeFrame(30);
    },
    doPrint() {
      // var div_print = document.querySelector("#printEchart"); // 获取要打印部分的内容
      var cv = document.querySelector(".Echart canvas"); //获取canvas
      var context = cv.getContext("2d");
      var img = new Image();
      var strDataURI = cv.toDataURL("image/png");
      img.src = strDataURI;
      // 图片加载完成之后
      img.onload = () => {
        this.$refs.echartImg.src = strDataURI;
        openPrint(this, "#visitPayEchartPrint", "次均就诊费用趋势分析打印");
      };
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/page.scss";
.echart-content {
  width: 100%;
}
.echartImg {
  display: none;
}
</style>
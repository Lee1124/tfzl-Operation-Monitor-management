//护理服务曲线分析
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
            :clearableContent="false"
            @change="changePeriodType"
            ref="periodTypes"
          />
          <!-- 季度选择 -->
          <QuarterSelection
            labelText="起止时间"
            ref="quarter"
            @change="changeQuarter"
            v-if="dateType==='quarter'"
          />
          <!-- 时间区间选择 -->
          <date-picker
            class="search-btn"
            labelText="起止时间"
            v-if="dateType!='quarter'&&dateType!='year'"
            :type="dateType"
            ref="timeSelect"
            @change="changeDate"
          />
          <!-- 年限选择 -->
          <year-picker
            labelText="起止年限"
            v-if="dateType==='year'"
            ref="year"
            :type="dateType"
            @change="changeYear"
          />
          <select-one
            class="search-btn"
            :alignNum="4"
            labelText="院区"
            v-if="isHavehospitals"
            :options="hospitals"
            ref="hospitals"
            @change="slectHospitals"
          />
          <select-one
            v-if="isHavehospitals"
            class="search-btn"
            :alignNum="4"
            labelText="科室"
            ref="departments"
            :options="departments1"
            @change="slectDepartments"
          />
          <select-one
            v-if="!isHavehospitals"
            class="search-btn"
            :alignNum="4"
            labelText="科室"
            ref="departments"
            :options="departments"
            @change="slectDepartments"
          />
          <select-one
            class="search-btn"
            ref="doctors"
            labelText="上门护士"
            :options="doctors"
            @change="slectDoctors"
          />
        </div>
        <!-- 查询按钮 -->
        <div class="search-handle-view no-print">
          <el-button size="medium" type="success" @click.stop="search">查询</el-button>
          <el-button size="medium" @click.stop="reloadSearch">重置</el-button>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="handle-btn-view">
        <el-button size="medium" @click.stop="doPrint">打印</el-button>
      </div>
      <!-- echart柱状图 -->
      <div class="order_echart _marginTopFu" id="nurseEchart1Print" v-loading="loading">
        <!-- 标题 -->
        <div
          class="_title"
        >{{searchQuery.startDate |dealTime}}至{{searchQuery.endDate|dealTime}}护理服务订单趋势分析</div>
        <!-- 内容 -->
        <div class="echart-content statistical-inquiry-echart" ref="echartContent">
          <page-bar-chart class="nurseEchart1" ref="nurseEchart1" />
          <img class="echartImg" ref="echartImg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//
import pageBarChart from "@/components/Echarts/BarChart.vue";
import initData from "@/mixins/req";
import {
  openPrint,
  timeFrame,
  clearRefValue,
  clearObjectVal,
  getY_M_D_H_M_S
} from "@/utils/index";
import { mapGetters } from "vuex";
import store from "@/store";
import QuarterSelection from "@/components/QuarterSelection";
export default {
  mixins: [initData],
  components: {
    pageBarChart,
    QuarterSelection
  },
  data() {
    return {
      departments1: [], //科室
      doctors: [], //医务人员
      searchQuery: {
        area: "", //院区
        dept: "", //科室
        doctor: "", //医务人员
        endDate: "", //结束时间
        startDate: "", //开始时间
        timeType: "" //期间类型
      },
      // 选择日期类型
      dateType: "daterange",
      slectsEnum: {
        area: 1, //1代表-院区
        dept: 2, //2代表-科室
        doctor: 3 //3代表-医生
      },
      echartData: [] //图表数据
    };
  },
  computed: {
    ...mapGetters("parameter/", ["periodTypes"]),
    ...mapGetters("parameter/", ["hospitals"]),
    ...mapGetters("parameter/", ["departments"]),
    ...mapGetters("parameter/", ["isHavehospitals"])
  },
  created() {
    this.$nextTick(() => {
      this.setDefaultSelects();
      this.$refs.timeSelect.initValue().then(res => {
        this.setTime(res);
      });
    });
  },

  methods: {
    initParams() {
      this.$nextTick(() => {
        this.$refs.timeSelect.initValue().then(res => {
          this.setTime(res);
          this.initData();
        });
      });
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "auth/operationStatistical/inquiryTrend";
      this.searchParams = {
        ...this.searchQuery
      };
      return true;
    },
    initData() {
      this.init().then(res => {
        this.$refs.nurseEchart1.echartData = {
          legend: ["订单量(个)", "环比(%)"],
          xData: this.getArrary(res.data.list, "time"),
          yData1: this.getArrary(res.data.list, "dataVol"),
          yData2: this.getArrary(res.data.list, "linkRatio")
        };
        this.$nextTick(() => {
          this.$refs.nurseEchart1.initChart();
        });
      });
    },
    /**
     * 根据数据字段筛选出来
     */
    getArrary(data, field) {
      let arr = [];
      data.forEach(item => {
        arr.push(item[field]);
      });
      return arr;
    },
    // 查询
    search() {
      this.initData();
    },
    //重置查询
    reloadSearch() {
      clearRefValue(this, ["hospitals", "departments", "doctors"]);
      this.searchQuery = clearObjectVal(this.searchQuery);
      this.setDefaultSelects();
      this.initParams();
    },
    //选择院区
    slectHospitals(item) {
      this.departments1 = item.data;
      if (item && item.label) {
        this.searchQuery.area = item.label;
      } else {
        this.clearSearchValue(["area", "dept", "doctor"]);
      }
      clearRefValue(this, ["departments", "doctors"]);
    },
    //选择科室
    slectDepartments(item) {
      this.doctors = item.data;
      if (item && item.label) {
        this.searchQuery.dept = item.label;
      } else {
        this.clearSearchValue(["dept", "doctor"]);
      }
      clearRefValue(this, ["doctors"]);
    },
    //选择医务人员
    slectDoctors(item) {
      if (item && item.value) {
        this.searchQuery.doctor = item.value;
      } else {
        this.clearSearchValue(["doctor"]);
      }
    },
    //清除值
    clearSearchValue(arr) {
      arr.forEach(key => {
        this.searchQuery[key] = "";
      });
    },
    //设置默认查询时间
    setDefaultSelects() {
      this.dateType = "daterange";
      this.$refs.periodTypes.value = store.getters["parameter/periodTypes"][0];
      this.searchQuery.timeType =
        store.getters["parameter/periodTypes"][0].label;
    },

    //改变期间类型
    changePeriodType(item) {
      this.searchQuery.timeType = item.label;
      switch (item.value) {
        case 0:
          this.dateType = "daterange";
          this.initValue("timeSelect");
          break;
        case 1:
          this.dateType = "monthrange";
          this.initValue("timeSelect");
          break;
        case 2:
          this.dateType = "quarter";
          this.initValue(this.dateType);
          break;
        case 3:
          this.dateType = "year";
          this.initValue(this.dateType);
          break;
      }
    },
    //初始化值
    initValue(key) {
      this.$nextTick(() => {
        this.$refs[key].initValue().then(val => {
          this.setTime(val);
        });
      });
    },
    //设置时间
    setTime(timeArr) {
      this.searchQuery.startDate = timeArr ? timeArr[0] + " 00:00:00" : "";
      this.searchQuery.endDate = timeArr ? timeArr[1] + " 00:00:00" : "";
    },
    // 改变时间
    changeDate(val) {
      this.setTime(val);
    },
    //季度
    changeQuarter(val) {
      this.setTime(val);
    },
    //改变年
    changeYear(val) {
      this.setTime(val);
    },
    doPrint() {
      var div_print = document.querySelector("#nurseEchart1"); // 获取要打印部分的内容
      var cv = document.querySelector(".nurseEchart1 canvas"); //获取canvas
      var context = cv.getContext("2d");
      var img = new Image();
      var strDataURI = cv.toDataURL("image/png");
      img.src = strDataURI;
      // 图片加载完成之后
      img.onload = () => {
        this.$refs.echartImg.src = strDataURI;
        openPrint(this, "#nurseEchart1Print", "护理服务订单趋势分析打印");
      };
    }
  },
  filters: {
    dealTime(val) {
      return val ? getY_M_D_H_M_S(val, "/", false) : "";
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
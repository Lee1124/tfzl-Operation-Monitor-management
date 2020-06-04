//护理服务曲线分析
<template>
  <div class="order-echart-analysis" style="height:100%;">
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
            v-if="isHavehospitals"
            class="search-btn"
            :alignNum="4"
            labelText="院区"
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
            labelText="医务人员"
            @change="slectDoctors"
            :options="doctors"
          />
          <select-one
            :clearableContent="false"
            :alignNum="4"
            class="search-btn"
            ref="role"
            labelText="角色"
            @change="slectRole"
            :options="roles"
          />
          <select-one
            :clearableContent="false"
            class="search-btn"
            ref="slectServiceItem"
            labelText="服务项目"
            @change="slectServiceItem"
            :options="serviceItems"
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
      <div class="order_echart _marginTopFu" id="workloadEchartPrint" v-loading="loading">
        <!-- 标题 -->
        <div
          class="_title"
        >{{searchQuery.startDate |dealTime}}至{{searchQuery.endDate|dealTime}}工作量趋势分析</div>
        <!-- 内容 -->
        <div class="echart-content statistical-inquiry-echart" ref="echartContent">
          <page-bar-chart class="workloadEchart" ref="workloadEchart" />
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
  getY_M_D_H_M_S,
  setRefValue,
  setSearchValue,
  setThisValue,
  getFilterArrary,
  deepClone,
  getArrary
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
      spareDoctors: [], //备用医务人员
      searchQuery: {
        area: "", //院区
        dept: "", //科室
        doctor: "", //医务人员
        project: "", //服务项目
        role: "", //角色
        startDate: "", //开始时间
        endDate: "", //结束时间
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
    ...mapGetters("parameter/", ["roles"]),
    ...mapGetters("parameter/", ["serviceItems"]),
    ...mapGetters("parameter/", ["isHavehospitals"])
  },
  activated() {
    this.$nextTick(() => {
      this.setDefaultParams(0);
    });
  },

  methods: {
    //初始化数据并处理
    initData() {
      this.init().then(res => {
        this.$nextTick(() => {
          this.$refs.workloadEchart.echartData = {
            legend: ["工作量(人次)", "环比(%)"],
            xData: getArrary(res.data.list, "time"),
            yData1: getArrary(res.data.list, "dataVol"),
            yData2: getArrary(res.data.list, "linkRatio")
          };
          this.$refs.workloadEchart.initChart();
        });
      });
    },
    //设置默认参数
    setDefaultParams(type) {
      setThisValue(this, ["dateType"], ["daterange"]);
      setRefValue(
        this,
        ["periodTypes"],
        [store.getters["parameter/periodTypes"][0]]
      );
      setSearchValue(
        this,
        ["timeType"],
        [store.getters["parameter/periodTypes"][0].label]
      );
      this.slectRole(store.getters["parameter/roles"][0]);
      setRefValue(this, ["role"], [store.getters["parameter/roles"][0]]);
      this.slectServiceItem(store.getters["parameter/serviceItems"][0]);
      setRefValue(
        this,
        ["slectServiceItem"],
        [store.getters["parameter/serviceItems"][0]]
      );
      this.$nextTick(() => {
        this.$refs.timeSelect.initValue().then(res => {
          this.setTime(res);
          if (type != 0) {
            this.initData();
          }
        });
      });
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "auth/operationStatistical/workloadSumTrend";
      this.searchParams = {
        ...this.searchQuery
      };
      return true;
    },

    // 查询
    search() {
      this.initData();
    },
    //重置查询
    reloadSearch() {
      setRefValue(this, [
        "hospitals",
        "departments",
        "doctors",
        "role",
        "slectServiceItem"
      ]);
      setSearchValue(this, this.searchQuery);
      this.setDefaultParams(1);
    },

    //选择院区
    slectHospitals(item) {
      let departments1 = item && item.data ? [item.data] : null;
      setThisValue(this, ["departments1"], departments1, []);
      if (item && item.label) {
        setSearchValue(this, ["area"], [item.label]);
      } else {
        setSearchValue(this, ["area", "dept", "doctor"]);
        setThisValue(this, ["doctors"], null, []);
      }
      setRefValue(this, ["departments", "doctors"]);
    },
    //选择科室
    slectDepartments(item) {
      let doctors =
        item && item.data ? [item.data, deepClone(item.data)] : null;
      setThisValue(this, ["doctors", "spareDoctors"], doctors, []);
      this.setDoctors(this.searchQuery.role);
      if (item && item.label) {
        setSearchValue(this, ["dept"], [item.label]);
      } else {
        setSearchValue(this, ["dept", "doctor"]);
        setThisValue(this, ["doctors", "spareDoctors"], null, []);
      }
      setRefValue(this, ["doctors"]);
    },
    //选择医务人员
    slectDoctors(item) {
      if (item && item.value) {
        setSearchValue(this, ["doctor", "role"], [item.value, item.role]);
        let roles = getFilterArrary(
          store.getters["parameter/roles"],
          "label",
          item.role
        );
        let role = roles && roles.length > 0 ? roles[0] : {};
        setRefValue(this, ["role"], [role]);
      } else {
        setSearchValue(this, ["doctor"]);
      }
    },

    //选择角色
    slectRole(item) {
      setSearchValue(this, ["doctor"]);
      setRefValue(this, ["doctors"]);
      if (item && item.label) {
        setSearchValue(this, ["role"], [item.label]);
        this.setDoctors(item.label);
      } else {
        setSearchValue(this, ["role"]);
        setThisValue(this, ["doctors"], [this.spareDoctors]);
      }
    },

    //设置医生数据
    setDoctors(itemLabel) {
      let doctors = getFilterArrary(this.spareDoctors, "role", itemLabel);
      setThisValue(this, ["doctors"], [doctors]);
    },

    //选择服务项目
    slectServiceItem(item) {
      if (item && item.label) {
        setSearchValue(this, ["project"], [item.label]);
      } else {
        setSearchValue(this, ["slectServiceItem"]);
      }
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
      let startDate = timeArr ? timeArr[0] + " 00:00:00" : "";
      let endDate = timeArr ? timeArr[1] + " 00:00:00" : "";
      setSearchValue(this, ["startDate", "endDate"], [startDate, endDate]);
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
      var div_print = document.querySelector("#workloadEchart"); // 获取要打印部分的内容
      var cv = document.querySelector(".workloadEchart canvas"); //获取canvas
      var context = cv.getContext("2d");
      var img = new Image();
      var strDataURI = cv.toDataURL("image/png");
      img.src = strDataURI;
      // 图片加载完成之后
      img.onload = () => {
        this.$refs.echartImg.src = strDataURI;
        openPrint(this, "#workloadEchartPrint", "预约挂号订单趋势分析打印");
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
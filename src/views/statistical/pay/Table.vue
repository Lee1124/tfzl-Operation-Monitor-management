//门诊缴费统计表格统计
<template>
  <div class="order-table-statistics" style="height:100%;" v-loading="loading">
    <div class="tab-scroll-container tab-scroll-container-nopagination scrollbarStyle2">
      <div class="search-view">
        <!-- 查询 -->
        <div class="search-filter">
          <date-picker
            class="search-btn"
            labelText="起止时间"
            @change="changeDate"
            type="daterange"
            ref="timeSelect"
          />
          <select-one
            v-if="isHavehospitals"
            ref="hospitals"
            class="search-btn"
            :alignNum="4"
            @change="slectHospitals"
            labelText="院区"
            :options="hospitals"
          />
          <select-one
            class="search-btn"
            ref="expenseItem"
            labelText="费用项目"
            @change="(item)=>{searchQuery.project=item.label}"
            :options="expenseItem"
          />
        </div>
        <!-- 查询按钮 -->
        <div class="search-handle-view">
          <el-button size="medium" type="success" @click.stop="search">查询</el-button>
          <el-button size="medium" @click.stop="reloadSearch">重置</el-button>
        </div>
      </div>
      <!-- 表格框与操作按钮 id="printList"-->
      <div class="handle-btn-view">
        <el-button size="medium" @click.stop="doPrint">打印</el-button>
        <el-button size="medium">导出</el-button>
      </div>
      <div class="order-table _marginTopFu" id="payTablePrint">
        <div class="payTablePrint">
          <div
            class="_title"
          >{{searchQuery.startDate |dealTime}}至{{searchQuery.endDate|dealTime}}诊间缴费汇总统计</div>

          <!-- 表格渲染 -->
          <el-table
            :data="tableData"
            header-row-class-name="table-header-style"
            :row-class-name="tableRowStyle"
            style="width: 100%"
            @row-click="clickRow"
          >
            <el-table-column label="院区/科室">
              <template slot-scope="scope">
                <span
                  v-if="nowColIndex0Show===1"
                  :class="{'totalNumberLabel':scope.row.totalNumber}"
                >{{scope.row.area||scope.row.totalNumber}}</span>
                <span
                  v-if="nowColIndex0Show===2"
                  :class="{'totalNumberLabel':scope.row.totalNumber}"
                >{{scope.row.dept||scope.row.totalNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="project" label="费用项目"></el-table-column>
            <el-table-column prop="fee" label="收费金额（元）"></el-table-column>
            <el-table-column prop="refundFee" label="退费金额（元）"></el-table-column>
            <el-table-column prop="totalFee" label="总金额（元）"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 详情弹框 -->
    <details-popup ref="details" />
  </div>
</template>
<script>
import {
  clearObjectVal,
  getY_M_D_H_M_S,
  clearRefValue,
  openPrint,
  setRefValue,
  setSearchValue,
  setThisValue
} from "@/utils/index";
import { figureOut, subTotal } from "@/utils/systemCount";
import initData from "@/mixins/req.js";
import detailsPopup from "./detailsPopup";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "order-table-statistics",
  mixins: [initData],
  components: { detailsPopup },
  computed: {
    ...mapGetters("parameter/", ["hospitals"]),
    ...mapGetters("parameter/", ["expenseItem"]),
    ...mapGetters("parameter/", ["isHavehospitals"])
  },
  data() {
    return {
      searchQuery: {
        area: "", //院区
        project: "", //费用项目
        endDate: "", //结束时间
        startDate: "" //开始时间
      },
      slectsEnum: {
        area: 1, //1代表-院区
        dept: 2 //2代表-科室
      },
      nowColIndex0Show: 1, //默认显示院区（若无院区显示科室）
      rowData: null,
      countArr: ["fee", "refundFee", "totalFee"]
    };
  },
  activated() {
    this.getHospitals(); //获取院区/科室/医生
    this.initParams(); //初始化参数
    this.$nextTick(() => {
      this.setDefaultParams();
    });
  },
  methods: {
    //初始化数据
    initData() {
      this.init().then(res => {
        this.dealData(res.data.list);
      });
    },
    //初始化数据
    initParams() {
      this.$store.commit("parameter/SET_HOSPITALS", []);
    },
    //设置默认参数
    setDefaultParams() {
      this.$refs.timeSelect.initValue().then(res => {
        this.changeDate(res);
        this.initData();
      });
    },
    // 处理数据添加总计和合计
    dealData(data) {
      //创建字段===
      this.subtotal = {};
      this.countArr.forEach(item => {
        this.subtotal[item] = 0;
      });
      //添加合计===
      figureOut(data, this.countArr);
      //添加小计===
      switch (this.nowColIndex0Show) {
        case 1:
          subTotal(this, data, "area", this.countArr);
          break;
        case 2:
          subTotal(this, data, "dept", this.countArr);
          break;
      }
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "auth/operationStatistical/clinicPay";
      this.searchParams = {
        ...this.searchQuery
      };
      return true;
    },
    // 查询
    search() {
      this.initData();
      this.reloadSlects();
    },
    //重置选择
    reloadSlects() {
      this.nowColIndex0Show = this.$store.getters["parameter/isHavehospitals"]
        ? this.slectsEnum.area
        : this.slectsEnum.dept;
      if (this.searchQuery.area != "") {
        this.nowColIndex0Show = this.slectsEnum.dept;
      }
    },
    //重置查询
    reloadSearch() {
      setRefValue(this, ["hospitals", "expenseItem"]);
      setSearchValue(this, this.searchQuery);
      this.setDefaultParams();
      this.reloadSlects();
    },

    //选择时间
    changeDate(timeArr) {
      let startDate = timeArr ? timeArr[0] + " 00:00:00" : "";
      let endDate = timeArr ? timeArr[1] + " 00:00:00" : "";
      setSearchValue(this, ["startDate", "endDate"], [startDate, endDate]);
    },
    //选择院区
    slectHospitals(item) {
      if (item && item.label) {
        setSearchValue(this, ["area"], [item.label]);
      } else {
        setSearchValue(this, ["area"]);
      }
    },
    // 获取院区
    getHospitals() {
      this.$store.dispatch("parameter/getHospitals").then(res => {
        this.reloadSlects();
      });
    },
    //点击行显示详情
    clickRow(row, column, event) {
      this.rowData = row;
      if (!row.totalNumber) this.$refs.details.show = true;
    },
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    },
    //打印
    doPrint() {
      openPrint(this, "#payTablePrint", "诊间缴费汇总统计打印");
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
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
</style>
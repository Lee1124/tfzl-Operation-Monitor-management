//在线问诊表格统计

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
            v-if="isHavehospitals"
            ref="departments"
            class="search-btn"
            :alignNum="4"
            @change="slectDepartments"
            labelText="科室"
            :options="departments1"
          />
          <select-one
            v-if="!isHavehospitals"
            ref="departments"
            class="search-btn"
            :alignNum="4"
            @change="slectDepartments"
            labelText="科室"
            :options="departments"
          />
          <select-one
            class="search-btn"
            ref="doctors"
            labelText="医务人员"
            @change="slectDoctors"
            :options="doctors"
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
      <div class="order-table _marginTopFu" id="inquiry_printList1">
        <div class="inquiryPrint1">
          <div
            class="_title"
          >{{searchQuery.startDate |dealTime}}至{{searchQuery.endDate|dealTime}}在线问诊订单分布统计</div>

          <!-- 表格渲染 -->
          <el-table
            :data="tableData"
            show-summary
            header-row-class-name="table-header-style"
            :row-class-name="tableRowStyle"
            style="width: 100%"
            @row-click="clickRow"
          >
            <el-table-column label="院区/科室/医务人员">
              <template slot-scope="scope">
                <span v-if="nowColIndex0Show===1">{{scope.row.hospitalArea}}</span>
                <span v-if="nowColIndex0Show===2">{{scope.row.hospitalDept}}</span>
                <span v-if="nowColIndex0Show===3">{{scope.row.doctor}}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单数量">
              <el-table-column prop="unPay" label="待支付"></el-table-column>
              <el-table-column prop="unReceived" label="待接诊"></el-table-column>
              <el-table-column prop="inConsultation" label="问诊中"></el-table-column>
              <el-table-column label="已完成">
                <el-table-column prop="complete" label="完成"></el-table-column>
                <el-table-column prop="cancelOrClose" label="取消或关闭"></el-table-column>
                <el-table-column prop="refund" label="退诊"></el-table-column>
              </el-table-column>
              <el-table-column prop="totalOrders" label="总订单量"></el-table-column>
            </el-table-column>
            <el-table-column label="订单金额">
              <el-table-column prop="receiveFee" label="收费金额（元）"></el-table-column>
              <el-table-column prop="refundFee" label="退费金额（元）"></el-table-column>
              <el-table-column prop="totalFee" label="总金额（元）"></el-table-column>
            </el-table-column>
            <el-table-column label="处方数量">
              <el-table-column prop="preIn" label="院内(张)"></el-table-column>
              <el-table-column prop="preOut" label="外延(张)"></el-table-column>
              <el-table-column prop="totalPre" label="小计(张)"></el-table-column>
            </el-table-column>
            <el-table-column label="处方金额">
              <el-table-column prop="preInFee" label="院内(张)"></el-table-column>
              <el-table-column prop="preOutFee" label="外延(张)"></el-table-column>
              <el-table-column prop="totalPreFee" label="小计(张)"></el-table-column>
            </el-table-column>
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
  setRefValue,
  setSearchValue,
  setThisValue,
  getY_M_D_H_M_S,
  openPrint
} from "@/utils/index";
import initData from "@/mixins/req";
import detailsPopup from "./detailsPopup";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "order-table-statistics",
  mixins: [initData],
  components: { detailsPopup },
  computed: {
    ...mapGetters("parameter/", ["hospitals"]),
    ...mapGetters("parameter/", ["departments"]),
    ...mapGetters("parameter/", ["isHavehospitals"])
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
        startDate: "" //开始时间
      },
      slectsEnum: {
        area: 1, //1代表-院区
        dept: 2, //2代表-科室
        doctor: 3 //3代表-医生
      },
      nowColIndex0Show: 1, //默认显示院区（若无院区显示科室）
      rowData: null
    };
  },
  activated() {
    this.getHospitals(); //获取院区/科室/医生
    this.initParams();
    this.$nextTick(() => {
      this.setDefaultParams();
      
    });
  },
  methods: {
    //初始化数据
    initParams() {
      this.$store.commit("parameter/SET_HOSPITALS", []);
      this.$store.commit("parameter/SET_DEPARTMENTS", []);
    },
    //设置默认参数
    setDefaultParams() {
      this.$refs.timeSelect.initValue().then(res => {
        this.setTime(res);
        this.init();
      });
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "auth/operationStatistical/inquiryDistribution";
      this.searchParams = {
        ...this.searchQuery
      };
      return true;
    },
    // 查询
    search() {
      this.init();
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
      if (this.searchQuery.dept != "") {
        this.nowColIndex0Show = this.slectsEnum.doctor;
      }
      if (this.searchQuery.doctor != "") {
        this.nowColIndex0Show = this.slectsEnum.doctor;
      }
    },
    //重置查询
    reloadSearch() {
      setRefValue(this, ["hospitals", "departments", "doctors"]);
      setSearchValue(this, this.searchQuery);
      this.setDefaultParams();
      this.reloadSlects();
    },

    //选择时间
    changeDate(timeArr) {
      this.setTime(timeArr);
    },
    //设置时间
    setTime(timeArr) {
      let startDate = timeArr ? timeArr[0] + " 00:00:00" : "";
      let endDate = timeArr ? timeArr[1] + " 00:00:00" : "";
      setSearchValue(this, ["startDate", "endDate"], [startDate, endDate]);
    },
    //选择院区
    slectHospitals(item) {
      this.departments1 = item.data;
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
      this.doctors = item.data;
      if (item && item.label) {
        setSearchValue(this, ["dept"], [item.label]);
      } else {
        setSearchValue(this, ["dept", "doctor"]);
        setThisValue(this, ["doctors"], null, []);
      }
      setRefValue(this, ["doctors"]);
    },
    //选择医务人员
    slectDoctors(item) {
      if (item && item.value) {
        setSearchValue(this, ["doctor"], [item.value]);
      } else {
        setSearchValue(this, ["doctor"]);
      }
    },
    // 获取院区/科室/医生
    getHospitals() {
      this.$store.dispatch("parameter/getHospitals").then(res => {
        this.reloadSlects();
      });
    },
    //点击行显示详情
    clickRow(row, column, event) {
      this.rowData = row;
      this.$refs.details.show = true;
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
      openPrint(this, "#inquiry_printList1", "在线问诊订单分布统计打印");
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
//工作量统计表格统计
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
      <div class="order-table _marginTopFu" id="workloadTablePrint">
        <div class="workloadTablePrint">
          <div
            class="_title"
          >{{searchQuery.startDate |dealTime}}至{{searchQuery.endDate|dealTime}}工作量汇总统计</div>

          <!-- 表格渲染 -->
          <el-table
            :data="tableData"
            :show-summary="showSummary"
            header-row-class-name="table-header-style"
            :row-class-name="tableRowStyle"
            style="width: 100%"
            @row-click="clickRow"
            sort="order"
          >
            <el-table-column type="index" label="排序" key="1"></el-table-column>
            <el-table-column label="院区/科室/医务人员" key="2">
              <template slot-scope="scope">
                <span
                  v-if="nowColIndex0Show===1"
                  :class="{'totalNumberLabel':scope.row.totalNumber}"
                >{{scope.row.hospitalArea||scope.row.totalNumber}}</span>
                <span
                  v-if="nowColIndex0Show===2"
                  :class="{'totalNumberLabel':scope.row.totalNumber}"
                >{{scope.row.hospitalDept||scope.row.totalNumber}}</span>
                <span
                  v-if="nowColIndex0Show===3"
                  :class="{'totalNumberLabel':scope.row.totalNumber}"
                >{{scope.row.doctor||scope.row.totalNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column
              key="3"
              prop="inquiryNum"
              label="在线问诊(人次)"
              sortable
              v-if="spareSearchQuery.project==='在线问诊'"
            ></el-table-column>
            <el-table-column
              key="4"
              prop="inquiryFee"
              sortable
              label="在线问诊费用(元)"
              v-if="spareSearchQuery.project==='在线问诊'"
            ></el-table-column>
            <el-table-column
              key="5"
              sortable
              prop="nurseNum"
              v-if="spareSearchQuery.role==='护士'||spareSearchQuery.project==='护理服务'"
              label="护理服务(人次)"
            ></el-table-column>
            <el-table-column
              key="6"
              sortable
              prop="nurseFee"
              v-if="spareSearchQuery.role==='护士'||spareSearchQuery.project==='护理服务'"
              label="护理服务费用(元)"
            ></el-table-column>
            <el-table-column
              key="7"
              sortable
              prop="prescriptionNum"
              v-if="spareSearchQuery.role==='药师'||spareSearchQuery.project==='处方审核'"
              label="处方审核(张)"
            ></el-table-column>
            <el-table-column
              key="8"
              sortable
              prop="prescriptionFee"
              v-if="spareSearchQuery.role==='药师'||spareSearchQuery.project==='处方审核'"
              label="处方金额(元)"
            ></el-table-column>
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
  getFilterArrary,
  getY_M_D_H_M_S,
  deepClone,
  openPrint
} from "@/utils/index";

import { figureOut } from "@/utils/systemCount";
import initData from "@/mixins/req";
import detailsPopup from "./details/detailsPopup";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "order-table-statistics",
  mixins: [initData],
  components: { detailsPopup },
  computed: {
    ...mapGetters("parameter/", ["hospitals"]),
    ...mapGetters("parameter/", ["departments"]),
    ...mapGetters("parameter/", ["roles"]),
    ...mapGetters("parameter/", ["serviceItems"]),
    ...mapGetters("parameter/", ["isHavehospitals"])
  },
  data() {
    return {
      showSummary: true,
      whiteList: ["在线问诊(人次)", "护理服务(人次)", "处方审核(张)"],
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
        endDate: "" //结束时间
      },
      spareSearchQuery: {
        project: "", //服务项目
        role: "" //角色
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
    this.$nextTick(() => {
      this.initParams();
    });
  },
  methods: {
    //初始化数据
    initData() {
      this.showSummary = this.searchQuery.doctor != "" ? false : true;
      setThisValue(this, ["spareSearchQuery"], [deepClone(this.searchQuery)]);
      this.init();
    },
    reloadInitData() {
      this.$nextTick(() => {
        this.$refs.timeSelect.initValue().then(res => {
          this.changeDate(res);
          this.slectRole(store.getters["parameter/roles"][0]);
          setRefValue(this, ["role"], [store.getters["parameter/roles"][0]]);
          this.slectServiceItem(store.getters["parameter/serviceItems"][0]);
          setRefValue(
            this,
            ["slectServiceItem"],
            [store.getters["parameter/serviceItems"][0]]
          );
          this.initData();
        });
      });
    },
    //初始化数据
    initParams() {
      this.$store.commit("parameter/SET_HOSPITALS", []);
      this.$store.commit("parameter/SET_DEPARTMENTS", []);
      this.reloadInitData();
    },

    //加载前设置基础参数
    beforeInit() {
      this.url = "auth/operationStatistical/workloadSum";
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
      if (this.searchQuery.dept != "") {
        this.nowColIndex0Show = this.slectsEnum.doctor;
      }
      if (this.searchQuery.doctor != "") {
        this.nowColIndex0Show = this.slectsEnum.doctor;
      }
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
      this.reloadInitData();
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
    // 获取院区/科室/医生
    getHospitals() {
      this.$store.dispatch("parameter/getHospitals").then(res => {
        this.reloadSlects();
      });
    },
    //点击行显示详情
    clickRow(row, column, event) {
      if (this.whiteList.indexOf(column.label) != -1 && !row.totalNumber) {
        this.$refs.details.setParme(column.label);
        this.rowData = row;
        this.$refs.details.show = true;
      }
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
      openPrint(this, "#workloadTablePrint", "工作量统计打印");
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
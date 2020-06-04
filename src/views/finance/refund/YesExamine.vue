//已审核
<template>
  <div class="notExamine" style="height:100%;">
    <div class="tab-scroll-container scrollbarStyle2">
      <div class="search-view">
        <!-- 查询 -->
        <div class="search-filter">
          <date-picker
            class="search-btn"
            labelText="提交时间"
            type="daterange"
            ref="timeSelect"
            @change="changeDate"
          />
          <select-one
            class="search-btn"
            labelText="订单类型"
            :options="refund_orderTypes"
            ref="orderType"
            @change="(item)=>{searchQuery.orderType=item.value;}"
          />
          <my-input
            class="search-btn"
            labelText="订单编号"
            ref="ordernumber"
            @change="(val)=>{searchQuery.orderNumber=val;search()}"
          />
          <my-input
            class="search-btn"
            :alignNum="3"
            labelText="申请人"
            ref="applicant"
            @change="(val)=>{searchQuery.applicant=val;search()}"
          />
          <select-one
            class="search-btn"
            labelText="退款状态"
            ref="refundStatus"
            :options="refund_status"
            @change="(item)=>{searchQuery.refundStatus=item.value;}"
          />
        </div>
        <!-- 查询按钮 -->
        <div class="search-handle-view">
          <el-button size="medium" type="success" @click.stop="search">查询</el-button>
          <el-button size="medium" @click.stop="reloadSearch">重置</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-table
        :data="tableData"
        header-row-class-name="table-header-style"
        :row-class-name="tableRowStyle"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="提交日期" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.createTime|dealTime}}</template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip></el-table-column>
        <el-table-column label="订单类别" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.orderType | orderType}}</template>
        </el-table-column>
        <el-table-column prop="applicant" label="申请人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="totalFee" label="订单金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="refundFee" label="退款金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="refundReason" label="退费原因" show-overflow-tooltip></el-table-column>
        <el-table-column label="审批结果" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.apprResult | apprResult}}</template>
        </el-table-column>
        <el-table-column prop="apprOpinion" label="审核意见" show-overflow-tooltip></el-table-column>
        <el-table-column label="退款状态" show-overflow-tooltip>
           <template slot-scope="scope">{{scope.row.refundStatus | refundStatus}}</template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <table-pagination
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @changeSize="changeSize"
      @changePage="changePage"
      class="table-pagination"
    />
  </div>
</template>
<script>
import initData from "@/mixins/req";
import {
  setRefValue,
  setSearchValue,
  setThisValue,
  getY_M_D_H_M_S,
  findName
} from "@/utils/index";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  mixins: [initData],
  components: {},
  data() {
    return {
      options: [{ label: "选项一", value: 0 }],
      searchQuery: {
        startTime: "", //开始时间
        endTime: "", //结束时间
        orderNumber: "", //订单编号
        applicant: "", //申请人
        orderType: "", //订单类别
        refundStatus: "" //退款状态
      }
    };
  },
  computed: {
    ...mapGetters("parameter/", ["refund_orderTypes"]),
    ...mapGetters("parameter/", ["refund_status"])
  },
  methods: {
    // 查询
    search() {
      this.init();
    },
    //重置查询
    reloadSearch() {
      setRefValue(this, [
        "timeSelect",
        "orderType",
        "ordernumber",
        "applicant",
        "refundStatus"
      ]);
      setSearchValue(this, this.searchQuery);
      this.init();
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = store.getters["api/approved"];
      this.searchParams = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchQuery
      };
      return true;
    },
    //选择时间
    changeDate(timeArr) {
      this.setTime(timeArr);
    },
    //设置时间
    setTime(timeArr) {
      let startDate = timeArr ? timeArr[0] + " 00:00:00" : "";
      let endDate = timeArr ? timeArr[1] + " 00:00:00" : "";
      setSearchValue(this, ["startTime", "endTime"], [startDate, endDate]);
    },
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    }
  },
  filters: {
    dealTime(val) {
      return val ? getY_M_D_H_M_S(val) : "";
    },
    orderType(val) {
      return findName(store.getters["parameter/refund_orderTypes"], val);
    },
    apprResult(val) {
      return findName(store.getters["parameter/approved_result"], val);
    },
    refundStatus(val) {
      return findName(store.getters["parameter/refund_status"], val);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
</style>
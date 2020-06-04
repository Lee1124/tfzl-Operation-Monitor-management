//在线问诊监控
<template>
  <div class="onlineInquiry" style="height:100%">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <!-- 头部表 -->
        <head-table :data="inquiry_eventTypes" @clickEvent="clickItem" />

        <!-- 查询 -->
        <div class="search-view abnormal-search-view">
          <div class="search-filter">
            <date-picker
              labelText="发生时间"
              ref="SETime"
              class="search-btn"
              type="daterange"
              @change="changeDate"
            />
            <select-one
              labelText="事件类型"
              ref="eventType"
              class="search-btn"
              @change="(val)=>{this.searchQuery.eventType=val.value}"
              :options="inquiry_eventTypes"
            />
            <select-one
              labelText="订单类型"
              ref="orderType"
              class="search-btn"
              @change="(val)=>{this.searchQuery.orderType=val.value}"
              :options="inquiry_orderTypes"
            />
            <select-one
              labelText="提醒状态"
              ref="sendState"
              class="search-btn"
              @change="(val)=>{this.searchQuery.remindState=val.value}"
              :options="inquiry_reminds"
            />
            <select-one
              labelText="科室"
              ref="dept"
              class="search-btn"
              @change="(val)=>{this.searchQuery.deptName=val.label}"
              :alignNum="4"
              :options="departments"
            />
            <my-input
              class="search-btn"
              ref="doctor"
              labelText="医务人员"
              @change="(val)=>{this.searchQuery.doctorName=val}"
            />
          </div>
        </div>
        <!-- 操作按钮 -->
        <div class="handleBtn abnormal-handleBtn">
          <el-button size="medium" type="success" @click.stop="search">查询</el-button>
          <el-button size="medium" @click.stop="reloadSearch">重置</el-button>
          <el-button size="medium" type="success" class="moreBtn" @click.stop="moreSendRmind">批量处理</el-button>
        </div>
        <!-- 表格渲染 -->
        <my-table :tableData="tableData" ref="table" @EVENT="sendRmind" v-loading="loading" />
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
    <!-- 提醒dialog -->
    <send-popup ref="remind" :sendData="sendData" :isMore="isMore" />
  </div>
</template>
<script>
import myTable from "./Table";
import initData from "@/mixins/req.js";
import sendPopup from "@/views/components/SendPopup";
import { mapGetters } from "vuex";
import {
  clearObjectVal,
  getCurrentDay,
  isAllEqual,
  setRefValue,
  setSearchValue,
  setThisValue,
  notify
} from "@/utils/index";
import { getHospitals } from "@/api/common";
import store from "@/store";
export default {
  mixins: [initData],
  components: {
    myTable,
    sendPopup
  },
  data() {
    return {
      isMore: false, //是否是批量
      sendData: [],
      searchQuery: {
        startTime: "",
        endTime: "",
        eventType: "",
        orderType: "",
        remindState: "", //提醒状态
        deptName: "", //科室
        doctorName: "" //医务人员
      }
    };
  },
  activated() {
    this.getHospitals();
    this.initHeadTable();
    this.$nextTick(() => {
      this.initParams();
      this.init();
    });
  },
  methods: {
    //初始化参数
    initParams() {
      this.$refs.SETime.initValue(null);
      setSearchValue(this, ["startTime", "endTime"]);
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = store.getters["api/abnormalOnlineContent"];
      this.pageSize = 5;
      this.searchParams = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchQuery
      };
      return true;
    },
    // 查询
    search() {
      this.init();
    },
    //重置查询
    reloadSearch() {
      setRefValue(this, [
        "SETime",
        "eventType",
        "orderType",
        "sendState",
        "dept",
        "doctor"
      ]);
      setSearchValue(this, this.searchQuery);
      this.init();
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
    // 获取院区/科室/医生信息
    getHospitals() {
      this.$store.dispatch("parameter/getHospitals").then(res => {
        this.$store.dispatch("parameter/getDepartments");
      });
    },
    //初始化头部表
    initHeadTable() {
      this.$store.dispatch("parameter/getInquiryEventTypes");
    },
    //点击头部表
    clickItem(item) {
      setSearchValue(this,['startTime','endTime','eventType'],[getCurrentDay()[0],getCurrentDay()[1],item.value])
      this.init();
    },
    //提醒
    sendRmind(row) {
      this.isMore = false;
      this.sendData = [row];
      this.$refs.remind.show = true;
      // this.$refs.remind.rowData = row;
    },
    //批量提醒
    moreSendRmind() {
      let multipleSelection = this.$refs.table.multipleSelection;
      if (multipleSelection.length === 0) {
        notify(
          this,
          "warning",
          "提示",
          "只能对接诊超时、处方审核超时的异常事件进行提醒"
        );
        return false;
      }
      if (!isAllEqual(multipleSelection, "orderType")) {
        notify(this, "warning", "提示", "只能对同类型的异常事件批量提醒");
        return false;
      }
      this.isMore = true;
      this.sendData = multipleSelection;
      this.$refs.remind.show = true;
    }
  },
  computed: {
    ...mapGetters("parameter/", ["inquiry_eventTypes"]),
    ...mapGetters("parameter/", ["inquiry_reminds"]),
    ...mapGetters("parameter/", ["inquiry_orderTypes"]),
    ...mapGetters("parameter/", ["departments"]),
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/page.scss";
</style>



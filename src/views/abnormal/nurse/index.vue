//护理服务监控
<template>
  <div class="nurseManage" style="height:100%">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <!-- 头部表 -->
        <head-table :data="nurse_eventTypes" @clickEvent="clickItem" />

        <!-- 查询 -->
        <div class="search-view abnormal-search-view">
          <div class="search-filter">
            <date-picker
              labelText="发生时间"
              ref="time"
              class="search-btn"
              type="daterange"
              @change="changeDate"
            />
            <select-one
              labelText="事件类型"
              ref="eventType"
              class="search-btn"
              @change="(val)=>{this.searchQuery.eventType=val.value}"
              :options="nurse_eventTypes"
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
              ref="nurse"
              labelText="上门护士"
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
        <my-table :tableData="tableData" ref="table" @EVENT="sendRmind" />
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
  </div>
</template>
<script>
import initData from "@/mixins/req";
import { mapGetters } from "vuex";
import myTable from "./Table";
export default {
  mixins: [initData],
  name: "nurseManage",
  components: {myTable},
  data() {
    return {
      isMore: false, //是否是批量
      searchQuery: {
        startTime: "",
        endTime: "",
        eventType: "",
        orderType: "",
        remindState: "", //提醒状态
        deptName: "", //科室
        doctorName: "" //医务人员
      },
      // tableData:[
      //   {dd:""},{dd:""},{dd:""},{dd:""},{dd:""},{dd:""},{dd:""},{dd:""},{dd:""}
      // ]
    };
  },
  computed: {
    ...mapGetters("parameter/", ["nurse_eventTypes"]),
    ...mapGetters("parameter/", ["inquiry_reminds"]),
    ...mapGetters("parameter/", ["departments"]),
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  },
  mounted() {},
  methods: {
     //提醒
    sendRmind(row) {
      this.isMore = false;
      this.sendData = [row];
      // this.$refs.remind.dialogShow = true;
      // this.$refs.remind.rowData = row;
    },
    //查询
    search(){

    },
    //重置
    reloadSearch(){},
    //批量处理
    moreSendRmind(){},
    //发生时间
    changeDate() {},
    //点击头部
    clickItem() {}
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/page.scss";
</style>
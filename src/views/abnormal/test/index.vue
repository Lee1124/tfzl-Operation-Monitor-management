//预约体检监控
<template>
  <div class="testManage" style="height:100%">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <!-- 头部表 -->
        <head-table :data="test_eventTypes" @clickEvent="clickItem" />
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
          </div>
          <!-- 查询按钮 -->
          <div class="search-handle-view">
            <el-button size="medium" type="success" @click.stop="search">查询</el-button>
            <el-button size="medium" @click.stop="reloadSearch">重置</el-button>
          </div>
        </div>
        <!-- 表格渲染 -->
        <my-table :tableData="tableData" ref="table" />
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
  name: "testManage",
  components: { myTable },
  data() {
    return {
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
  computed: {
    ...mapGetters("parameter/", ["test_eventTypes"]),
    // ...mapGetters("parameter/", ["departments"]),
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  },
  mounted() {},
  methods: {
    //查询
    search() {},
    //重置
    reloadSearch() {},
    //批量处理
    moreSendRmind() {},
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
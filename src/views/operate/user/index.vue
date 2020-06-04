//用户管理
<template>
  <div class="operate-user" style="height:100%">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <!-- 查询 -->
        <div class="search-view abnormal-search-view">
          <div class="search-filter">
            <date-picker
              labelText="注册日期"
              ref="selectTime"
              class="search-btn"
              type="daterange"
              @change="changeDate"
            />
            <select-one
              labelText="民族"
              ref="nation"
              class="search-btn"
              @change="(val)=>{this.searchQuery.nation=val.value}"
              :options="nations"
            />

            <select-one
              labelText="年龄段"
              :alignNum="3"
              ref="ageRange"
              class="search-btn"
              @change="(val)=>{this.searchQuery.ageRange=val.value}"
              :options="ageRanges"
            />
            <select-one
              labelText="性别"
              :alignNum="4"
              ref="sex"
              class="search-btn"
              @change="(val)=>{this.searchQuery.sex=val.value}"
              :options="sexs"
            />
            <my-input
              class="search-btn"
              :alignNum="3"
              ref="phone"
              labelText="手机号"
              @change="(val)=>{this.searchQuery.phone=val}"
            />
            <date-picker
              labelText="最近登记日期"
              ref="selectTime2"
              class="search-btn"
              type="daterange"
              @change="changeDate2"
            />
          </div>
        </div>
        <!-- 操作按钮 -->
        <div class="handleBtns">
          <span class="left_btns">
            <el-button size="medium" type="success" @click.stop="search">查询</el-button>
            <el-button size="medium" @click.stop="reloadSearch">重置</el-button>
          </span>

          <span class="right_btns">
            <el-button size="medium" type="success" @click.stop="resetPassword">重置密码</el-button>
            <el-button size="medium" type="success" @click.stop="blacklist(1)">加入黑名单</el-button>
            <el-button size="medium" type="success" @click.stop="blacklist(0)">取消黑名单</el-button>
          </span>
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
    <!-- 用户详情 -->
    <user-details-popup ref="userDetailsPopup" />
    <!-- 黑名单 -->
    <blacklist-popup ref="blacklistPopup" />
  </div>
</template>
<script>
import myTable from "./Table";
import userDetailsPopup from "./detailsPopup/index";
import blacklistPopup from "./BlacklistPopup";
import initData from "@/mixins/req";
import { mapGetters } from "vuex";
import { clearObjectVal, getCurrentDay, isAllEqual } from "@/utils/index";
export default {
  mixins: [initData],
  components: { myTable, userDetailsPopup, blacklistPopup },
  data() {
    return {
      searchQuery: {
        startTime: "",
        endTime: "",
        startTime2: "",
        endTime2: "",
        nation: "", //民族
        ageRange: "", //年龄段
        sex: "", //性别
        phone: "" //电话号
      }
    };
  },
  computed: {
    ...mapGetters("parameter/", ["nations"]),
    ...mapGetters("parameter/", ["ageRanges"]),
    ...mapGetters("parameter/", ["sexs"]),
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  },
  mounted() {},
  methods: {
    // 查询
    search() {
      this.init();
    },
    //重置查询
    reloadSearch() {
      let reloadArr = [
        "SETime",
        "eventType",
        "orderType",
        "sendState",
        "dept",
        "doctor"
      ];
      reloadArr.forEach(item => {
        this.$refs[item].value = "";
      });
      this.searchQuery = clearObjectVal(this.searchQuery);
      this.init();
    },
    //重置密码
    resetPassword() {
      if (this.$refs.table.multipleSelection.length === 0) {
        this.$message.error("请选择用户");
        return false;
      }
      this.$confirm("确认选择的用户重置密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    //黑名单
    blacklist(type) {
      //0-取消 1-加入
      if (this.$refs.table.multipleSelection.length === 0) {
        this.$message.error("请选择用户");
        return false;
      }
      this.$refs.blacklistPopup.type =type;
      this.$refs.blacklistPopup.show = true;
    },
    //选择时间
    changeDate(timeArr) {
      this.searchQuery.startTime = timeArr ? timeArr[0] + " 00:00:00" : "";
      this.searchQuery.endTime = timeArr ? timeArr[1] + " 00:00:00" : "";
    },
    changeDate2(timeArr) {
      this.searchQuery.startTime2 = timeArr ? timeArr[0] + " 00:00:00" : "";
      this.searchQuery.endTime2 = timeArr ? timeArr[1] + " 00:00:00" : "";
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/page.scss";
</style>
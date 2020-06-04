//在线问诊订单
<template>
  <div class="operate-inquiry" style="height:100%">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <!-- 内容区 -->
    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
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
              v-if="isHavehospitals"
              class="search-btn"
              :alignNum="4"
              labelText="院区"
              ref="hospitals"
              :options="hospitals"
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
              @change="slectDepartments"
              :options="departments"
            />
            <select-one
              class="search-btn"
              :alignNum="4"
              labelText="医生"
              ref="doctors"
              @change="slectDoctors"
              :options="doctors"
            />
            <select-one
              class="search-btn"
              :alignNum="4"
              labelText="状态"
              ref="state"
              @change="slectState"
              :options="inquiry_orderState"
            />
            <my-input
              class="search-btn"
              :alignNum="3"
              labelText="提交人"
              ref="submitPerson"
              @change="(val)=>{searchQuery.submitan=val;search()}"
            />
            <my-input
              class="search-btn"
              :alignNum="3"
              labelText="手机号"
              ref="phone"
              @change="(val)=>{searchQuery.phoneNumber=val;search()}"
            />
            <el-checkbox-group v-model="checkList" class="checkboxView btn-label-align4">
              <el-checkbox label="接诊超时订单" @change="(bool)=>{searchQuery.acceptsTimeout=bool?1:0}"></el-checkbox>
              <el-checkbox label="问诊即将结束订单" @change="(bool)=>{searchQuery.comingEnd=bool?1:0}"></el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 查询按钮 -->
          <div class="search-handle-view">
            <el-button size="medium" type="success" @click.stop="search">查询</el-button>
            <el-button size="medium" @click.stop="reloadSearch">重置</el-button>
          </div>
        </div>
        <!-- 表格渲染 -->
        <my-table :tableData="tableData" :loading="loading" />
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
    <!-- 详情组件 -->
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
import myTable from "./Table";
import initData from "@/mixins/req";
import { mapGetters } from "vuex";
import store from "@/store";
import detailsPopup from "./detailsPopup";
export default {
  mixins: [initData],
  components: { myTable, detailsPopup },
  data() {
    return {
      departments1: [], //科室
      doctors: [], //医务人员
      searchQuery: {
        acceptsTimeout: 0, //接诊超时订单
        comingEnd: 0, //问诊即将结束订单
        hospityArea: "", //院区
        hospitalDept: "", //科室
        doctorId: "", //医务人员
        endTime: "", //结束时间
        startTime: "", //开始时间
        state: "", //状态
        submitan: "", //提交人
        phoneNumber: "" //手机号
      },
      checkList: []
    };
  },
  activated() {
    this.getHospitals(); //获取院区/科室/医生
    this.initParams();
    this.$nextTick(() => {
      this.setDefaultParams();
    });
  },
  computed: {
    ...mapGetters("parameter/", ["hospitals"]),
    ...mapGetters("parameter/", ["departments"]),
    ...mapGetters("parameter/", ["isHavehospitals"]),
    ...mapGetters("parameter/", ["inquiry_orderState"]),
    breadcrumbData() {
      return [{ name: "订单管理" + "--" + this.$route.meta.title }];
    }
  },
  methods: {
    //初始化数据
    initParams() {
      this.$store.commit("parameter/SET_HOSPITALS", []);
      this.$store.commit("parameter/SET_DEPARTMENTS", []);
    },
    //设置默认参数
    setDefaultParams() {
      this.$refs.timeSelect
        .initValue(store.getters["parameter/defaultTodayTimeRegion"])
        .then(res => {
          this.setTime(res);
          this.init();
        });
    },
    // 查询
    search() {
      this.init();
    },
    //重置查询
    reloadSearch() {
      setRefValue(this, [
        "hospitals",
        "departments",
        "doctors",
        "state",
        "submitPerson",
        "phone"
      ]);
      setThisValue(this, ["checkList"], null, []);
      setSearchValue(this, this.searchQuery);
      this.setDefaultParams();
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "api/onlineMedicalOrder/onlineContent";
      this.searchQuery.acceptsTimeout =
        this.searchQuery.acceptsTimeout == ""
          ? 0
          : this.searchQuery.acceptsTimeout;
      this.searchQuery.comingEnd =
        this.searchQuery.comingEnd == "" ? 0 : this.searchQuery.comingEnd;
      this.searchParams = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchQuery
      };
      return true;
    },
    // 获取院区/科室/医生
    getHospitals() {
      this.$store.dispatch("parameter/getHospitals").then(res => {
        // this.reloadSlects();
      });
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
    //选择院区
    slectHospitals(item) {
      this.departments1 = item.data;
      if (item && item.label) {
        setSearchValue(this, ["hospityArea"], [item.label]);
      } else {
        setSearchValue(this, ["hospityArea", "hospitalDept", "doctor"]);
        setThisValue(this, ["doctors"], null, []);
      }
      setRefValue(this, ["departments", "doctors"]);
    },
    //选择科室
    slectDepartments(item) {
      this.doctors = item.data;
      if (item && item.label) {
        setSearchValue(this, ["hospitalDept"], [item.label]);
      } else {
        setSearchValue(this, ["hospitalDept", "doctor"]);
        setThisValue(this, ["doctors"], null, []);
      }
      setRefValue(this, ["doctors"]);
    },
    //选择医务人员
    slectDoctors(item) {
      if (item && item.value) {
        setSearchValue(this, ["doctorId"], [item.value]);
      } else {
        setSearchValue(this, ["doctorId"]);
      }
    },
    //选择状态
    slectState(item) {
      if (item && item.value) {
        setSearchValue(this, ["state"], [item.value]);
      } else {
        setSearchValue(this, ["state"]);
      }
    }
    // changeCheckbox(val,e){
    //   console.log(val,e)
    // }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/page.scss";
.checkboxView {
  display: flex;
  align-items: center;
}
.search-view {
  margin: 20px 0;
}
</style>
//运营管理-护理服务订单
<template>
  <div class="operate-nurse" style="height:100%">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <!-- 内容区 -->
    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <div class="search-view">
          <!-- 查询 -->
          <div class="search-filter">
            <date-picker class="search-btn" labelText="提交时间" type="daterange" ref="timeSelect" />
            <select-one class="search-btn" :alignNum="4" labelText="院区" :options="options" />
            <select-one class="search-btn" labelText="接单科室" :options="options" />
            <select-one class="search-btn" :alignNum="4" labelText="护士" :options="options" />
            <select-one class="search-btn" labelText="服务项目" :options="options" />
            <select-one class="search-btn" :alignNum="4" labelText="状态" :options="options" />
            <my-input class="search-btn" :alignNum="3" labelText="申请人" />
            <my-input class="search-btn" :alignNum="3" labelText="手机号" />
            <el-checkbox-group v-model="checkList" class="checkboxView btn-label-align4">
              <el-checkbox label="上门超时"></el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 查询按钮 -->
          <div class="search-handle-view">
            <el-button size="medium" type="success">查询</el-button>
            <el-button size="medium">重置</el-button>
          </div>
        </div>

        <!-- 表格渲染 -->
        <div class="tableBox">
          <my-table :tableData="tableData" />
        </div>
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
import myTable from "./Table";
import initData from "@/mixins/req.js";
export default {
  mixins: [initData],
  components: { myTable },
  data() {
    return {
      options: [{ label: "选项1", value: 0 }],
      checkList: []
    };
  },
  computed: {
    breadcrumbData() {
      return [{ name: "订单管理" + "--" + this.$route.meta.title }];
    }
  },
  mounted() {},
  methods: {}
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
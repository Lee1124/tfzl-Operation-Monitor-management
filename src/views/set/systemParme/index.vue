//系统参数
<template>
  <div class="systemParme" style="height:100%;">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <!-- 查询 -->
        <div class="search-view abnormal-search-view">
          <div class="search-filter">
            <my-input
              class="search-btn"
              ref="systemParmeName"
              labelText="系统参数名称"
              @change="(val)=>{this.searchQuery.paramName=val;search()}"
            />
          </div>
          <!-- 操作按钮 -->
          <div class="handleBtn abnormal-handleBtn">
            <el-button size="medium" type="success" @click.stop="search">查询</el-button>
            <el-button size="medium" @click.stop="reloadSearch">重置</el-button>
          </div>
        </div>
        <!-- 表格渲染 -->
        <my-table :tableData="tableData" ref="table" v-loading="loading" />
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
    <!-- 系统参数设置弹框 -->
    <parme-set-popup ref="parmeSetPopup" />
  </div>
</template>
<script>
import myTable from "./Table";
import parmeSetPopup from "./ParmeSetPopup";
import initData from "@/mixins/req";
import { setRefValue, setSearchValue, setThisValue } from "@/utils/index";
export default {
  mixins: [initData],
  name: "systemParme",
  components: { myTable, parmeSetPopup },
  data() {
    return {
      searchQuery: {
        paramName: ""
      }
    };
  },
  activated() {
    this.init();
  },
  computed: {
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  },
  methods: {
    // 查询
    search() {
      this.init();
    },
    //重置查询
    reloadSearch() {
      setRefValue(this, ["systemParmeName"]);
      setSearchValue(this, this.searchQuery);
      this.init();
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "api/systemConfig/getAll";
      this.searchParams = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchQuery
      };
      return true;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/page.scss";
</style>
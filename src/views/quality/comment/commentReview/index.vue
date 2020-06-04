
//处方点评审核
<template>
  <div class="commentReview" style="height:100%;">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />

    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <div class="search-view">
          <radio-button ref="radioButton" :radioList="radioList" />
        </div>
        <!-- 表格渲染 -->
        <el-table
          :data="tableData"
          header-row-class-name="table-header-style"
          :row-class-name="tableRowStyle"
          style="width: 100%"
        >
          <el-table-column prop="willPay" label="提交时间"></el-table-column>
          <el-table-column prop="willPay" label="抽样范围"></el-table-column>
          <el-table-column prop="willPay" label="样本数"></el-table-column>
          <el-table-column prop="willPay" label="提交人"></el-table-column>
          <el-table-column prop="willPay" label="类型"></el-table-column>
          <el-table-column prop="willPay" label="审核状态"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template>
              <span class="handleBtnHover" @click.stop="review">审核</span>
            </template>
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
    <!-- 审核详情 -->
    <examineDetails v-if="showDetails" />
  </div>
</template>
<script>
import { doPrint, timeFrame } from "@/utils/index";
import initData from "@/mixins/req";
import examineDetails from "./examineDetails";
export default {
  mixins: [initData],
  components: { examineDetails },
  data() {
    return {
      showDetails: false,
      radioList: [
        { label: "未审核", value: 0 },
        { label: "已审核", value: 1 },
        { label: "已取消", value: 2 }
      ],
      options: [
        { label: "哈哈哈1", value: 0 },
        { label: "哈哈哈2", value: 1 }
      ],
      tableData: [
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  computed: {
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  },
  mounted() {},
  methods: {
    //审核
    review() {
      this.showDetails = true;
    },
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    },
    doPrint() {
      doPrint("#printList");
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
.commentReview {
  position: relative;
}
</style>
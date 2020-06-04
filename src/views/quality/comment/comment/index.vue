//处方点评
<template>
  <div class="comment" style="height:100%;">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />

    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <div class="search-view">
          <!-- 查询 -->
          <div class="search-filter">
            <date-picker class="search-btn" labelText="抽样时间" type="daterange" ref="timeSelect" />
            <select-one class="search-btn" :alignNum="3" labelText="抽样人" :options="options" />
            <select-one class="search-btn" :alignNum="4" labelText="状态" :options="options" />
          </div>
          <!-- 查询按钮 -->
          <div class="search-handle-view">
            <el-button size="medium" type="success">查询</el-button>
            <el-button size="medium">重置</el-button>
            <el-button
              size="medium"
              type="success"
              style="margin-left:.15rem;"
              @click.stop="openCheck"
            >抽查处方</el-button>
          </div>
        </div>
        <!-- 表格渲染 -->
        <el-table
          :data="tableData"
          header-row-class-name="table-header-style"
          :row-class-name="tableRowStyle"
          style="width: 100%"
        >
          <el-table-column prop="willPay" label="抽取时间"></el-table-column>
          <el-table-column prop="willPay" label="处方日期"></el-table-column>
          <el-table-column prop="willPay" label="科室"></el-table-column>
          <el-table-column prop="willPay" label="医生"></el-table-column>
          <el-table-column prop="willPay" label="抽取方式"></el-table-column>
          <el-table-column prop="willPay" label="抽样方法"></el-table-column>
          <el-table-column prop="willPay" label="样本数"></el-table-column>
          <el-table-column prop="willPay" label="抽样人"></el-table-column>
          <el-table-column prop="willPay" label="状态"></el-table-column>
          <el-table-column prop="willPay" label="备注"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template>
              <span class="handleBtnHover">详情</span>
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
    <!-- 处方抽查 -->
    <prescriptionCheck v-if="showCheck" />
  </div>
</template>
<script>
import { doPrint, timeFrame } from "@/utils/index";
import initData from "@/mixins/req.js";
import prescriptionCheck from "./PrescriptionCheck/index";
export default {
  mixins: [initData],
  components: { prescriptionCheck },
  data() {
    return {
      showCheck: false,
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
    //抽查处方
    openCheck() {
      this.showCheck = true;
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
.comment {
  position: relative;
}

</style>
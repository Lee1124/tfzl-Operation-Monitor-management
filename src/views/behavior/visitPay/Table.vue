//在线问诊表格统计

<template>
  <div class="visitPay-table" style="height:100%;">
    <div class="tab-scroll-container tab-scroll-container-nopagination scrollbarStyle2">
      <div class="search-view">
        <!-- 查询 -->
        <div class="search-filter">
          <date-picker class="search-btn" labelText="起止时间" type="daterange" ref="timeSelect" />
          <select-one class="search-btn" :alignNum="4" labelText="院区" :options="options" />
          <select-one class="search-btn" :alignNum="4" labelText="科室" :options="options" />
          <my-input class="search-btn" labelText="医务人员" />
        </div>
        <!-- 查询按钮 -->
        <div class="search-handle-view">
          <el-button size="medium" type="success">查询</el-button>
          <el-button size="medium">重置</el-button>
        </div>
      </div>
      <!-- 表格框与操作按钮 -->
      <div class="handle-btn-view">
        <el-button size="medium" @click.stop="doPrint">打印</el-button>
        <el-button size="medium">导出</el-button>
      </div>
      <div class="order-table _marginTopFu" id="visitPayTablePrint" style="width:100%;">
        <div class="visitPayTablePrint">
          <!-- 标题 -->
          <div class="_title">2019/01/01至2019/12/31次均就诊费用汇总统计</div>
          <!-- 表格渲染 -->
          <el-table
            :data="tableData"
            show-summary
            header-row-class-name="table-header-style"
            :row-class-name="tableRowStyle"
            style="width: 100%"
            @row-click="clickRow"
          >
            <el-table-column prop="willPay" label="院区/科室/医生"></el-table-column>
            <el-table-column prop="willPay" label="在线问诊(人次)"></el-table-column>
            <el-table-column label="总费用(元)">
              <el-table-column prop="willPay" label="问诊"></el-table-column>
              <el-table-column prop="willPay" label="处方"></el-table-column>
              <el-table-column prop="willPay" label="检验检查"></el-table-column>
              <el-table-column prop="willPay" label="小计"></el-table-column>
            </el-table-column>
            <el-table-column label="次均就诊费用(元)">
              <el-table-column prop="willPay" label="问诊"></el-table-column>
              <el-table-column prop="willPay" label="处方"></el-table-column>
              <el-table-column prop="willPay" label="检验检查"></el-table-column>
              <el-table-column prop="willPay" label="小计"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 详情弹框 -->
    <!-- <details-popup ref="details" /> -->
  </div>
</template>
<script>
import { openPrint, timeFrame } from "@/utils/index";
import initData from "@/mixins/req.js";
// import detailsPopup from "./detailsPopup";
export default {
  name: "visitPay-table",
  mixins: [initData],
  // components: { detailsPopup },
  data() {
    return {
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
        }
      ]
    };
  },
  mounted() {
    // console.log(this.total);
    this.$refs.timeSelect.value = timeFrame(90);
  },
  methods: {
    //点击行
    clickRow(row, column, event) {
      console.log(row);
      this.$refs.details.show = true;
    },
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    },
    doPrint() {
      openPrint(this,"#visitPayTablePrint",'次均就诊费用汇总统计打印');
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
</style>
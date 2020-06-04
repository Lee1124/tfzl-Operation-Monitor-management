//处方合格率
<template>
  <div class="passRate" style="height:100%;">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />

    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <div class="search-view">
          <!-- 查询 -->
          <div class="search-filter">
            <date-picker class="search-btn" labelText="起止时间" type="daterange" ref="timeSelect" />
            <select-one class="search-btn" :alignNum="4" labelText="院区" :options="options" />
            <select-one class="search-btn" :alignNum="4" labelText="科室" :options="options" />
            <select-one class="search-btn" labelText="医务人员" :options="options" />
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
        <div id="passRatePrint" class="_marginTopFu" style="width:100%;">
          <div class="passRatePrint">
            <div class="_title">2019/01/01至2019/12/31处方合格率统计</div>
            <!-- 表格渲染 -->
            <el-table
              :data="tableData"
              show-summary
              header-row-class-name="table-header-style"
              :row-class-name="tableRowStyle"
              style="width: 100%"
            >
              <el-table-column prop="willPay" label="院区/科室/医生"></el-table-column>
              <el-table-column prop="willPay" label="抽查处方数"></el-table-column>
              <el-table-column prop="willPay" label="不合格数"></el-table-column>
              <el-table-column prop="willPay" label="合格率"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { openPrint, timeFrame } from "@/utils/index";
import initData from "@/mixins/req.js";
export default {
  mixins: [initData],
  components: {},
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
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    },
    doPrint() {
      openPrint(this,"#passRatePrint",'处方合格率打印');
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
</style>
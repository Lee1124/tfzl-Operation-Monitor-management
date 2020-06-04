//不合理处方
<template>
  <div class="unPrescription" style="height:100%;">
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
        <div class="order-table _marginTopFu" id="unPrescriptionPrint" style="width:100%;">
          <div class="unPrescriptionPrint">
            <div class="_title">2019/01/01至2019/12/31次均就诊费用汇总统计</div>
            <table class="topList" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td class="label">院区：</td>
                <td>111</td>
                <td class="label">科室：</td>
                <td>222</td>
              </tr>
              <tr>
                <td class="label">医生：</td>
                <td>111</td>
              </tr>
            </table>
            <!-- 表格渲染 -->
            <el-table
              :data="tableData"
              show-summary
              header-row-class-name="table-header-style"
              :row-class-name="tableRowStyle"
              style="width: 100%"
            >
              <el-table-column prop="willPay" label="院区"></el-table-column>
              <el-table-column prop="willPay" label="科室"></el-table-column>
              <el-table-column prop="willPay" label="开方医生"></el-table-column>
              <el-table-column prop="willPay" label="处方日期"></el-table-column>
              <el-table-column prop="willPay" label="处方编号"></el-table-column>
              <el-table-column prop="willPay" label="患者姓名"></el-table-column>
              <el-table-column prop="willPay" label="性别"></el-table-column>
              <el-table-column prop="willPay" label="年龄"></el-table-column>
              <el-table-column prop="willPay" label="诊断"></el-table-column>
              <el-table-column prop="willPay" label="处方金额(元)"></el-table-column>
              <el-table-column prop="willPay" label="审方药师"></el-table-column>
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
      openPrint(this,"#unPrescriptionPrint",'不合理处方打印');
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
.topList {
  width: 100%;
  tr > td {
    color: #333;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
  tr > td.label {
    width: 50px;
  }
}
</style>
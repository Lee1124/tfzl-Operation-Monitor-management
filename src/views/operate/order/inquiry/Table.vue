//表格
<template>
  <!-- 表格渲染 -->
  <el-table
    header-row-class-name="table-header-style"
    :row-class-name="tableRowStyle"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @row-dblclick="rowDBClick"
    v-loading="loading"
  >
    <el-table-column label="提交日期" width="120">
      <template slot-scope="scope">{{ scope.row.createTime|dealTime }}</template>
    </el-table-column>
    <el-table-column prop="orderNumber" label="订单编号" show-overflow-tooltip></el-table-column>
    <el-table-column prop="submitMan" label="提交人" show-overflow-tooltip></el-table-column>
    <el-table-column prop="phoneNumber" label="手机号" show-overflow-tooltip></el-table-column>
    <el-table-column prop="patientName" label="就诊人" show-overflow-tooltip></el-table-column>
    <el-table-column prop="hospitalArea" label="院区" show-overflow-tooltip></el-table-column>
    <el-table-column prop="hospitalDept" label="科室" show-overflow-tooltip></el-table-column>
    <el-table-column prop="doctor" label="医生" show-overflow-tooltip></el-table-column>
    <el-table-column prop="fee" label="费用(元)" show-overflow-tooltip></el-table-column>
    <el-table-column prop="accTimeout" label="接诊超时时间" class-name="redColor" show-overflow-tooltip></el-table-column>
    <el-table-column prop="comEnd" label="剩余问诊时间" class-name="redColor" show-overflow-tooltip></el-table-column>
    <el-table-column label="状态" show-overflow-tooltip>
      <template slot-scope="scope">
        <span>{{ scope.row.state | orderState}}</span>
      </template>
    </el-table-column>
    <el-table-column label="评价" width="120">
      <template slot-scope="scope">
        <el-rate
          :value="evaluate(scope.row.startLevel)"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        ></el-rate>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getY_M_D_H_M_S, findName } from "@/utils/index";
import store from "@/store";
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    //评分
    evaluate(val) {
      return val ? val : 0;
    },
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    },
    //双击击行
    rowDBClick(row) {
      this.$parent.$refs.details.rowData = row;
      this.$parent.$refs.details.show = true;
    }
  },
  filters: {
    dealTime(time) {
      return time ? getY_M_D_H_M_S(time) : "";
    },
    //订单状态
    orderState(val) {
      const orderState = store.getters["parameter/inquiry_orderState"];
      return findName(orderState, val);
    },
    txStateStr(val) {
      return val == 0 ? "未提醒" : "已提醒";
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/table.scss";
</style>
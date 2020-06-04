//工作量汇总统计-处方审核-表格
<template>
  <!-- 表格渲染 -->
  <el-table
    header-row-class-name="table-header-style"
    :row-class-name="tableRowStyle"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    v-loading="loading"
    lazy
    :highlight-current-row="true"
  >
    <el-table-column label="科室" v-if="nowColIndex0Show===1" show-overflow-tooltip>
      <template slot-scope="scope">
        <span
          :class="{'totalNumberLabel':scope.row.totalNumber}"
        >{{ scope.row.hospitalDept||scope.row.totalNumber}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="doctor"
      v-if="nowColIndex0Show===3||nowColIndex0Show===2"
      label="医生"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <span
          :class="{'totalNumberLabel':scope.row.totalNumber}"
        >{{ scope.row.doctor||scope.row.totalNumber}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="doctor" label="药师" show-overflow-tooltip></el-table-column>
    <el-table-column prop="state" label="审核结果" show-overflow-tooltip></el-table-column>
    <el-table-column label="审核日期" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.auditTime | dealTime}}</template>
    </el-table-column>
    <el-table-column prop="submiter" label="开方医生" show-overflow-tooltip></el-table-column>
    <el-table-column prop="fee" label="处方金额(元)" show-overflow-tooltip></el-table-column>
  </el-table>
</template>
<script>
import initData from "@/mixins/req";
import { getY_M_D_H_M_S, findName } from "@/utils/index";
import store from "@/store";
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    nowColIndex0Show: {
      type: Number || String,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    }
  },
  filters: {
    dealTime(time) {
      return time ? getY_M_D_H_M_S(time) : "";
    },
    orderState(val) {
      const orderState = store.getters["parameter/inquiry_orderState"];
      return findName(orderState, val);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/table.scss";
</style>
//表格
<template>
  <el-table
    header-row-class-name="table-header-style"
    :row-class-name="tableRowStyle"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @row-dblclick="rowDBClick"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="36" :selectable="selectable"></el-table-column>
    <el-table-column prop="orderNumber" label="姓名" show-overflow-tooltip></el-table-column>
    <el-table-column prop="orderNumber" label="性别" show-overflow-tooltip></el-table-column>
    <el-table-column label="出生日期" width="120">
      <template slot-scope="scope">{{ scope.row.occurrenceTime | dealTime}}</template>
    </el-table-column>
    <el-table-column prop="orderNumber" label="民族" show-overflow-tooltip></el-table-column>
    <el-table-column prop="orderNumber" label="账号" show-overflow-tooltip></el-table-column>
    <el-table-column prop="orderNumber" label="手机号" show-overflow-tooltip></el-table-column>
    <el-table-column label="注册日期" width="120">
      <template slot-scope="scope">{{ scope.row.occurrenceTime | dealTime}}</template>
    </el-table-column>
    <el-table-column prop="orderNumber" label="身份证号" show-overflow-tooltip></el-table-column>
    <el-table-column prop="orderNumber" label="住址" show-overflow-tooltip></el-table-column>
    <el-table-column label="最近登录日期" width="120">
      <template slot-scope="scope">{{ scope.row.occurrenceTime | dealTime}}</template>
    </el-table-column>
    <el-table-column prop="orderNumber" label="是否黑名单" show-overflow-tooltip></el-table-column>
  </el-table>
</template>

<script>
import { getY_M_D_H_M_S, findName } from "@/utils/index";
import store from "@/store";
export default {
  name: "onlineInquiry-table",
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    //双击行
    rowDBClick(row){
      this.$parent.$refs.userDetailsPopup.show=true;
    },
    //禁止选中
    selectable(row) {
      //接诊超时 3、审核处方超时 5
      return row.eventType === 3 || row.eventType === 5;
    },
    handleSelectionChange(selectArr) {
      this.multipleSelection = selectArr;
    },
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/table.scss";
</style>
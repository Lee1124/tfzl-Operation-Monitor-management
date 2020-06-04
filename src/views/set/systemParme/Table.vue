//表格
<template>
  <el-table
    header-row-class-name="table-header-style"
    :row-class-name="tableRowStyle"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @row-click="rowClick"
  >
    <el-table-column prop="code" label="代码" show-overflow-tooltip></el-table-column>
    <el-table-column prop="paramName" label="系统参数名称" show-overflow-tooltip></el-table-column>
    <el-table-column label="值类型" show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.paramType}}</template>
    </el-table-column>
    <el-table-column prop="paramValue" label="值" show-overflow-tooltip></el-table-column>
    <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
  </el-table>
</template>

<script>
import { getY_M_D_H_M_S } from "@/utils/index";
import store from "@/store";
export default {
  name: "systemParme-table",
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    },
    // 编辑
    rowClick(row) {
      this.$parent.$refs.parmeSetPopup.show = true;
      this.$parent.$refs.parmeSetPopup.form = row;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/table.scss";
</style>
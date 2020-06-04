//表格
<template>
  <div class="operate-nurse-table">
    <!-- 表格渲染 -->
    <el-table
      header-row-class-name="table-header-style"
      :row-class-name="tableRowStyle"
      height="100%"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="挂号日期">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column prop="orderId" label="就诊人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="手机号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="院区" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="医生" show-overflow-tooltip></el-table-column>
      <el-table-column label="预约就诊日期">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column prop="orderId" label="预约序号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="就诊地点" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="备注" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
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
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    }
  },
  filters: {
    txStateStr(val) {
      return val == 0 ? "未提醒" : "已提醒";
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/table.scss";
.color0 {
  color: #ff3939;
}
.color1 {
  color: #22e17e;
}
</style>
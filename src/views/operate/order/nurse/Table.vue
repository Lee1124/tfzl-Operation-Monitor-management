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
      @row-dblclick="rowDBClick"
    >
      <el-table-column label="申请日期">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column prop="orderId" label="订单编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="申请人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="手机号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="服务对象" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="服务项目" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="院区" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="接单科室" show-overflow-tooltip></el-table-column>
      <el-table-column label="接单日期">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column prop="orderId" label="上门超时" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="最近上门护士" show-overflow-tooltip></el-table-column>
      <el-table-column label="最近服务时间">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column prop="orderId" label="剩余次数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderId" label="评价" show-overflow-tooltip></el-table-column>
    </el-table>

    <!-- 订单详情弹窗 -->
    <details-popup ref="details" />
  </div>
</template>

<script>
import detailsPopup from "./detailsPopup";
export default {
  components: { detailsPopup },
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
    },
    //双击击行
    rowDBClick(row) {
      this.$refs.details.sendData = [row];
      this.$refs.details.show = true;
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
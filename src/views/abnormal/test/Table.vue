//护理监控表格
<template>
  <el-table
    header-row-class-name="table-header-style"
    :row-class-name="tableRowStyle"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="36" :selectable="selectable"></el-table-column>
    <el-table-column label="发生时间" width="120">
      <template slot-scope="scope">{{ scope.row.occurrenceTime | dealTime}}</template>
    </el-table-column>
    <el-table-column label="事件类型" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.eventType | eventType}}</template>
    </el-table-column>
    <el-table-column prop="orderNumber" label="订单编号" show-overflow-tooltip></el-table-column>
    <el-table-column label="订单日期" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.orderTime | dealTime}}</template>
    </el-table-column>
    <el-table-column label="订单日期" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.occurrenceTime | dealTime}}</template>
    </el-table-column>
    <el-table-column label="订单状态" show-overflow-tooltip>
      <template slot-scope="scope">
        <span>{{ scope.row.orderState | orderState}}</span>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" show-overflow-tooltip>
      <template slot-scope="scope">
        <span>{{ scope.row.prescriptionState | prescriptionState}}</span>
      </template>
    </el-table-column>
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
    },
    // 提醒处理
    edit(row) {
      this.$emit("EVENT", row);
    }
  },
  filters: {
    txStateStr(val) {
      return val == 0 ? "未提醒" : "已提醒";
    },
    dealTime(time) {
      return time ? getY_M_D_H_M_S(time) : "";
    },
    // 事件类型
    eventType(val) {
      const eventTypes = store.getters["parameter/inquiry_eventTypes"];
      return findName(eventTypes, val);
    },
    //订单状态
    orderState(val) {
      const orderState = store.getters["parameter/inquiry_orderState"];
      return findName(orderState, val);
    },
    //处方状态
    prescriptionState(val) {
      const prescriptionState =
        store.getters["parameter/inquiry_prescriptionState"];
      return findName(prescriptionState, val);
    },
    //提醒状态
    remindState(val) {
      const reminds = store.getters["parameter/inquiry_reminds"];
      return findName(reminds, val);
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
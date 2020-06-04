//详情弹框内容
<template>
  <el-dialog
    :title="title"
    custom-class="dialogStyle1 detailsPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
    <!-- 打印和导出按钮 -->
    <div class="handle-btn-view">
      <el-button size="medium" @click.stop="doPrint">打印</el-button>
      <el-button size="medium">导出</el-button>
    </div>
    <div class="content" id="detailsPrint" style="height:100%;">
      <div class="detailsPrint">
        <div class="_title">{{title}}</div>
        <!-- 表格渲染 -->
        <el-table
          header-row-class-name="table-header-style"
          :row-class-name="tableRowStyle"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="loading"
          :highlight-current-row="true"
        >
          <el-table-column label="科室" v-if="$parent.nowColIndex0Show===1" show-overflow-tooltip>
            <template slot-scope="scope">
              <span
                :class="{'totalNumberLabel':scope.row.totalNumber}"
              >{{ scope.row.hospitalDept||scope.row.totalNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="doctor"
            v-if="$parent.nowColIndex0Show===3||$parent.nowColIndex0Show===2"
            label="医生"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                :class="{'totalNumberLabel':scope.row.totalNumber}"
              >{{ scope.row.doctor||scope.row.totalNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderNumber" label="订单编号" show-overflow-tooltip></el-table-column>
          <el-table-column label="订单状态" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.state | orderState}}</template>
          </el-table-column>
          <el-table-column prop="patientName" label="患者姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="patientSex" label="性别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="patientAge" label="年龄" show-overflow-tooltip></el-table-column>
          <el-table-column label="订单日期" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.createTime | dealTime}}</template>
          </el-table-column>
          <el-table-column prop="fee" label="收费金额" show-overflow-tooltip></el-table-column>
          <el-table-column prop="refundFee" label="退费金额" show-overflow-tooltip></el-table-column>
          <el-table-column prop="totalFee" label="总金额" show-overflow-tooltip></el-table-column>
          <el-table-column label="开方日期" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.prescriptionDate | dealTime}}</template>
          </el-table-column>
          <el-table-column prop="prescriptionFee" label="处方金额" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import initData from "@/mixins/req.js";
import { openPrint, deepClone, getY_M_D_H_M_S, findName } from "@/utils/index";
import { figureOut, subTotal } from "@/utils/systemCount";
import store from "@/store";
export default {
  mixins: [initData],
  data() {
    return {
      show: false,
      searchQuery: null,
      title: "",
      countArr: ["fee", "refundFee", "totalFee", "prescriptionFee"],
    };
  },
  methods: {
    //打开弹框
    open() {
      let searchQuery = this.$parent.searchQuery;
      this.searchQuery = deepClone(searchQuery);
      let nowColIndex0Show = this.$parent.nowColIndex0Show;
      let rowData = this.$parent.rowData;
      // console.log('rowData====',rowData)
      switch (nowColIndex0Show) {
        case 1:
          this.changeQuerys(rowData.hospitalArea, "", "");
          this.title = rowData.hospitalArea + "-明细统计";
          break;
        case 2:
          this.changeQuerys("", rowData.hospitalDept, "");
          this.title =
            searchQuery.area + "-" + rowData.hospitalDept + "-明细统计";
          break;
        case 3:
          this.changeQuerys("", "", rowData.doctorId);
          this.title =
            searchQuery.area +
            "-" +
            searchQuery.dept +
            "-" +
            rowData.doctor +
            "-明细统计";
          break;
      }
      this.init().then(res => {
        this.dealData(res.data.list);
      });
    },
    //处理数据添加总计和合计
    dealData(data) {
      //创建字段===
      this.subtotal = {};
      this.countArr.forEach(item => {
        this.subtotal[item] = 0;
      });
      //添加合计===
      figureOut(data, this.countArr);
      //添加小计===
      switch (this.$parent.nowColIndex0Show) {
        case 1:
          subTotal(this, data, "hospitalDept", this.countArr);
          break;
        case 2:
          subTotal(this, data, "doctorId", this.countArr);
          break;
      }
    },
    //改变参数
    changeQuerys(area, dept, doctor) {
      this.searchQuery.area = area;
      this.searchQuery.dept = dept;
      this.searchQuery.doctor = doctor;
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "auth/operationStatistical/inquiryDistributionDetail";
      this.searchParams = {
        ...this.searchQuery
      };
      return true;
    },
    doPrint() {
      // doPrint("#printObj");
      openPrint(this, "#detailsPrint", "明细打印");
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
    },
    orderState(val) {
      const orderState = store.getters["parameter/inquiry_orderState"];
      return findName(orderState, val);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
/deep/ .detailsPopup {
  width: 90%;
}
.handleView {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.content_record {
  height: 250px;
}

._title {
  visibility: hidden;
}
</style>
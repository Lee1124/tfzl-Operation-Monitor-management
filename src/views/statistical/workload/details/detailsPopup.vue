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
    <div class="content" id="registerDetailsPrint" style="height:100%;">
      <div class="registerDetailsPrint">
        <div class="_title">{{title}}</div>
        <!-- 在线问诊表格渲染 -->
        <inquiry-detail-table
          v-if="type==='在线问诊'"
          :loading="loading"
          :nowColIndex0Show="nowColIndex0Show"
          :tableData="tableData"
        />
        <!-- 护理服务表格渲染 -->
        <nurse-detail-table
          v-if="type==='护理服务'"
          :loading="loading"
          :nowColIndex0Show="nowColIndex0Show"
          :tableData="tableData"
        />
        <!-- 处方审核表格渲染 -->
        <prescription-detail-table
          v-if="type==='处方审核'"
          :loading="loading"
          :nowColIndex0Show="nowColIndex0Show"
          :tableData="tableData"
        />
      </div>
    </div>
  </el-dialog>
</template>
<script>
import initData from "@/mixins/req";
import {
  openPrint,
  deepClone,
  getY_M_D_H_M_S,
  findName,
  setSearchValue,
  setThisValue
} from "@/utils/index";
import { figureOut, subTotal } from "@/utils/systemCount";
import inquiryDetailTable from "./InquiryDetailTable";
import nurseDetailTable from "./NurseDetailTable";
import prescriptionDetailTable from "./PrescriptionDetailTable";
import store from "@/store";
export default {
  mixins: [initData],
  components: { inquiryDetailTable, nurseDetailTable, prescriptionDetailTable },
  data() {
    return {
      countArr: [],
      nowColIndex0Show: 1,
      show: false,
      searchQuery: null,
      title: "",
      type: ""
    };
  },
  methods: {
    setParme(label) {
      switch (label) {
        case "在线问诊(人次)":
          setThisValue(
            this,
            ["type", "url", "countArr"],
            [
              "在线问诊",
              "auth/operationStatistical/workloadSumInquiryDetail",
              ["fee", "refundFee", "totalFee"]
            ]
          );
          break;
        case "护理服务(人次)":
          setThisValue(
            this,
            ["type", "url", "countArr"],
            [
              "护理服务",
              "auth/operationStatistical/workloadSumNurseDetail",
              ["fee", "refundFee", "totalFee"]
            ]
          );
          break;
        case "处方审核(张)":
          setThisValue(
            this,
            ["type", "url", "countArr"],
            [
              "处方审核",
              "auth/operationStatistical/workloadSumPrescriptionDetail",
              ["fee"]
            ]
          );
          break;
      }
    },
    //打开弹框
    open() {
      let searchQuery = this.$parent.searchQuery;
      this.searchQuery = deepClone(searchQuery);
      this.nowColIndex0Show = this.$parent.nowColIndex0Show;
      let rowData = this.$parent.rowData;
      switch (this.nowColIndex0Show) {
        case 1:
          setSearchValue(
            this,
            ["area", "dept", "doctor"],
            [rowData.hospitalArea]
          );
          this.title = rowData.hospitalArea + "-" + this.type + "-明细统计";
          break;
        case 2:
          setSearchValue(
            this,
            ["dept", "area", "doctor"],
            [rowData.hospitalDept]
          );
          this.title =
            searchQuery.area +
            "-" +
            rowData.hospitalDept +
            "-" +
            this.type +
            "-明细统计";
          break;
        case 3:
          setSearchValue(this, ["doctor", "area", "dept"], [rowData.doctorId]);
          this.title =
            searchQuery.area +
            "-" +
            searchQuery.dept +
            "-" +
            rowData.doctor +
            searchQuery.role +
            "-" +
            this.type +
            "-明细统计";
          break;
      }
      this.init().then(res => {
        this.tableData = deepClone(res.data.list);
        if (this.tableData.length > 0) this.dealData(this.tableData);
      });
    },
    //处理数据添加总计和合计
    dealData(data) {
      return new Promise((resolve, reject) => {
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
        resolve();
      });
    },

    //加载前设置基础参数
    beforeInit() {
      this.searchParams = {
        ...this.searchQuery
      };
      return true;
    },
    doPrint() {
      openPrint(this, "#registerDetailsPrint", "明细打印");
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
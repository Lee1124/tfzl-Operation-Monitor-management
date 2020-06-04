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
    <div class="content" id="payDetailsPrint" style="height:100%;">
      <div class="payDetailsPrint">
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
          <el-table-column
            label="科室"
            v-if="$parent.nowColIndex0Show===1||$parent.nowColIndex0Show===2"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                :class="{'totalNumberLabel':scope.row.totalNumber}"
              >{{ scope.row.dept||scope.row.totalNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="payTime" label="交易时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="no" label="交易流水号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="project" label="费用项目" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fee" label="收费金额(元)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="refundFee" label="退费金额(元)" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import initData from "@/mixins/req";
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
      //计算的字段
      countArr:["fee", "refundFee"]
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
      this.searchQuery.project = rowData.project;
      switch (nowColIndex0Show) {
        case 1:
          this.changeQuerys(rowData.area, "");
          this.title = rowData.area + "-明细统计";
          break;
        case 2:
          this.changeQuerys("", rowData.dept);
          this.title = searchQuery.area + "-" + rowData.dept + "-明细统计";
          break;
      }
      this.init().then(res => {
        this.dealData(res.data.list);
      });
    },
    //处理数据添加总计和合计
    dealData(data) {
      //创建字段===
      this.subtotal={};
      this.countArr.forEach(item=>{
        this.subtotal[item]=0;
      })
      //添加合计===
      figureOut(data, this.countArr);
      //添加小计===
      if (
        this.$parent.nowColIndex0Show === 1 ||
        this.$parent.nowColIndex0Show === 2
      ) {
        subTotal(this, data, "dept", this.countArr);
      }
    },
    //改变参数
    changeQuerys(area, dept) {
      this.searchQuery.area = area;
      this.searchQuery.dept = dept;
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "auth/operationStatistical/clinicPayDetail";
      this.searchParams = {
        ...this.searchQuery
      };
      return true;
    },
    //打印
    doPrint() {
      openPrint(this, "#payDetailsPrint", "明细打印");
    },
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
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
//处方点评报表弹框
<template>
  <el-dialog
    :title="title"
    custom-class="dialogStyle1 reportForm"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
    <!-- 打印和导出按钮 -->
    <div class="handleView">
      <el-button size="medium" @click.stop="doPrint">打印</el-button>
      <el-button size="medium">导出</el-button>
    </div>
    <div id="reportFormPrint" style="height:100%;">
      <div class="reportFormPrint" style="height:100%;">
        <!-- 标题 -->
        <p class="title">XXX医院2019/01/01至2019/12/31处方点评工作表</p>
        <div class="content">
          <!-- 总计，平均，占比 -->
          <div class="statisticsView">
            <table border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <!-- 总计 -->
                <tr>
                  <td class="label">总计</td>
                  <td>
                    用药品种总数：
                    <span>1</span>
                  </td>
                  <td>
                    使用抗菌药的处方数:
                    <span>1</span>
                  </td>
                  <td>
                    使用注射剂的处方数:
                    <span>1</span>
                  </td>
                  <td>
                    处方中基本药物品种总数:
                    <span>1</span>
                  </td>
                  <td>
                    处方中使用药品通用名总数:
                    <span>1</span>
                  </td>
                  <td>
                    处方总金额:
                    <span>1</span>
                  </td>
                  <td style="width:7%;">
                    合理处方总数:
                    <span>1</span>
                  </td>
                </tr>
                <!-- 平均 -->
                <tr>
                  <td class="label">平均</td>
                  <td>
                    平均每张处方用药品种数:
                    <span>1</span>
                  </td>
                  <td>
                    平均每张处方金额:
                    <span>1</span>
                  </td>
                  <td>
                    合理处方百分率:
                    <span>1</span>
                  </td>
                </tr>
                <!-- 平均 -->
                <tr>
                  <td class="label">占比</td>
                  <td>
                    抗菌药使用百分率:
                    <span>1</span>
                  </td>
                  <td>
                    注射剂使用百分率:
                    <span>1</span>
                  </td>
                  <td>
                    国基药占处方用药百分率:
                    <span>1</span>
                  </td>
                  <td>
                    药品通用名占处方用药百分率:
                    <span>100%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 提示 -->
          <el-alert
            class="tipAlert"
            title="有、合理=1 / 无、不合理=0"
            type="info"
            show-icon
            :closable="false"
          ></el-alert>

          <!-- 表格渲染 -->
          <el-table
            header-row-class-name="table-header-style"
            :row-class-name="tableRowStyle"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            v-loading="false"
            :highlight-current-row="true"
          >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="demo" label="开放日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="处方编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="年龄（岁）" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="诊断" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="药品品种" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="抗菌药(0/1)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="注射剂(0/1)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="国家基本药物品种数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="药品通用名数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="处方金额（元）" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="处方医师" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="审核、调配药师" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="核对、发药药师" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="是否合理（0/1）" show-overflow-tooltip></el-table-column>
            <el-table-column prop="demo" label="存在问题" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </div>

      <!-- <details-print
        ref="detailsPrint"
        :print-list="tableData"
        :nowColIndex0Show="$parent.nowColIndex0Show"
        :toQuery="searchQuery"
        :title="title"
      />-->
    </div>
  </el-dialog>
</template>
<script>
import initData from "@/mixins/req.js";
import { openPrint, deepClone, getY_M_D_H_M_S, findName } from "@/utils/index";
import store from "@/store";
// import detailsPrint from "./detailsPrint";
export default {
  mixins: [initData],
  components: {},
  data() {
    return {
      show: false,
      searchQuery: null,
      toFixed: 2,
      printList: [],
      title: "处方点评报表",
      tableData: [
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" },
        { demo: "000" }
      ]
    };
  },
  methods: {
    //打开弹框
    open() {
      //   let searchQuery = this.$parent.searchQuery;
      //   this.searchQuery = deepClone(searchQuery);
      //   let nowColIndex0Show = this.$parent.nowColIndex0Show;
      //   let rowData = this.$parent.rowData;
      //   // console.log('rowData====',rowData)
      //   switch (nowColIndex0Show) {
      //     case 1:
      //       this.changeQuerys(rowData.hospitalArea, "", "");
      //       this.title = rowData.hospitalArea + "-明细统计";
      //       break;
      //     case 2:
      //       this.changeQuerys("", rowData.hospitalDept, "");
      //       this.title =
      //         searchQuery.area + "-" + rowData.hospitalDept + "-明细统计";
      //       break;
      //     case 3:
      //       this.changeQuerys("", "", rowData.doctorId);
      //       this.title =
      //         searchQuery.area +
      //         "-" +
      //         searchQuery.dept +
      //         "-" +
      //         rowData.doctor +
      //         "-明细统计";
      //       break;
      //   }
      //   this.init().then(res => {
      //     this.dealData(res.data.list);
      //   });
    },
    //处理数据添加总计和合计
    dealData(data) {
      //添加合计===
      data.push({
        totalNumber: "合计：",
        fee: this.dataReduce(data, "fee"),
        refundFee: this.dataReduce(data, "refundFee"),
        totalFee: this.dataReduce(data, "totalFee"),
        prescriptionFee: this.dataReduce(data, "prescriptionFee")
      });
      //添加小计===
      switch (this.$parent.nowColIndex0Show) {
        case 1:
          this.dataSmallSum(data, "hospitalDept");
          break;
        case 2:
          this.dataSmallSum(data, "doctorId");
          break;
      }
    },
    //小计
    dataSmallSum(data, sumStr) {
      let [fee, refundFee, totalFee, prescriptionFee] = [0, 0, 0, 0]; //收费金额,退费金额,总金额,处方金额
      for (let i = 0; i <= data.length; i++) {
        if (data[i - 1]) {
          fee += data[i - 1].fee;
          refundFee += data[i - 1].refundFee;
          totalFee += data[i - 1].totalFee;
          prescriptionFee += data[i - 1].prescriptionFee;
        }
        if (data[i - 1] && data[i] && data[i - 1][sumStr] != data[i][sumStr]) {
          data.splice(i, 0, {
            totalNumber: "小计：",
            fee: fee.toFixed(this.toFixed),
            refundFee: refundFee.toFixed(this.toFixed),
            totalFee: totalFee.toFixed(this.toFixed),
            prescriptionFee: prescriptionFee.toFixed(this.toFixed)
          });
          i++;
          [fee, refundFee, totalFee, prescriptionFee] = [0, 0, 0, 0];
        }
      }
    },
    //数据累加形成合计
    dataReduce(data, reduceStr) {
      const sum = data.reduce((pre, item) => {
        return pre + item[reduceStr];
      }, 0);
      return sum.toFixed(this.toFixed);
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
      openPrint(this,"#reportFormPrint",'处方点评报表打印');
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
/deep/ .reportForm {
  width: 92%;
  .el-dialog__body {
    position: relative;
  }
  .handleView {
    position: absolute;
    right: 20px;
    top: 25px;
  }
  p.title {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #333;
    margin: 10px 0 30px;
  }
  .content {
    height: 92%;
    // overflow-y: auto;
    .statisticsView {
      border: 1px solid #ccc;
      padding: 5px;
      table {
        width: 100%;
        tr td {
          width: 12%;
          height: 30px;
          font-size: 13px;
          color: #666;
          span {
            color: #333;
            font-weight: 700;
          }
        }
        tr td.label {
          width: 2%;
          color: #333;
          font-weight: 700;
        }
      }
    }

    /deep/ .tipAlert {
      background: rgba(239, 255, 247, 1);
      border: 1px solid rgba(178, 245, 211, 1);
      color: #22e17e;
      margin: 10px 0;
    }
  }
}
</style>
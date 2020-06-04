<template>
  <div class="printView">
    <div class="no-print printBtn">
      <el-button size="medium" title="点击启动打印" type="primary" @click.stop="doPrint">打印</el-button>
    </div>
    <div class="printContent" v-cloak v-html="HTML"></div>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";
import setting from "../../settings";
export default {
  name: "printContent",
  components: {},
  data() {
    return {
      HTML: null
    };
  },
  computed: {},
  mounted() {
    this.HTML = JSON.parse(this.$route.query.HTML);
    document.title = setting.title + "-" + this.$route.query.title;
  },
  methods: {
    doPrint() {
      window.print();
    }
  }
};
</script>
<style lang='scss'>
@import "./css/reportForm.scss"; //处方点评报表打印样式

[v-cloak] {
  display: none;
}

._title {
  visibility: visible;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
}

.printBtn {
  box-sizing: border-box;
  position: absolute;
  top: 14px;
  left: 20px;
}

.chart {
  display: none;
}
.echartImg {
  display: block;
  width: 100%;
}

.printView {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .printContent {
    height: 100%;
    .el-table {
      .table-header-style {
        th {
          text-align: center;
        }
      }
      .table-row-style {
        td {
          text-align: center;
        }
      }
      .el-table__footer {
        td {
          text-align: center;
        }
      }
    }
  }
}

//运营统计分析-在线问诊订单统计-明细统计打印样式
.detailsPrint {
  width: 90%;
  margin: 0 auto;
}

//运营统计分析-预约挂号订单统计-表格打印
.registerTablePrint {
  width: 260mm;
  margin: 0 auto;
}
//运营统计分析-预约挂号订单统计-详情表格打印
.registerDetailsPrint {
  width: 292mm;
  margin: 0 auto;
}
//运营统计分析-门诊缴费统计-表格打印
.payTablePrint {
  width: 260mm;
  margin: 0 auto;
}

//运营统计分析-门诊缴费统计-详情表格打印
.payDetailsPrint {
  width: 260mm;
  margin: 0 auto;
}
//运营统计分析-工作量统计-表格打印
.workloadTablePrint {
  width: 262mm;
  margin: 0 auto;
}

//医疗质量监管-服务满意度
.satisfactionPrint {
  width: 80%;
  margin: 0 auto;
}
//医疗质量监管-处方合格率
.passRatePrint {
  width: 80%;
  margin: 0 auto;
}
//诊疗行为监控-抗菌药物使用率
.useRatePrint {
  width: 75%;
  margin: 0 auto;
}
//诊疗行为监控-不合理处方
.unPrescriptionPrint {
  width: 78%;
  margin: 0 auto;
  .topList {
    width: 100%;
    tr > td {
      color: #333;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
    }
    tr > td.label {
      width: 50px;
    }
  }
}
//诊疗行为监控-次均就诊费用
.visitPayTablePrint {
  width: 79%;
  margin: 0 auto;
}
</style>
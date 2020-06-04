//处方抽查
<template>
  <div class="PrescriptionCheck" style="height:100%;">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <!-- 返回 -->
    <el-button size="mini" type="success" @click.stop="back" class="returnBtn">返回</el-button>
    <div
      :class="['pc-content',{'pc-content-1':stepActive===0,'pc-content-2':stepActive===1,'pc-content-3':stepActive===3}]"
    >
      <div class="pc-content-container scrollbarStyle2">
        <!-- 步骤条 -->
        <step class="step" :active="stepActive" />
        <!-- 抽取处方 -->
        <extract-form ref="extractForm" v-show="stepActive===0" />
        <!-- tabs 已点评和未点评 -->
        <div class="comment_tabs" v-if="stepActive===1">
          <el-radio-group v-model="radio">
            <el-radio-button label="未点评"></el-radio-button>
            <el-radio-button label="已点评"></el-radio-button>
          </el-radio-group>
        </div>
        <!-- 取消审核和查看报表 -->
        <div class="examineView" v-if="stepActive===2">
          <p>您已将点评结果提交审核小组审核，点评完成。</p>
          <el-button
            size="medium"
            type="primary"
            style="margin-right:10px;"
            class="blue_color_btn"
            @click.stop="cancelExamine"
          >取消审核</el-button>
          <el-button
            type="primary"
            size="medium"
            class="blue_color_btn"
            @click.stop="openReportForm"
          >查看报表</el-button>
        </div>
        <!-- 表格渲染 -->
        <extract-table
          :tableData="tableData"
          v-if="stepActive===1||stepActive===2"
          :step="stepActive"
        />
      </div>
      <!-- 分页 -->
      <table-pagination
        v-if="stepActive!=0"
        :total="total"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @changeSize="changeSize"
        @changePage="changePage"
        class="table-pagination"
      />
      <!-- 按钮 -->
      <div class="handleView" v-if="stepActive===1">
        <el-button @click="preStep" style="margin-right:10px;">上一步</el-button>
        <el-button type="primary" @click="submitToExamine">提交审核</el-button>
      </div>
    </div>

    <!-- 报表 -->
    <report-form ref="reportForm" />
    <!-- 点评详情 -->
    <comment-details ref="commentDetails" />
  </div>
</template>
<script>
import step from "./Step";
import extractForm from "./ExtractForm";
import extractTable from "./ExtractTable";
import initData from "@/mixins/req.js";
import reportForm from "../reportFormPopup";
import commentDetails from "../commentDetailsPopup";
export default {
  mixins: [initData],
  components: { step, extractForm, extractTable, reportForm, commentDetails },
  data() {
    return {
      radio: "未点评",
      breadcrumbData: [{ name: "处方抽查" }],
      stepActive: 1,
      tableData: [
        { demo: 111 },
        { demo: 111 },
        { demo: 111 },
        { demo: 111 },
        { demo: 111 },
        { demo: 111 },
        { demo: 111 },
        { demo: 111 },
        { demo: 111 },
        { demo: 111 },
        { demo: 111 }
      ]
    };
  },
  computed: {},
  methods: {
    //上一步
    preStep() {
      this.changeStep(0);
    },
    //提交审核
    submitToExamine() {
      this.$confirm("确认提交审核", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.changeStep(2);
        })
        .catch(() => {});
    },
    //取消审核
    cancelExamine() {
      this.$confirm("确认取消审核", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.changeStep(1);
        })
        .catch(() => {});
    },
    //查看报表
    openReportForm() {
      this.$refs.reportForm.show = true;
    },
    //改变步骤
    changeStep(index) {
      this.stepActive = index;
      switch (index) {
        case 0:
          this.breadcrumbData = [{ name: "处方抽查" }];
          break;
        case 1:
          this.breadcrumbData = [{ name: "点评处方" }];
          break;
        case 2:
          this.breadcrumbData = [{ name: "提交审核" }];
          break;
      }
    },
    //返回
    back() {
      this.$parent.showCheck = false;
    }
  }
};
</script>
<style lang='scss' scoped>
.pc-content {
  .handleView {
    text-align: center;
  }
}
// .pc-content-1 {
//   .handleView {
//     margin-top: 14px;
//   }
// }
.pc-content-2 {
  padding-bottom: 120px;
}
.PrescriptionCheck {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  background: #fff;
  right: 0;
  bottom: 0;
}
/deep/ .returnBtn {
  position: absolute;
  right: 30px;
  top: 14px;
}
.step {
  margin: 30px 100px;
}
.examineView {
  text-align: center;
  margin-bottom: 20px;
  p {
    margin-bottom: 10px;
  }
}
</style>
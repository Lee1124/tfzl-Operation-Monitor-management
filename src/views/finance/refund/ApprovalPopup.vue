//退款审批弹窗
<template>
  <el-dialog
    title="退款审批"
    custom-class="dialogStyle1 dialogStyleFlexCol ApprovalPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open='open'
  >
    <ul class="approval-content" v-if="data">
      <li>
        <span class="label">订单编号：</span>
        <span class="value">{{data.orderNo}}</span>
      </li>
      <li>
        <span class="label">申请人：</span>
        <span class="value">{{data.applicant}}</span>
      </li>
      <li>
        <span class="label">医生：</span>
        <span class="value">{{data.doctor}}</span>
      </li>
      <li>
        <span class="label">问诊费用：</span>
        <span class="value">￥{{data.totalFee}}</span>
      </li>
      <li>
        <span class="label">退费原因：</span>
        <span class="value">{{data.refundReason}}</span>
      </li>
      <li>
        <span class="label">退费金额：</span>
        <span class="value">￥{{data.refundFee}}</span>
      </li>
      <li>
        <span class="label">审核意见：</span>
        <span class="value">
          <el-input type="textarea" resize="none" placeholder="请输入内容" v-model="ideas"></el-input>
        </span>
      </li>
    </ul>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handle(1)">通过</el-button>
      <el-button @click="handle(2)">不通过</el-button>
      <el-button @click="show = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { setThisValue,deepClone, notify } from "@/utils/index";
import { approve } from "@/api/finance";
export default {
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      show: false,
      ideas: "",
      flag: true
    };
  },
  methods: {
    open(){
      setThisValue(this,['ideas','flag'],["",true]);
    },  
    // 通过/不通过
    handle(val) {
      let title = val === 1 ? "通过" : "不通过";
      this.$confirm("确定" + title + "该条退款审批?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.req(val);
        })
        .catch(err => {});
    },
    req(val) {
      if (this.flag) {
        this.flag = false;
        let data = deepClone(this.data);
        data.apprOpinion = this.ideas;
        data.apprResult = val;
        approve(data)
          .then(res => {
            if (res.status === 0) {
              notify(this, "success", "成功", res.data);
              this.show=false;
              this.$parent.init();
            } else {
              notify(this, "error", "错误", res.msg);
            }
          })
          .catch(err => {
            this.flag = true;
          });
      }
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
/deep/ .ApprovalPopup {
  width: 800px;
  .el-dialog__body {
    flex: 1;
  }
  .el-dialog__footer {
    border-top: 1px solid #e0e0e0;
    .dialog-footer {
      display: flex;
      justify-content: center;
    }
  }

  .approval-content {
    padding: 0 30px;

    li {
      color: #666;
      font-size: 14px;
      padding: 14px 0;
      display: flex;
      .label {
        flex-basis: 10%;
        text-align: right;
      }
      .value {
        flex-basis: 90%;
      }
    }
  }
}
</style>
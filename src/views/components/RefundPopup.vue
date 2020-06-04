//退费申请弹框
<template>
  <el-dialog
    title="退费申请"
    custom-class="dialogStyle1 dialogStyleFlexCol RefundPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
    <!-- 内容 -->
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-if="data">
      <el-form-item label="订单编号:">
        <span>{{data.orderNumber}}</span>
      </el-form-item>
      <el-form-item label="就诊人:">
        <span>{{data.patientName}}</span>
      </el-form-item>
      <el-form-item label="医生:">
        <span>{{data.doctor}}</span>
      </el-form-item>
      <el-form-item label="就诊费用:">
        <span>￥{{data.fee}}</span>
      </el-form-item>
      <el-form-item label="退费原因:" prop="refundReson">
        <el-input type="textarea" resize="none" v-model="form.refundReson"></el-input>
      </el-form-item>
      <el-form-item label="退费金额:" prop="refundFee">
        <el-input type="text" resize="none" v-model="form.refundFee"></el-input>
      </el-form-item>
      <el-form-item class="textCenter" label-width="0">
        <el-button type="primary" @click="onSubmit('form')" class="blue_color_btn">回复</el-button>
        <el-button @click="show=false">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { returnFee } from "@/api/operate";
import { filterObj, concatObj, notify } from "@/utils/index";
import { isNumber } from "@/utils/validate";
export default {
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },
  data() {
    var refundFeeV = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入退费金额"));
      } else {
        if (!isNumber(value)) {
          callback(new Error("请输入正确的退费金额"));
        }
        if (value > this.data.fee) {
          callback(new Error("退费金额必须小于问诊费用"));
        }
        callback();
      }
    };
    return {
      show: false,
      form: {
        refundReson: "",
        refundFee: ""
      },
      rules: {
        refundReson: [{ required: true, message: "请输入退费原因" }],
        refundFee: [{ validator: refundFeeV, required: true }]
      }
    };
  },
  methods: {
    //打开弹框调用
    open() {
      this.$refs.form.resetFields();
    },
    // 退费申请
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确定进行退款申请?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.req();
            })
            .catch(err => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //退费申请请求
    req() {
      let filter = filterObj(this.data, [
        "doctor",
        "fee",
        "orderNumber",
        "patientName"
      ]);
      let obj = concatObj(filter, this.form);
      returnFee(obj).then(res => {
        if (res.status === 0) {
          notify(this, "success", "成功", res.data);
        } else {
          notify(this, "error", "失败", res.data);
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
/deep/ .RefundPopup {
  .textCenter {
    text-align: center;
  }
}
</style>
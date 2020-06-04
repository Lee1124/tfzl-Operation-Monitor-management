//用户弹框内容
<template>
  <el-dialog
    :title="title"
    custom-class="dialogStyle1 BlacklistPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="title+'原因:'" :error="errorText" :required="true">
        <el-input
          type="textarea"
          class="reason"
          resize="none"
          v-model="form.reason"
          :placeholder="placeholderText"
        ></el-input>
      </el-form-item>
      <el-form-item class="textCenter" label-width="0">
        <el-button type="primary" @click="onSubmit('form')" class="blue_color_btn">提交</el-button>
        <el-button @click="show=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      show: false,
      type: 1,
      title: "",
      errorText: "",
      placeholderText: "",
      form: {
        reason: ""
      }
    };
  },
  methods: {
    //打开弹框
    open() {
      this.title = this.type === 1 ? "加入黑名单" : "取消黑名单";
      this.placeholderText =
        this.type === 1 ? "请输入加入黑名单原因" : "请输入取消黑名单原因";
      this.errorText = "";
    },
    onSubmit(formName) {
      if (this.form.reason == "") {
        this.errorText = this.type === 1 ? "请输入加入黑名单原因" : "请输入取消黑名单原因";
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  filters: {
    // dealTime(time) {
    //   return time ? getY_M_D_H_M_S(time) : "";
    // },
    // orderState(val) {
    //   const orderState = store.getters["parameter/inquiry_orderState"];
    //   return findName(orderState, val);
    // }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
/deep/ .BlacklistPopup {
  width: 45%;
  .el-form-item__label {
    width: 130px !important;
  }
  .el-form-item__content {
    margin-left: 130px !important;
    .reason .el-textarea__inner {
      min-height: 200px !important;
    }
  }
  .textCenter {
    text-align: center;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
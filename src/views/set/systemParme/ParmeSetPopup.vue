//系统参数设置弹框
<template>
  <el-dialog
    title="系统参数设置"
    custom-class="dialogStyle1 ParmeSetPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="代码:">
        <el-input v-model="form.code" disabled></el-input>
      </el-form-item>
      <el-form-item label="系统参数名称:">
        <el-input v-model="form.paramName" disabled></el-input>
      </el-form-item>
      <el-form-item label="值类型:">
        <el-input v-model="form.paramType" disabled></el-input>
      </el-form-item>
      <el-form-item label="值:" prop="paramValue">
        <el-input v-model="form.paramValue"></el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="form.remark" disabled></el-input>
      </el-form-item>
      <el-form-item class="textCenter" label-width="0">
        <el-button type="primary" @click="onSubmit('form')" class="blue_color_btn">保存</el-button>
        <el-button @click="show=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import store from "@/store";
import { updateValue } from "@/api/set";
export default {
  data() {
    return {
      show: false,
      form: {
        code: "",
        paramName: "",
        paramType: "",
        paramValue: "",
        remark: ""
      },
      rules: {
        paramValue: [{ required: true, message: "请输入值" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认修改值?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.req();
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 请求
    req() {
      updateValue(this.form).then(res => {
        if (res.status === 0) {
          this.$message({
            message: res.data,
            type: "success"
          });
          this.$parent.init();
        } else this.$message.error(res.msg);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
/deep/ .ParmeSetPopup {
  width: 50%;
  .textCenter {
    text-align: center;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
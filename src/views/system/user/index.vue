<template>
  <div class="changePwd">
    <el-form
      v-if="isStep1"
      :model="step1Form"
      ref="step1Form"
      label-width="100px"
      class="step1Form"
    >
      <el-form-item label="电话号码:" prop="phoneNumber" :error="step1Form.phoneError">
        <el-input v-model="step1Form.phoneNumber" auto-complete="off" placeholder="输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="code" class="code" :error="step1Form.codeError">
        <el-input v-model="step1Form.code" auto-complete="off" placeholder="输入验证码"></el-input>
        <el-button @click.prevent="getCode" :disabled="disabled">{{codeBtnText}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="submitForm1" class="nextStep">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form
      v-if="!isStep1"
      :model="step2Form"
      :rules="rules"
      ref="step2Form"
      label-width="100px"
      class="step2Form"
    >
      <el-form-item v-if="isChange" label="旧密码:" prop="oldPwd">
        <el-input
          v-model="step2Form.oldPwd"
          type="password"
          autocomplete="off"
          :show-password="true"
          placeholder="输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码:" type="password" prop="newPwd">
        <el-input
          v-model="step2Form.newPwd"
          autocomplete="off"
          :show-password="true"
          placeholder="输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" type="password" prop="confrPwd">
        <el-input
          v-model="step2Form.confrPwd"
          autocomplete="off"
          :show-password="true"
          placeholder="输入确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="submitForm2('step2Form')" class="nextStep">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  strIsNull,
  isvalidPhone,
  is6Number,
  is6_20NumberOrLetter
} from "@/utils/validate";
import { clock } from "@/utils/index";
export default {
  name: "",
  components: {},
  created() {},
  data() {
    var oldPwd = (rule, value, callback) => {
      if (!is6_20NumberOrLetter(value)) {
        return callback(new Error("密码为6-20位字母或数字"));
      }
      if (value === this.step2Form.newPwd) {
        this.step2Form.oldPwd = "";
        return callback(new Error("新密码和旧密码不能一样"));
      }
      callback();
    };
    var newPwd = (rule, value, callback) => {
      if (!is6_20NumberOrLetter(value)) {
        return callback(new Error("密码为6-20位字母或数字"));
      }
      if (value === this.step2Form.oldPwd) {
        this.step2Form.newPwd = "";
        return callback(new Error("新密码和旧密码不能一样"));
      }
      callback();
    };
    var confrPwd = (rule, value, callback) => {
      if (!is6_20NumberOrLetter(value)) {
        return callback(new Error("密码为6-20位字母或数字"));
      }
      if (value != this.step2Form.newPwd) {
        return callback(new Error("两次输入的密码不一致"));
      }
      callback();
    };
    return {
      step1Form: {
        phoneNumber: "",
        code: "",
        phoneError: "",
        codeError: ""
      },
      step2Form: {
        oldPwd: "",
        newPwd: "",
        confrPwd: ""
      },
      isChange: true,
      isStep1: true,
      codeBtnText: "获取验证码",
      timeID: 0,
      disabled: false,
      rules: {
        oldPwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { validator: oldPwd, trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: newPwd, trigger: "blur" }
        ],
        confrPwd: [
          { required: true, message: "请输入确认新密码", trigger: "blur" },
          { validator: confrPwd, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //验证手机号码
    phoneVerification() {
      if (strIsNull(this.step1Form.phoneNumber)) {
        this.step1Form.phoneError = "请输入11位的手机号码";
        return false;
      } else if (!isvalidPhone(this.step1Form.phoneNumber)) {
        this.step1Form.phoneError = "请输入正确的手机号";
        return false;
      }
      this.step1Form.phoneError = "";
      return true;
    },
    //获取验证码
    getCode() {
      if (!this.phoneVerification()) return false;
      this.disabled = true;
      this.codeBtnText = "60s后获取";
      clock(
        60,
        1000,
        val => {
          this.codeBtnText = val + "s后获取";
        },
        () => {
          this.codeBtnText = "获取验证码";
          this.disabled = false;
        }
      );
    },

    //下一步
    submitForm1() {
      if (!this.phoneVerification()) return false;
      if (strIsNull(this.step1Form.code)) {
        this.step1Form.codeError = "请输入6位数字验证码";
        return false;
      } else if (!is6Number(this.step1Form.code)) {
        this.step1Form.codeError = "请输入正确的验证码";
        return false;
      }
      this.isStep1 = false;
    },

    //密码处表单
    submitForm2(formName) {
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
  watch: {
    $route: {
      deep: true,
      handler(to) {
        let pageType =
          to.path.indexOf("change") != -1 && to.path.indexOf("user") != -1;
        this.isChange = pageType ? true : false;
        document.title = pageType ? "修改密码" : "忘记密码";
      },
      immediate: true
    }
  }
};
</script>
<style lang='scss' scoped>
.changePwd {
  width: 500px;
  margin: 0 auto;
  margin-top: 140px;
}
/deep/ .code {
  .el-input {
    width: 66%;
  }
  .el-button {
    width: 112px;
    margin-left: 14px;
  }
}
/deep/ .nextStep {
  width: 100%;
}
</style>
//抽取处方
<template>
  <div class="Extract">
    <el-form
      :model="extractForm"
      :rules="rules"
      ref="extractForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="处方日期：" prop="date">
        <el-date-picker
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          v-model="extractForm.date"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="科室：" prop="department">
        <el-select
          v-model="extractForm.department"
          multiple
          placeholder="请选择科室"
          style="width: 100%;"
        >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生：" prop="doctor">
        <el-select v-model="extractForm.doctor" multiple placeholder="请选择医生" style="width: 100%;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="抽取方式：" :error="modeErr">
        <el-col :span="4">
          <el-radio-group v-model="extractForm.mode">
            <el-radio label="1" class="mode_rate_radio">按比例</el-radio>
            <el-radio label="2">按数量</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="20">
          <el-input
            v-model="extractForm.rate"
            placeholder="请输入比例"
            class="mode_input mode_rate_input"
          ></el-input>
          <el-input
            v-model="extractForm.number"
            placeholder="请输入数量"
            class="mode_input mode_num_input"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="抽样方法：">
        <el-radio-group v-model="extractForm.method">
          <el-radio label="随机抽样"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" resize="none" v-model="extractForm.remarks"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center;">
        <el-button type="primary" class="extractBtn" @click="onSubmit('extractForm')">抽取</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        { label: "选项1", value: 0 },
        { label: "选项2", value: 1 },
        { label: "选项3", value: 2 },
        { label: "选项4", value: 3 },
        { label: "选项5", value: 4 },
        { label: "选项6", value: 5 },
        { label: "选项7", value: 6 },
        { label: "选项8", value: 7 },
        { label: "选项9", value: 8 }
      ],
      extractForm: {
        date: "",
        department: "",
        doctor: "",
        mode: "",
        rate: "",
        number: "",
        method: "随机抽样",
        remarks: ""
      },
      modeErr: "",
      maxNum: 10,
      rules: {
        date: [{ required: true, message: "请选择处方日期" }],
        mode: [{ required: true, message: "请选择抽取方式" }]
      }
    };
  },
  methods: {
    mode() {
      if (!this.extractForm.mode) {
        this.modeErr = "请选择抽取方式";
        return false;
      } else if (this.extractForm.mode == 1 && this.extractForm.rate == "") {
        this.modeErr = "请输入大于0的比例";
        return false;
      } else if (this.extractForm.mode == 2 && this.extractForm.number == "") {
        this.modeErr = "请输入大于0的数量";
        return false;
      } else if (
        this.extractForm.mode == 2 &&
        this.extractForm.number > this.maxNum
      ) {
        this.modeErr = "可抽取的处方数不足";
        return false;
      }
      return true;
    },
    onSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!this.mode()) return false;
        if (valid) {
          this.$parent.changeStep(1);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    extractForm: {
      deep: true,
      handler(obj) {
        if (obj.mode != "") {
          this.modeErr = "";
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.Extract {
  width: 50%;
  margin: 50px auto 0;
}
.mode_rate_radio {
  margin: 12px 0 36px;
}
.mode_rate_input {
  margin-bottom: 12px;
}
.mode_input {
  position: relative;
}
.mode_input::after {
  content: "";
  position: absolute;
  right: 10px;
}
.mode_rate_input::after {
  content: "%";
}
.mode_num_input::after {
  content: "张";
}
.extractBtn {
  width: 200px;
}
</style>
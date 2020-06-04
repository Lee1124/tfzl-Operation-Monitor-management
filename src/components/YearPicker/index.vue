//时间选择器
<template>
  <div class="DatePicker marginTopBt8 positionRelative">
    <span class="btn-label" v-if="showLabel">{{labelText}}：</span>
    <div class="btn-box btn-box-daterang btn-box-year">
      <el-date-picker
        v-model="value1"
        type="year"
        :placeholder="placeholderText"
        :value-format="valueFormat"
        :clearable="clearable"
        :editable="editable"
        @change="changeYear1"
      ></el-date-picker>
      <span>-</span>
      <el-date-picker
        v-model="value2"
        type="year"
        :placeholder="placeholderText"
        :value-format="valueFormat"
        :clearable="clearable"
        :editable="editable"
        @change="changeYear2"
      ></el-date-picker>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "DatePicker",
  props: {
    //是否显示label
    showLabel: {
      type: Boolean,
      default: true
    },
    //label文字
    labelText: {
      type: String,
      default: "label"
    },
    //时间类型
    type: {
      type: String,
      default: "date"
    },
    //date时间选择器的提示文字
    placeholderText: {
      type: String,
      default: "选择年"
    },
    //范围时间选择的开始时间的占位符
    startPlaceholderText: {
      type: String,
      default: "开始时间"
    },
    //范围时间选择的结束时间的占位符
    endPlaceholderText: {
      type: String,
      default: "结束时间"
    },
    //返回时间格式
    valueFormat: {
      type: String,
      default: "yyyy"
    },
    //是否可以清除
    clearable: {
      type: Boolean,
      default: false
    },
    //是否可以输入文本
    editable: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initValue();
    // });

  },
  data() {
    return {
      value1: "",
      value2: ""
    };
  },
  methods: {
    initValue() {
      return new Promise((resolve, reject) => {
        let now = new Date();
        let nowYear = now.getFullYear();
        this.value2 = String(nowYear);
        this.value1 = String(parseInt(this.value2) - 5);
        resolve(this.getTime());
      });
    },
    getTime() {
      let time1 = this.value1 + "-01-01";
      let time2 = this.value2 + "-01-01";
      return [time1, time2];
    },
    correctTime() {
      if (parseInt(this.value1) > parseInt(this.value2)) {
        this.value1 = this.value2;
      }
    },
    changeYear1(val) {
      if (!this.value2) this.value2 = String(parseInt(val) + 5);
      this.correctTime();
      this.$emit("change", this.getTime());
    },
    changeYear2(val) {
      if (!this.value1) this.value1 = String(parseInt(val) - 5);
      this.correctTime();
      this.$emit("change", this.getTime());
    }
  }
};
</script>
<style lang='scss' scoped>
.DatePicker {
  display: inline-block;
  /deep/ .el-input__inner {
    height: 36px;
    line-height: 36px;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 10px;
  }
  /deep/ .el-input__icon {
    font-size: 16px;
    line-height: 34px;
  }
  .btn-box-year {
    width: 210px;
    .el-date-editor {
      width: 48.4%;
    }
  }
}
</style>
//搜索框
<template>
  <div class="MyInput marginTopBt8 clearfix">
    <span :class="['btn-label','btn-label-align'+alignNum]" v-if="showLabel">{{labelText}}：</span>
    <div class="btn-box">
      <el-input
        v-model="value"
        :clearable="clearable"
        :disabled="disabled"
        :placeholder="placeholderText"
        @change="valueChange"
      ></el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyInput",
  props: {
    //和几个字对齐
    alignNum: {
      type: Number,
      default: 0
    },
    //是否显示label
    showLabel: {
      type: Boolean,
      default: true
    },
    //label文字
    labelText: {
      type: String,
      default: "label22"
    },
    //占位符
    placeholderText: {
      type: String,
      default: "请输入"
    },
    //是否可以清除
    clearable: {
      type: Boolean,
      default: true
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      value: ""
    };
  },
  methods: {
    valueChange() {
      this.$emit("change", this.value);
    },
  },
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/btn.scss";
/deep/ .el-input__inner {
  height: 36px;
  line-height: 36px;
}
/deep/ .el-input__suffix {
  height: 36px;
  line-height: 36px;
  margin-top: -2px;
}
</style>
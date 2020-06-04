//单选-选择器
<template>
  <div class="selectOne marginTopBt8 clearfix">
    <span :class="['btn-label','btn-label-align'+alignNum]" v-if="showLabel">{{labelText}}：</span>
    <div class="btn-box">
      <el-select
        v-model="value"
        :disabled="isDisabled"
        :clearable="clearableContent"
        :placeholder="placeholderText"
        popper-class="select-option"
        @change="changeOption"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectOne",
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
      default: "label"
    },
    //提示文字
    placeholderText: {
      type: String,
      default: "请选择"
    },
    //是否可清楚内容
    clearableContent: {
      type: Boolean,
      default: true
    },
    //是否禁用
    isDisabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => [] //数组／对象的默认值应当由一个工厂函数返回
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    changeOption() {
      this.$emit("change", this.value);
    }
  },
  watch: {
    // value(val) {//if (val === "")
      //  this.$emit("change", this.value);
    // }
  }
};
</script>

<style lang='scss'>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/btn.scss";
.selectOne .el-select {
  width: 100%;
}
.selectOne .el-select .el-input.is-focus .el-input__inner {
  border-color: $blue;
}
.selectOne .el-select .el-input__inner:focus {
  border-color: $blue;
}
.select-option .el-select-dropdown__item.selected {
  color: $blue;
}
.selectOne .el-input__inner {
  height: 36px;
  line-height: 36px;
}
.selectOne .el-input__icon {
  line-height: 36px;
}
</style>
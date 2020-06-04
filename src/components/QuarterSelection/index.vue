//季度选择器
<template>
  <div class="marginTopBt8">
    <span class="btn-label" v-if="showLabel">{{labelText}}：</span>
    <mark
      style="position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;"
      v-show="showSeason"
      @click.stop="showSeason=false"
    ></mark>
    <el-input
      class="time_input"
      placeholder="请选择季度"
      v-model="showValue"
      :clearable="true"
      readonly
      @focus="showSeason=true"
    >
      <i slot="prefix" class="el-input__icon el-icon-date"></i>
      <!-- <i
        slot="suffix"
        @click.stop="clear"
        class="el-input__icon el-icon-date el-icon-circle-close celarBtn pointer"
      ></i>-->
    </el-input>
    <el-card
      class="box-card"
      style="width:322px;padding: 0 3px 20px;margin-top:10px;position:fixed;z-index:9999"
      v-show="showSeason"
    >
      <div slot="header" class="clearfix" style="text-align:center;padding:0">
        <button
          type="button"
          aria-label="前一年"
          class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
          @click="prev"
        ></button>
        <span role="button" class="el-date-picker__header-label">{{year}}年</span>
        <button
          type="button"
          aria-label="后一年"
          @click="next"
          class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
        ></button>
      </div>
      <div class="text item" style="text-align:center;">
        <el-button
          type="text"
          size="medium"
          style="width:40%;color: #606266;float:left;"
          @click="selectSeason(0)"
        >第一季度</el-button>
        <el-button
          type="text"
          size="medium"
          style="float:right;width:40%;color: #606266;"
          @click="selectSeason(1)"
        >第二季度</el-button>
      </div>
      <div class="text item" style="text-align:center;">
        <el-button
          type="text"
          size="medium"
          style="width:40%;color: #606266;float:left;"
          @click="selectSeason(2)"
        >第三季度</el-button>
        <el-button
          type="text"
          size="medium"
          style="float:right;width:40%;color: #606266;"
          @click="selectSeason(3)"
        >第四季度</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
/**
 * @file:  View 组件 季节选择控件
 * @author: v_zhuchun
 * @date: 2019-05-23
 * @description: UI组件  可选择季节
 * @api: valueArr : 季度value defalut['01-03', '04-06', '07-09', '10-12'] 默认值待设置
 */
export default {
  props: {
    valueArr: {
      default: () => {
        return ["01-03", "04-06", "07-09", "10-12"];
      },
      type: Array
    },
    getValue: {
      default: () => {},
      type: Function
    },
    // defaultValue: {
    //   default: "",
    //   type: String
    // },
    //是否显示label
    showLabel: {
      type: Boolean,
      default: true
    },
    //label文字
    labelText: {
      type: String,
      default: "label"
    }
  },
  data() {
    return {
      showSeason: false,
      season: "",
      year: new Date().getFullYear(),
      showValue: "",
      showCelarBtn: false
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initValue();
    // });
  },
  methods: {
    initValue() {
      return new Promise((reslove, reject) => {
        let now = new Date();
        let defaultTime =
          now.getFullYear() + "0101-" + now.getFullYear() + "0303";
        this.defaultValue = defaultTime;
        let value = this.defaultValue;
        let arr = value.split("-");
        this.year = arr[0].slice(0, 4);
        let str = arr[0].slice(4, 6) + "-" + arr[1].slice(4, 6);
        let arrAll = this.valueArr;
        this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`;
        reslove(this.getTime(this.season - 1 > 0 ? this.season - 1 : 0));
      });
    },
    clear() {
      this.showValue = "";
      this.$emit("change", null);
    },
    one() {
      this.showSeason = false;
    },
    prev() {
      this.year = this.year * 1 - 1;
    },
    next() {
      this.year = this.year * 1 + 1;
    },
    getTime(i) {
      let that = this;
      that.season = i + 1;
      let arr = that.valueArr[i].split("-");
      that.getValue(that.year + arr[0] + "-" + that.year + arr[1]);
      that.showSeason = false;
      this.showValue = `${this.year}年${this.season}季度`;
      let returnArr = [
        that.year + "-" + arr[0] + "-01",
        that.year + "-" + arr[1] + "-01"
      ];
      return returnArr;
    },
    selectSeason(i) {
      // let that = this;
      // that.season = i + 1;
      // let arr = that.valueArr[i].split("-");
      // that.getValue(that.year + arr[0] + "-" + that.year + arr[1]);
      // that.showSeason = false;
      // this.showValue = `${this.year}年${this.season}季度`;
      // let returnArr = [
      //   that.year + "-" + arr[0] + "-01",
      //   that.year + "-" + arr[1] + "-01"
      // ];
      this.$emit("change", this.getTime(i));
    }
  }
};
</script>

<style lang="scss" scoped>
.time_input {
  width: 210px;
  height: 36px;
  /deep/ .el-input__inner {
    height: 100%;
  }
  // &:hover {
  //   .celarBtn {
  //     display: block;
  //   }
  // }
  /deep/ .el-input__icon {
    line-height: 36px;
  }

  .celarBtn {
    display: none;
  }
}
</style>
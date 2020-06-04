//时间选择器
<template>
  <div class="DatePicker marginTopBt8 positionRelative">
    <span class="btn-label" v-if="showLabel">{{labelText}}：</span>
    <div :class="['btn-box btn-box-daterang',{'btn-box2':type==='daterange'||type==='monthrange'}]">
      <div class="date" v-if="type==='date'||type==='year'">
        <el-date-picker
          v-model="value"
          :type="type"
          :placeholder="placeholderText"
          :value-format="valueFormat"
          :clearable="clearable"
          :editable="editable"
          @change="changeDate"
        ></el-date-picker>
      </div>
      <div class="daterange" v-if="type==='daterange'||type==='monthrange'">
        <el-date-picker
          v-model="value"
          :type="type"
          :clearable="clearable"
          range-separator="至"
          :start-placeholder="startPlaceholderText"
          :end-placeholder="endPlaceholderText"
          :value-format="valueFormat"
          :editable="editable"
          @change="changeDate"
        ></el-date-picker>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { timeFrame } from "@/utils/index";
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
      default: "选择时间"
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
      default: "yyyy-MM-dd"
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
  data() {
    return {
      value: ""
    };
  },
  methods: {
    changeDate(val) {
      this.$emit("change", val);
    },
    /**
     * @param type 类型
     * @param defaultTime 默认时间
     * @param callback 回调函数
     */
    initValue(defaultTime) {
      return new Promise((resolve, reject) => {
        this.value =
          defaultTime == null
            ? ""
            : defaultTime
            ? defaultTime
            : timeFrame(store.getters["parameter/defaultTimeRegion"]);
        if (this.type == "monthrange") {
          let startTime = this.value[0].split("-");
          let endTime = this.value[1].split("-");
          startTime = startTime[0] + "-" + startTime[1] + "-01";
          endTime = endTime[0] + "-" + endTime[1] + "-01";
          this.value = [startTime, endTime];
        }
        resolve(this.value);
      });
      // this.changeDate(this.value);
    }
  },
  watch: {
    type(val) {
      // console.log("dateval", val);
      // this.initValue(val);
    }
  }
};
</script>
<style lang='scss' scoped>
.DatePicker {
  display: inline-block;
  .date {
    width: 200px;
  }
  .daterange {
    width: 230px;
  }
  .el-date-editor {
    width: 100%;
  }
  /deep/ .el-input__inner {
    height: 36px;
    line-height: 36px;
    padding-top: 0;
    padding-bottom: 0;
  }
  /deep/ .el-input__icon {
    font-size: 16px;
    line-height: 34px;
  }
  .btn-box2 {
    width: 250px;
  }

  .btn-box-daterang {
    width: 208px;
  }
}
</style>
//在线问诊订单统计tabs切换内容
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="在线问诊订单分布统计" name="first">
      <table-statistics ref="first" />
    </el-tab-pane>
    <el-tab-pane label="在线问诊订单趋势分析" name="second">
      <echart-analysis ref="second" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import tableStatistics from "./Table";
import echartAnalysis from "./Echart";
import store from "@/store";
export default {
  components: { tableStatistics, echartAnalysis },
  data() {
    return {
      activeName: "first",
    };
  },
  activated() {
    this.activeName='first';
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "first") {
        this.$refs.first.init();
      } else if (tab.name === "second") {
        this.$refs.second.initData();
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/tabs.scss";
</style>
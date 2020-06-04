//护理服务订单统计tabs切换内容
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="护理服务订单分布统计" name="first">
      <table-statistics ref="first" />
    </el-tab-pane>
    <el-tab-pane label="护理服务订单趋势分析" name="second">
      <echart-analysis ref="second" />
    </el-tab-pane>
    <el-tab-pane label="护理服务分布统计" name="three">
      <echart-spread ref="three" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import tableStatistics from "./Table";
import echartAnalysis from "./Echart1";
import echartSpread from "./Echart2";
import store from "@/store";
export default {
  components: { tableStatistics, echartAnalysis, echartSpread },
  data() {
    return {
      activeName: "first"
    };
  },
  created() {
    // this.showTab();
  },
  methods: {
    // showTab(){
    //   let id=this.$route.query.id;
    //   this.activeName=id===2?'second':'first';
    // },
    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.name === "first") {
        this.$refs.first.init();
      } else if (tab.name === "second") {
        this.$refs.second.initData();
      } else if (tab.name === "three") {
        this.$refs.three.initData();
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/tabs.scss";
</style>
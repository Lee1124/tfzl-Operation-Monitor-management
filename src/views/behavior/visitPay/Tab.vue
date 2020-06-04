//在线问诊订单统计tabs切换内容
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="次均就诊费用汇总统计" name="first">
      <Table />
    </el-tab-pane>
    <el-tab-pane label="次均就诊费用趋势分析" name="second">
      <Echart v-if="show2" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import Table from "./Table";
import Echart from "./Echart";
export default {
  components: { Table, Echart },
  data() {
    return {
      activeName: "first",
      show2:false
    };
  },
  created(){
    // this.showTab();
  },
  methods: {
    // showTab(){
    //   let id=this.$route.query.id;
    //   this.activeName=id===2?'second':'first';
    // },
    handleClick(tab, event) {
      // console.log(tab, event);
      this.show2=tab.name==='second'?true:false;
    }
  }

};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/tabs.scss";
</style>
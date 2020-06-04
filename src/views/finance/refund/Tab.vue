//退款申请tabs切换内容
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="未审核" name="first">
      <not-examine ref="first" />
    </el-tab-pane>
    <el-tab-pane label="已审核" name="second">
      <yes-examine ref="second" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import notExamine from "./NotExamine";
import yesExamine from "./YesExamine";
export default {
  components: { notExamine, yesExamine },
  data() {
    return {
      activeName: "first"
    };
  },
  activated() {
    this.activeName = "first";
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.name) {
        case "first":
          this.$refs.first.init();
          break;
        case "second":
          this.$refs.second.init();
          break;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/tabs.scss";
</style>
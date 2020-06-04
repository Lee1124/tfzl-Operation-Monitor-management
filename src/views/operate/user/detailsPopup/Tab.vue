//用户详情tabs切换内容
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个人信息" name="first">
      <div class="tab-content-view">
        <information ref="first" @close="close" />
      </div>
    </el-tab-pane>
    <el-tab-pane label="点击就诊卡" name="second">
      <div class="tab-content-view">
        <visitCard ref="second" />
      </div>
    </el-tab-pane>
    <el-tab-pane label="地址" name="three">
      <div class="tab-content-view">
        <user-address ref="three" />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import information from "./tab_information";
import visitCard from "./tab_visitCard";
import userAddress from "./tab_address";
import store from "@/store";
export default {
  components: { information, visitCard, userAddress },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.name === "first") {
        // this.$refs.first.init();
      } else if (tab.name === "second") {
        this.$refs.second.init();
      } else if (tab.name === "three") {
        this.$refs.three.init();
      }
    },
    close() {
      this.$parent.$parent.show = false;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/tabs.scss";
.tab-content-view {
  min-height: 600px;
}
</style>
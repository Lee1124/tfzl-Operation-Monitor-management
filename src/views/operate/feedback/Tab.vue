//用户反馈切换tabs切换内容
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="未回复" name="first">
      <reply ref="first" :isReply="isReply" />
    </el-tab-pane>
    <el-tab-pane label="已回复" name="second">
      <reply ref="second" :isReply="isReply" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import reply from "./Reply";
import store from "@/store";
export default {
  components: { reply },
  data() {
    return {
      activeName: "first",
      isReply: false
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "first") {
        this.isReply = false;
      } else if (tab.name === "second") {
        this.isReply = true;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/tabs.scss";
</style>
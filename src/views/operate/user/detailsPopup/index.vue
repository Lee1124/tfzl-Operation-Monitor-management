//用户弹框内容
<template>
  <el-dialog
    title="用户详情"
    custom-class="dialogStyle1 userDetailsPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
  <!-- tabs选择 -->
  <tab ref="tabs"/>
  </el-dialog>
</template>
<script>
import tab from "./Tab";
import store from "@/store";
export default {
  components:{tab},
  data() {
    return {
      show: false,
    };
  },
  methods: {
    //打开弹框
    open() {
      this.$refs.tabs.activeName='first';
    },
  },
  filters: {
    // dealTime(time) {
    //   return time ? getY_M_D_H_M_S(time) : "";
    // },
    // orderState(val) {
    //   const orderState = store.getters["parameter/inquiry_orderState"];
    //   return findName(orderState, val);
    // }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
// @import "~@/assets/styles/page.scss";
/deep/ .userDetailsPopup {
  width: 70%;
  .el-image {
    margin-right: 10px;
  }
  .inline-item {
    display: inline-block;
  }
  .textCenter {
    text-align: center;
  }
}
</style>
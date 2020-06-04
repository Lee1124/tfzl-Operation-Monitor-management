//退款申请
<template>
  <div class="refundReq tab-page" style="width:100%;height:100%;">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <!-- tabs切换栏 -->
    <tab />
  </div>
</template>
<script>
import tab from "./Tab";
export default {
  components: {tab},
  computed: {
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  },
};
</script>
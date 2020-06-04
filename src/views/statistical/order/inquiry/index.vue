//在线问诊订单统计
<template>
  <div class="inquiryOrder tab-page">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <!-- tabs切换栏 -->
    <tab />
  </div>
</template>
<script>
import tab from "./Tab";
export default {
  name: "inquiryOrder",
  components: { tab },
  computed: {
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  }
};
</script>

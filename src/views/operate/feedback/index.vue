//用户反馈
<template>
  <div class="operate-feedback tab-page">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <!-- tabs切换栏 -->
    <tab />
  </div>
</template>
<script>
import tab from "./Tab";
export default {
  components: { tab },
  computed: {
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  }
};
</script>
//在线问诊表格统计

<template>
  <div class="nurseOrder tab-page">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <!-- tabs切换栏 -->
    <tab />
  </div>
</template>
<script>
import tab from "./Tab";
export default {
  name: "nurseOrder",
  components: {tab},
  computed: {
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  },
};
</script>

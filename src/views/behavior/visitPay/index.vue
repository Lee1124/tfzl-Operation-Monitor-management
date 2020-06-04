//次均就诊费用
<template>
  <div class="visitPay tab-page">
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
  data() {
    return {};
  },
  computed: {
    breadcrumbData() {
      return [{ name: this.$route.meta.title }];
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
</style>
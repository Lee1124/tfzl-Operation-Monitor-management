//检查
<template>
  <div class="test">
    <!-- 标题1 -->
    <title-view text="基本信息" />
    <!-- 基本信息 -->
    <table class="table-content" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td>检查申请单号：</td>
          <td class="value">111</td>
          <td>状态：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>检查项目：</td>
          <td class="value">111</td>
          <td>检查费用：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>执行科室：</td>
          <td class="value">111</td>
          <td>开单医生：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>开单日期：</td>
          <td class="value">111</td>
        </tr>
      </tbody>
    </table>
    <!-- 标题2 -->
    <title-view text="其它信息" />
    <!-- 基本信息 -->
    <table class="table-content" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td>预约检查日期：</td>
          <td class="value">111</td>
          <td>检查日期：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>报告日期：</td>
          <td class="value">111</td>
          <td>支付方式：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>支付时间：</td>
          <td class="value">111</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
</style>
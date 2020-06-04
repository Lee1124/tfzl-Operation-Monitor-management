//第二次服务
<template>
  <div class="test">
    <!-- 标题1 -->
    <title-view text="基本信息" />
    <!-- 基本信息 -->
    <table class="table-content" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td>上门护士：</td>
          <td class="value">111</td>
          <td>状态：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>出发时间：</td>
          <td class="value">111</td>
          <td>到达时间：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>结束时间：</td>
          <td class="value">111</td>
          <td>本次服务项目：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>下次预约上门时间：</td>
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
          <td>临时服务项目：</td>
          <td class="value">111</td>
          <td>临时项目服务费用：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>支付方式：</td>
          <td class="value">111</td>
          <td>支付时间：</td>
          <td class="value">222</td>
        </tr>
        <tr>
          <td>器材/耗材费用：</td>
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
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
</style>
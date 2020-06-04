//详情弹框内容
<template>
  <el-dialog
    title="订单详情"
    custom-class="dialogStyle1 dialogStyleFlexCol operate-order-detailsPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
  >
    <!-- 内容 -->
    <div class="content" style="height:100%;">
      <div class="content_left">
        <!-- 头像 -->
        <div class="head_view">
          <img class="headImg" :src="$store.getters['resources/defaultHead']" alt="头像" />
          <p class="name">张三</p>
        </div>
        <!-- 列表内容 -->
        <ul class="list">
          <li>订单编号：D510104001201812040003</li>
          <li>服务对象：张三 男 56岁</li>
          <li>服务地址：四川省成都市天府软件园C-11</li>
          <li>状态：服务中</li>
          <li>
            上门超时：
            <span style="color:#ff3939;">150分钟</span>
          </li>
          <li>医院：言行医至互联网医院</li>
          <li>上门护士：唐林</li>
          <li>服务项目：输液</li>
          <li>服务次数：第1次/共2次</li>
          <li>服务费用：￥30</li>
        </ul>
      </div>
      <div class="content_right">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="第一次服务" name="first">
            <d-first />
          </el-tab-pane>
          <el-tab-pane label="第二次服务" name="second">
            <d-second />
          </el-tab-pane>
          <el-tab-pane label="评价" name="five">
            <d-evaluate />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="refundReq">退费申请</el-button>
      <el-button @click="inquiryWarn">问诊提醒</el-button>
      <el-button @click="show = false">关 闭</el-button>
    </div>
    <!-- 退费申请 -->
    <refund-popup ref="refundPopup" />
    <!-- 提醒dialog -->
    <send-popup ref="remind" :sendData="sendData" :isMore="isMore" />
  </el-dialog>
</template>
<script>
import initData from "@/mixins/req.js";
import { doPrint } from "@/utils/index";
import dFirst from "./d_first";
import dSecond from "./d_second";
import dEvaluate from "./d_evaluate";
import refundPopup from "@/views/components/RefundPopup";
import sendPopup from "@/views/components/SendPopup";
export default {
  mixins: [initData],
  components: { dFirst, dSecond, dEvaluate, refundPopup, sendPopup },
  data() {
    return {
      sendData: [],
      isMore: false,
      show: false,
      form: {
        remindPerson: "小哈子",
        remindContent: ""
      },
      activeName: "first"
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 问诊提醒
    inquiryWarn() {
      this.isMore = false;
      this.$refs.remind.show = true;
    },
    // 退费申请
    refundReq() {
      this.$refs.refundPopup.show = true;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
</style>
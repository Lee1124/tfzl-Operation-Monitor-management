//详情弹框内容
<template>
  <el-dialog
    title="订单详情"
    custom-class="dialogStyle1 dialogStyleFlexCol operate-order-detailsPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
    <!-- 内容 -->
    <div class="content" style="height:100%;" v-if="rowData">
      <div class="content_left">
        <!-- 头像 -->
        <div class="head_view">
          <img class="headImg" :src="$store.getters['resources/defaultHead']" alt="头像" />
          <p class="name">张三</p>
        </div>
        <!-- 列表内容 -->
        <ul class="list">
          <li>订单编号：{{rowData.orderNumber}}</li>
          <li>就诊人：{{rowData.patientName}}&nbsp;{{rowData.patientSex}}&nbsp;{{rowData.patientAge}}岁</li>
          <li>提交人：{{rowData.submitMan}}（{{rowData.phoneNumber}}）</li>
          <li>医院：{{rowData.hospitalArea}}</li>
          <li>科室：{{rowData.hospitalDept}}</li>
          <li>医生：{{rowData.doctor}}</li>
          <li>状态：{{rowData.state| orderState}}</li>
          <li>接诊超时时长：{{rowData.accTimeout}}</li>
          <li>问诊费用：￥{{rowData.fee}}</li>
        </ul>
      </div>
      <div class="content_right">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="问诊单" name="first">
            <d-first :data="rowData" />
          </el-tab-pane>
          <el-tab-pane label="检验" name="second">
            <d-second />
          </el-tab-pane>
          <el-tab-pane label="检查" name="third">
            <d-third />
          </el-tab-pane>
          <el-tab-pane label="处方" name="fourth">
            <d-fourth />
          </el-tab-pane>
          <el-tab-pane label="评价" name="five">
            <d-evaluate :data="rowData" ref="valuate" />
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
    <refund-popup ref="refundPopup" :data='rowData' />
    <!-- 提醒dialog -->
    <send-popup ref="remind" :sendData="send(rowData)" :isMore="isMore" />
  </el-dialog>
</template>
<script>
import store from "@/store";
import { findName } from "@/utils/index";
import dFirst from "./d_first";
import dSecond from "./d_second";
import dThird from "./d_third";
import dFourth from "./d_fourth";
import dEvaluate from "./d_evaluate";
import refundPopup from "@/views/components/RefundPopup";
import sendPopup from "@/views/components/SendPopup";
export default {
  components: {
    dFirst,
    dSecond,
    dThird,
    dFourth,
    dEvaluate,
    refundPopup,
    sendPopup
  },
  data() {
    return {
      rowData: {},
      isMore: false,
      show: false,
      form: {
        remindPerson: "小哈子",
        remindContent: ""
      },
      activeName: "first"
    };
  },
  methods: {
    open() {
      this.activeName = "first";
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      this.$nextTick(() => {
        switch (tab.name) {
          case "five":
            this.$refs.valuate.init();
            break;
        }
      });
    },
    send(data) {
      return [data];
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
  },
  filters: {
    //订单状态
    orderState(val) {
      const orderState = store.getters["parameter/inquiry_orderState"];
      return findName(orderState, val);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
</style>
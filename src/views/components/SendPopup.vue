//提醒弹窗
<template>
  <el-dialog
    title="提示"
    custom-class="dialogStyle1 remindDialog"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
    <div class="content_send">
      <el-form ref="form" label-width="0.6rem">
        <el-form-item label="提醒对象:">
          <template v-for="(item,index) in sendData">
            <span :key="index">
              {{item.doctorName}}
              <span v-if="index<sendData.length-1">、</span>
            </span>
          </template>
        </el-form-item>
        <el-form-item label="提醒内容:">
          <template v-for="(item,index) in sendData">
            <span :key="index">
              <span v-if="isMore">{{item.doctorName}}:</span>
              <el-input type="textarea" resize="none" v-model="item.remindContent"></el-input>
            </span>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="success" @click.stop="sendMsg">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="content_record_title" v-if="!isMore">历史处理</p>
    <div class="content_record" v-if="!isMore">
      <el-table
        header-row-class-name="table-header-style"
        :row-class-name="tableRowStyle"
        height="100%"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="dealTime" label="处理时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.handleTime | dealTime}}</template>
        </el-table-column>
        <el-table-column prop="dealType" label="处理内容" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.remindContent}}</template>
        </el-table-column>
        <el-table-column prop="handleUser" label="处理人" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>
import { remind, moreRemind } from "@/api/abnormal.js";
import { Notification, MessageBox } from "element-ui";
import { deepClone, getY_M_D_H_M_S, filterItem } from "@/utils/index";
import initData from "@/mixins/req.js";
import store from "@/store";
export default {
  mixins: [initData],
  props: {
    sendData: {
      type: Array,
      default: () => []
    },
    isMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      rowData: null
    };
  },
  filters: {
    dealTime(time) {
      return time ? getY_M_D_H_M_S(time) : "";
    }
  },
  methods: {
    //打开时候调用
    open() {
      this.dealData();
      if (!this.isMore) {
        this.rowData = this.sendData.length > 0 ? this.sendData[0] : {};
        // console.log('this.rowData',this.rowData)
        this.init();
      }
    },
    //处理数据
    dealData() {
      let eventTypes = store.getters["parameter/inquiry_eventTypes"];
      this.sendData.forEach(item => {
        let errName = filterItem(eventTypes, item.eventType)
          ? filterItem(eventTypes, item.eventType).label
          : "";
        item.remindContent =
          item.doctorName +
          "医生,您有" +
          errName +
          "的订单（" +
          item.orderNumber +
          "）,请及时处理,以免影响您的信用，谢谢。";
      });
    },
    //加载前设置基础参数
    beforeInit() {
      this.url = "api/abnormal/history";
      this.searchParams = {
        ...this.rowData
      };
      return true;
    },
    //发送
    sendMsg() {
      MessageBox.confirm("确认发送提醒内容?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          if (this.isMore) {
            moreRemind(deepClone(this.sendData)).then(res => {
              if (res.status === 0) {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.$parent.init();
              } else this.$message.error(res.msg);
            });
          } else {
            remind(this.rowData).then(res => {
              if (res.status === 0) {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.init();
                this.$parent.init();
              } else this.$message.error(res.msg);
            });
          }
        })
        .catch(err => {});
    },
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
@import "~@/assets/styles/table.scss";
.remindDialog {
  width: 750px;
}
.content_record {
  height: 250px;
}
</style>
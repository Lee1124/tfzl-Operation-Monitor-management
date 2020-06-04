//回复列表
<template>
  <div class="Reply" style="height:100%;">
    <div class="tab-scroll-container scrollbarStyle2">
      <div class="search-view">
        <!-- 查询 -->
        <div class="search-filter">
          <date-picker class="search-btn" labelText="提交日期" type="daterange" ref="timeSelect" />
          <my-input class="search-btn" :alignNum="3" labelText="手机号" />
        </div>
        <!-- 查询按钮 -->
        <div class="search-handle-view">
          <el-button size="medium" type="success">查询</el-button>
          <el-button size="medium">重置</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-table
        :data="tableData"
        header-row-class-name="table-header-style"
        :row-class-name="tableRowStyle"
        style="width: 100%"
        @row-dblclick="rowDBClick"
      >
        <el-table-column prop="type" label="提交日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" v-if="isReply" label="回复人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" v-if="isReply" label="回复时间" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <table-pagination
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @changeSize="changeSize"
      @changePage="changePage"
      class="table-pagination"
    />

    <!-- 退款审批弹窗 -->
    <reply-popup ref="replyPopup" />
  </div>
</template>
<script>
import initData from "@/mixins/req";
import replyPopup from "./ReplyPopup";
export default {
  props: {
    isReply: {
      type: Boolean,
      default: false
    }
  },
  mixins: [initData],
  components: { replyPopup },
  data() {
    return {
      options: [{ label: "选项一", value: 0 }],
      tableData: [
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 }
      ]
    };
  },
  mounted() {
    // console.log(this.tableData);
  },
  methods: {
    //双击行
    rowDBClick(row) {
      if (!this.isReply) {
        this.$refs.replyPopup.show = true;
      }
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
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
</style>
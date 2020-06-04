//审核详情页面
<template>
  <div class="examineDetails">
    <!-- 面包屑 -->
    <breadcrumb :data="breadcrumbData" />
    <!-- 返回 -->
    <el-button size="mini" type="success" @click.stop="back" class="returnBtn">返回</el-button>
    <div class="pc-content">
      <div class="pc-content-container scrollbarStyle2">
        <div class="search-view">
          <!-- 查询 -->
          <div class="search-filter">
            <my-input class="search-btn" labelText="处方编号" />
            <select-one class="search-btn" :alignNum="4" labelText="科室" :options="options" />
            <select-one class="search-btn" :alignNum="4" labelText="医生" :options="options" />
            <select-one class="search-btn" labelText="是否合理" :options="options" />
          </div>
          <!-- 查询按钮 -->
          <div class="search-handle-view">
            <el-button size="medium" type="success">查询</el-button>
            <el-button size="medium">重置</el-button>
            <el-button size="medium" type="success" @click.stop="reviewEnd">审核完成</el-button>
          </div>
        </div>
        <!-- 表格渲染 -->
        <el-table
          :data="tableData"
          header-row-class-name="table-header-style"
          :row-class-name="tableRowStyle"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="willPay" label="处方日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="处方编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="年龄(岁)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="诊断" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="服务满意度" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="药品品种" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="抗菌药(0/1)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="注射剂(0/1)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="国家基本药物品种数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="药品通用名数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="处方金额(元)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="处方医师" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="科室" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="审核、调配药师" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="核对、发药药师" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="是否合理(0/1)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="存在问题" show-overflow-tooltip></el-table-column>
          <el-table-column prop="willPay" label="审核人" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template>
              <span class="handleBtnHover" @click.stop="openDetails">点击详情</span>
            </template>
          </el-table-column>
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
    </div>
    <!-- 点评详情 -->
    <comment-details ref="commentDetails" />
  </div>
</template>
<script>
import commentDetails from "../comment/commentDetailsPopup";
import initData from "@/mixins/req";
export default {
  name: "examineDetails",
  mixins: [initData],
  components: { commentDetails },
  data() {
    return {
      options: [
        { label: "哈哈哈1", value: 0 },
        { label: "哈哈哈2", value: 1 }
      ],
      tableData: [
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "皮肤科",
          willPay: 100,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  computed: {
    breadcrumbData() {
      return [{ name: "处方抽查" }];
    }
  },
  mounted() {},
  methods: {
    //审核完成
    reviewEnd() {
      this.$confirm("确认已审核完成?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    //审核详情
    openDetails() {
      this.$refs.commentDetails.show = true;
      this.$refs.commentDetails.type = 2;
      this.$refs.commentDetails.title = "处方点评详情";
    },
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    },
    //返回
    back() {
      this.$parent.showDetails = false;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/table.scss";
@import "~@/assets/styles/page.scss";
.examineDetails {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  background: #fff;
  right: 0;
  bottom: 0;
}
/deep/ .returnBtn {
  position: absolute;
  right: 30px;
  top: 14px;
}
</style>
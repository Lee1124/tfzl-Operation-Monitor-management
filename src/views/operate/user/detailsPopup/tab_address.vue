//住址
<template>
  <div class="usersAddress">
    <!-- 表格渲染 -->
    <el-table
      header-row-class-name="table-header-style"
      :row-class-name="tableRowStyle"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" :disabled="!scope.row.isEdit"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="手机号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" :disabled="!scope.row.isEdit"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="详细地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" :disabled="!scope.row.isEdit"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <span class="handleBtnHover" @click.stop="change(scope.row)">修改</span>
          <span>|</span>
          <span class="handleBtnHover" @click.stop="del(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
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
</template>

<script>
import initData from "@/mixins/req";
import { getY_M_D_H_M_S } from "@/utils/index";
import store from "@/store";
export default {
  mixins: [initData],
  data() {
    return {
      tableData: [
        { name: "小米", sex: "女", age: 100, isEdit: false },
        { name: "小米", sex: "女", age: 100, isEdit: false }
      ]
    };
  },
  methods: {
    tableRowStyle({ row, rowIndex }) {
      let className =
        (rowIndex + 1) % 2 === 0
          ? "table-row-style table-row-style-2n"
          : "table-row-style table-row-style-1n";
      return className;
    },
    //修改
    change(row) {
      row.isEdit = true;
    },
    //解除绑定
    del() {
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    }
  },
  filters: {
    dealTime(time) {
      return time ? getY_M_D_H_M_S(time) : "";
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/table.scss";
.usersAddress {
  min-height: 600px;
  /deep/ .el-input__inner {
    text-align: center;
  }
  /deep/ .is-disabled {
    .el-input__inner {
      background: transparent;
      border-color: transparent;
    }
  }
}
</style>
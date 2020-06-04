//表格
<template>
  <el-table
    header-row-class-name="table-header-style"
    :row-class-name="tableRowStyle"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
  >
    <el-table-column type="index" label="序号" width="50"></el-table-column>
    <el-table-column label="处方日期" prop="demo" show-overflow-tooltip>
      <!-- <template slot-scope="scope">{{ scope.row.eventType | eventType}}</template> -->
    </el-table-column>
    <el-table-column label="处方编号" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="年龄(岁)" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="诊断" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="药品品种" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="抗菌药(0/1)" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="注射剂(0/1)" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="国家基本药物品种数" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="药品通用名数" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="处方金额(元)" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="处方医师" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="科室" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="审核、调配药师" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="核对、发药药师" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="是否合理(0/1)" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="存在问题" prop="demo" show-overflow-tooltip></el-table-column>
    <el-table-column label="点评人" prop="demo" show-overflow-tooltip v-if="step===2"></el-table-column>
    <el-table-column label="操作" fixed="right">
        <template>
            <span class="handleBtnHover" v-if="step===1" @click.stop="openCommentDetails(1)">点评</span>
            <span class="handleBtnHover" v-if="step===2" @click.stop="openCommentDetails(2)">点评详情</span>
        </template>
    </el-table-column>
  </el-table>
</template>
<script>

export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    step:{
      type:Number||String,
      default:1
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    openCommentDetails(type){
      this.$parent.$refs.commentDetails.show=true;
      this.$parent.$refs.commentDetails.type=type;
      this.$parent.$refs.commentDetails.title=type===1?'处方点评':'处方点评详情';
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
</style>
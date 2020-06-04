//面包屑
<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="(item,index) in data">
        <el-breadcrumb-item :key="index">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {},
  data() {
    return {
      // breadcrumbData:[]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.breadcrumb {
  border-bottom: 1px solid #eef0f4;
  box-sizing: border-box;
  padding: 0 26px;
  /deep/ .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }
}
.breadcrumb /deep/ .el-breadcrumb__inner {
  color: #323436;
  font-weight: 700;
  font-size: 16px;
}
.breadcrumb /deep/ .el-breadcrumb__separator {
  color: #323436;
  font-size: 16px;
}
</style>
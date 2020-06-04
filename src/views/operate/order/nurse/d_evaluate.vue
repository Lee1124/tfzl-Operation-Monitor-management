//评价
<template>
  <div class="evaluate">
    <title-view text='第一次服务' class="title-view" />
    <!-- 评分的星 -->
    <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
    <!-- 评价的标签 -->
    <div class="tags">
      <template v-for="(item,index) in tags">
        <el-tag :key="index">{{item}}</el-tag>
      </template>
    </div>
    <title-view text='第二次服务' class="title-view" />
    <!-- 评分的星 -->
    <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
    <!-- 评价的标签 -->
    <div class="tags">
      <template v-for="(item,index) in tags">
        <el-tag :key="index">{{item}}</el-tag>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      value: 3.7,
      tags:['服务态度好','医术一般','菜的抠脚']
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.tags {
  /deep/ .el-tag {
    padding: 0 16px;
    height: 30px;
    border-radius: 14px;
    line-height: 28px;
    font-size: 12px;
    background: #f7f7ff;
    color: #999;
    border-color: #999;
    margin: 20px 10px 0;
  }
}
.title-view {
  margin: 10px 0;
}
</style>
//评价
<template>
  <div class="evaluate" v-if="data">
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
import { getComments } from "@/api/operate";
import { setThisValue } from "@/utils/index";
export default {
  props: {
    data: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      value: 0,
      tags: []
    };
  },
  methods: {
    init() {
      setThisValue(this, ["value", "tags"],[0,[]]);
      let data = { order: this.data.orderNumber };
      getComments(data).then(res => {
        if (res.status === 0 && res.data) {
          this.value = res.data.startLevel;
          this.tags = res.data.commentsContent.split(",");
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.tags {
  /deep/ .el-tag {
    padding: 0 16px;
    height: 30px;
    border-radius: 14px;
    line-height: 30px;
    font-size: 12px;
    background: #f7f7ff;
    color: #999;
    border-color: #999;
    margin: 20px 10px 0;
  }
}
</style>
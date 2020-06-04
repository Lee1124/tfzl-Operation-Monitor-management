//统计性的表格（在异常事件监控处用到）
<template>
  <div class="HeadTable">
    <template v-for="(item,index) in data">
      <div :key="index" class="itemBox pointer" @click.stop="clickItem(item)">
        <div :class="['count',{'countNot0':item.count!=0}]">{{item.count}}</div>
        <div class="name">今日{{item.label}}</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "HeadTable",
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    clickItem(item){
      this.$emit('clickEvent',item)
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";
.HeadTable {
  @include Flex;
  justify-content: flex-start;
  .itemBox {
    width: 200px;
    height: 130px;
    @include Flex;
    flex-direction: column;
    transition: all .2s;
    &:hover{
      background: rgba(34,225,126,.1);
    }
    .count {
      color: #323436;
      font-size: 28px;
    }
    .countNot0 {
      color: $red;//#ff3939
    }
    .name {
      font-size: 14px;
      margin-top: 10px;
      color: #333;
    }
  }
}
</style>
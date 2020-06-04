//标题
<template>
  <div class="myTitle">
      {{text}}
  </div>
</template>
<script>
export default {
  props:{
      text:{
          type:String,
          default:''
      }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.myTitle {
  height: 40px;
  line-height: 40px;
  background: #F4F4F4;
  color: #333;
  font-size: 14px;
  font-weight: 700;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
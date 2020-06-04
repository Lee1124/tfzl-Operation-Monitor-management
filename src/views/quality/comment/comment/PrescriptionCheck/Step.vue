//步骤条
<template>
  <el-steps :active="active" finish-status="success" align-center>
    <el-step title="抽取处方"></el-step>
    <el-step title="点评处方"></el-step>
    <el-step title="完成"></el-step>
  </el-steps>
</template>
<script>
export default {
  props: {
    active:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
    };
  },
};
</script>
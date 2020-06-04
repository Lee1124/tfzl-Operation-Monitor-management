//单选按钮
<template>
  <div class="radioBtn">
    <el-radio-group v-model="value" fill='#3f98f7' @change="change">
      <template v-for="(item,index) in radioList">
        <el-radio-button :key="index" :label="item">{{item.label}}</el-radio-button>
      </template>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  props: {
    radioList: {
      type: Array,
      default: () => []
    }
  },
  name: "radioBtn",
  data() {
    return {
      value: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.value = this.radioList[0];
    });
  },
  methods: {
    change(item) {
      this.$emit('change',item)
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
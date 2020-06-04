<template>
  <el-col :span="item.span">
    <div class="grid-content bg-purple-dark">
      <div class="boardItem" @click.stop="openItem(path)">
        <div class="item_icon_box">
          <svg-icon :icon-class="item.icon" class="item_icon"></svg-icon>
        </div>
        <div class="item_text">
          <span class="title">{{item.name}}</span>
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  name: "boardItem",
  props: {
    path: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      spanNum: 6
    };
  },
  methods: {
    openItem(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.grid-content {
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.boardItem {
  cursor: pointer;
  height: 100px;
  width: 100%;
  background: rgba(128, 234, 179, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s;
  .item_icon_box {
    text-align: center;
    .item_icon {
      width: 30px;
      height: 30px;
      color: #fff;
    }
  }
  .item_text {
    text-align: center;
    color: #fff;
    margin-top: 10px;
    .title {
      margin-right: 16px;
    }
  }
  &:hover {
    background: $green;
    transform: scale(1.05);
  }
}
</style>
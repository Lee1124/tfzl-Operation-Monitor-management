//选择按钮
<template>
  <button class="selectBtn">
    <div
      @click.stop="choiceNavBtn(item)"
      :class="['content',btnClassName,{'btn-selected':selected}]"
    >
      <svg-icon v-if="isShowIcon" :icon-class="item.meta.icon" class="icon"></svg-icon>
      <span class="text">{{item.meta.title}}</span>
    </div>
  </button>
</template>

<script>
import store from "../../../store";
export default {
  name: "selectBtn",
  props: {
    isShowIcon: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default: () => {}
    },
    btnClassName: {
      type: String,
      default: ""
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    choiceNavBtn(item) {
      this.$emit("clickEvent", item, item.path);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";
@mixin common {
  width: 0;
  transition: all 0s;
}
@mixin selectedStyle {
  top: -9px;
  padding-top: 4px;
  background: $green;
  box-shadow: 3px -4px 5px 0px rgba(0, 135, 65, 0.2);
  .text,
  .icon {
    color: #fff;
  }
}
.selectBtn {
  height: 100%;
  flex: 1;
  cursor: pointer;
  border: 0;
  padding: 0;
  outline: none;
  border-left: 1px solid #ececec;
  background: #fff;
  transition: all 0.3s;
  position: relative;
  .content {
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    @include notCopy;
    .icon {
      margin-top: 2px;
      margin-right: 10px;
      transition: all 0.3s;
    }
    .text {
      color: #999;
      transition: all 0.3s;
    }
  }
  .btn-selected {
    @include selectedStyle;
  }
  // &:last-child{
  //   // border-right: 1px solid #ececec;
  // }
}
.content:hover {
  @include selectedStyle;
}

.selectBtn .content.right-style {
  left: auto;
  @include common;
}

.selectBtn .content.right-style-show {
  left: auto;
  @include navCommonStyle;
}

.selectBtn .content.left-style {
  right: auto;
  @include common;
}
.selectBtn .content.left-style-show {
  right: auto;
  @include navCommonStyle;
}
</style>
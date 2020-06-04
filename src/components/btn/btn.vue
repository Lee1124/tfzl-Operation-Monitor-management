//公用按钮组件

<template>
  <button :class="['btn',btnClass]" @click.stop="clickBtn" :style="btnStyle">{{btnText}}</button>
</template>
<script>
export default {
  name: "btn",
  props: {
    //宽 默认80px
    width: {
      type: Number,
      default: 80
    },
    //高 默认30px
    height: {
      type: Number,
      default: 30
    },
    //字体大小 默认14px
    fontSize: {
      type: Number,
      default: 14
    },
    //边框的大小 默认0
    borderPX: {
      type: Number,
      default: 0
    },
    //边框的类型 默认solid
    borderType: {
      type: String,
      default: "solid"
    },
    //边框的颜色 默认#22e17e
    bdColor: {
      type: String,
      default: "#22e17e"
    },
    //边框的圆角  默认2px
    borderRadius: {
      type: Number,
      default: 2
    },
    //按钮文字
    btnText: {
      type: String,
      default: "默认文字"
    },
    //按钮背景颜色
    btnBgColor: {
      type: String,
      default: "#22e17e"
    },
    //按钮字体颜色
    textColor: {
      type: String,
      default: "#fff"
    },
    //按钮悬停背景色
    hoverColor: {
      type: String,
      default: "red"
    },
    //按钮悬停过渡时间
    transitionDuration: {
      type: String,
      default: ".2s"
    },
    //按钮的class名称  默认只有btn(可在btn.scss中设置其他样式)
    btnClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      num:160
    };
  },
  methods: {
    clickBtn() {
      this.$emit("btnEvent");
    }
  },
  computed: {
    btnStyle() {
      return {
        width: this.width/this.num + "rem",
        height: this.height/this.num + "rem",
        lineHeight: this.height/this.num + "rem",
        fontSize: this.fontSize/this.num + "rem",
        border:
          this.borderPX/this.num + "rem" + " " + this.borderType + " " + this.bdColor,
        borderRadius: this.borderRadius/this.num + "rem",
        background: this.btnBgColor,
        color: this.textColor,
        transitionDuration: this.transitionDuration
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/btn.scss";
.btn {
  padding: 0;
  outline: none;
  cursor: pointer;
  transition-property: all;
  // padding-top: 1px;
}
</style>
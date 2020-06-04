//导航菜单，可左右滑动
<template>
  <div class="Navigation">
    <div class="nav-scroll-view" ref="navSrollView">
      <template v-for="(item,index) in async_routers">
        <select-btn
          v-if="!item.hidden&&item.meta.isShow"
          :btnClassName="btnClassName"
          :selected="item.meta.isSelected"
          :item="item"
          :key="index"
          :isShowIcon="isShowIcon"
          @clickEvent="choiceCurNavBtn"
        />
      </template>
    </div>
    <drag-btn v-if="isShowDragBtn" @clickEvent="showBtn" :icon="dragBtnIcon" />
  </div>
</template>

<script>
import dragBtn from "./dragBtn";
import selectBtn from "./selectBtn";
import store from "../../../store";
import { mapGetters } from "vuex";
import { deepClone } from "../../../utils/validate";
export default {
  name: "Navigation",
  props: {
    isShowIcon: {
      type: Boolean,
      default: true
    },
    isAnimation: {
      //是否启动切换动画
      type: Boolean,
      default: true
    },
    btnCount: {
      //最多显示多少个按钮
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      dragBtnIcon: "you-turn",
      btnClassName: "",
      timeId: 0,
      defaultIndex: 0, //默认选中的项
      isShowDragBtn: true //是否显示dragBtn
    };
  },
  components: {
    dragBtn,
    selectBtn
  },
  computed: {
    ...mapGetters(["async_routers"])
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.navData = store.getters["async_routers"].filter(item=>!item.hidden);
      let navLength = this.navData.length;
      this.isShowDragBtn = navLength <= this.btnCount ? false : true;
      let btnMaxIndex = this.btnCount - 1;
      let min = 0;
      let max = 0;
      let defaultDataObj = this.navData.filter((item, index) => {
        if (this.$route.path.indexOf(item.name) != -1) {
          this.defaultIndex = index;
          return true;
        }
      });
      min =
        this.defaultIndex >= this.btnCount
          ? this.defaultIndex - btnMaxIndex
          : 0;
      max =
        this.defaultIndex >= this.btnCount ? this.defaultIndex : btnMaxIndex;
      //  console.log(min, max,this.defaultIndex,this.btnCount);
      this.navData.forEach((item, index) => {
        if (!item.hidden)
          item.meta.isShow = index >= min && index <= max ? true : false;
      });
      if (this.defaultIndex >= this.btnCount) {
        this.dragBtnIcon = "zuo-turn";
      }
      defaultDataObj = defaultDataObj.length > 0 ? defaultDataObj[0] : null;
      // console.log("defaultDataObj", defaultDataObj, this.$route.path);
      
      if (defaultDataObj)
        this.choiceCurNavBtn(defaultDataObj, this.$route.path);
    },
    //选中当前
    choiceCurNavBtn(data, path) {
      this.$emit("clickBtnEvent", data, path);
      this.reloadAllZT();
      if (data) data.meta.isSelected = true;
    },
    //重置所有的选中状态
    reloadAllZT() {
      this.navData.forEach(item => {
        if (!item.hidden)
          item.meta.isSelected = item.meta.isSelected
            ? false
            : item.meta.isSelected;
      });
    },
    showBtn(iconName) {
      let num = 0;
      for (let i = 0; i < this.navData.length; i++) {
        if (this.navData[i].meta.isShow) num = i;
      }
      if (iconName == "you-turn") {
        this.changeClassName("right-style", "right-style-show");
        this.showHide(num + 1, false);
        this.changeIcon(num, "zuo-turn");
      } else {
        this.changeClassName("left-style", "left-style-show");
        this.showHide(num, true);
        this.changeIcon(num, "you-turn");
      }
    },
    changeIcon(myNum, iconName) {
      if (
        (myNum + 1 == this.navData.length - 1 && iconName == "zuo-turn") ||
        (myNum == this.btnCount && iconName == "you-turn")
      ) {
        this.dragBtnIcon = iconName;
      }
    },
    showHide(dealNum, isShow) {
      if (dealNum <= this.navData.length - 1 && dealNum >= this.btnCount) {
        this.navData[dealNum - this.btnCount].meta.isShow = isShow;
        this.navData[dealNum].meta.isShow = !isShow;
      }
    },
    changeClassName(className1, className2) {
      if (this.isAnimation) {
        this.btnClassName = className1;
        clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
          this.btnClassName = className2;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Navigation {
  display: flex;
  position: relative;
  height: 100%;
  .nav-scroll-view {
    background: #fff;
    border-right: 1px solid #ececec;
    flex: 1;
    display: flex;
    box-sizing: border-box;
    height: 100%;
    box-shadow: 0px -5px 5px 0px rgba(175, 175, 175, 0.15);
    white-space: nowrap;
    // overflow: hidden;
  }
}
</style>
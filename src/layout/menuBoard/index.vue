<template>
  <div class="menuBoard">
    <div class="content">
      <div class="menuView">
        <div class="menuList scrollbarStyle">
          <router-view />
        </div>
      </div>
      <div class="messageView">
        <message-view />
      </div>
    </div>
    <div class="footerNavBox">
      <Navigation :defaultIndex="0" @clickBtnEvent="clickNav" />
    </div>
  </div>
</template>

<script>
import { Navigation } from "../components";
import messageView from "../../views/homePage/message/index";
export default {
  name: "menuBoard",
  components: {
    Navigation,
    messageView
  },
  data() {
    return {};
  },
  methods: {
    clickNav(obj) {
      this.$router.push("/home/" + obj.name);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.menuBoard {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    flex: 1;
    padding: 0 100px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .menuView {
      flex: 1;
      margin-right: 60px;
      position: relative;
      .menuList {
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    .messageView {
      width: 436px;
      position: relative;
    }
  }
}
.menuBoard .footerNavBox {
  line-height: $footerHeight;
  background-color: #fff;
  height: $footerHeight;
}
</style>
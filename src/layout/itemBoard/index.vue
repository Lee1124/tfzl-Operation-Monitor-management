<template>
  <div class="itemBoard">
    <el-container>
      <el-aside width="240px">
        <side-bar />
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { sideBar } from "../components";
import store from "../../store";
export default {
  name: "itemBoard",
  components: {
    sideBar
  },
  // mounted() {
  //   this.changeNavState(true);
  // },
  // destroyed() {
  //   this.changeNavState(false);
  // },
  activated() {
    this.changeNavState(true);
  },
  deactivated() {
    this.changeNavState(false);
  },
  methods: {
    changeNavState(show = false) {
      this.$store.dispatch("changeNavState", show);
    }
  }
};
</script>

<style lang="scss" scoped>
.itemBoard {
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
}

/deep/ .el-aside {
  height: 100%;
  background: #fff;
  margin-right: 10px;
}
/deep/ .el-container {
  height: 100%;
  .el-main {
    background: #fff;
    padding: 0;
    height: 100%;
    overflow: hidden;
    // .el-scrollbar {
    //   box-sizing: border-box;
    //   height: 100%;
    //   .el-scrollbar__wrap {
    //     overflow-x: hidden;
    //   }
    //   .el-scrollbar__view {
    //     padding: 30px;
    //   }
    // }
  }
}
</style>
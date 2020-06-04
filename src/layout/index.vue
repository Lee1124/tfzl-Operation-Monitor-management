<template>
  <div class="Layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Header } from "./components";
import router from "@/router/routers";
export default {
  name: "Layout",
  components: {
    Header
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped lang='scss'>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";
.Layout /deep/ .el-header {
  line-height: $headerHeight;
  background-color: $black;
  height: $headerHeight !important;
  color: #fff;
  padding: 0 30px;
}
// .Layout /deep/ .el-footer {
//   line-height: $footerHeight;
//   background-color: #fff;
//   height: $footerHeight !important;
// }
.Layout {
  height: 100%;
}
// .el-header {
//   background-color: #b3c0d1;
//   color: #333;
//   text-align: center;
//   line-height: 60px;
// }

// .el-aside {
//   background-color: #d3dce6;
//   color: #333;
//   text-align: center;
//   line-height: 200px;
// }

.el-main {
  background-color: #e9eef3;
  padding: 0;
  // color: #333;
  // text-align: center;
}

.el-container {
  height: 100%;
}
</style>
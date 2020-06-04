//侧边导航列表
<template>
  <div class="sideNavItem" :title="defaultActiveMenu" v-show="dd">
    <keep-alive>
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="defaultActiveMenu"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="select"
        >
          <sideItem
            v-for="(item,index) in sideBarRouters"
            :key="item.path+index"
            :item="item"
            :base-path="item.path"
          ></sideItem>
        </el-menu>
      </el-scrollbar>
    </keep-alive>
  </div>
</template>

<script>
import sideItem from "./sideItem";
import { mapGetters } from "vuex";
import store from "../../../store";
export default {
  name: "sideNavItem",
  components: {
    sideItem
  },
  data() {
    return {
      dd: true
    };
  },
  mounted() {},
  computed: {
    ...mapGetters("permission", ["sideBarRouters"]),
    defaultActiveMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  methods: {
    handleOpen(index) {
      console.log("handleOpen", index);
    },
    handleClose() {
      // console.log("handleClose");
    },
    select(index) {
      // console.log(index);
    }
  }
};
</script>

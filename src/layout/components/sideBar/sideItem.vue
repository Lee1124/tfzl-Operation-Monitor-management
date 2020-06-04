//菜单的某项组件
<template>
  <div class="sideItem" v-if="!item.hidden">
    <!-- 只有一级菜单 -->
    <el-menu-item
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
      :index="resolvePath(onlyOneChild.path)"
    >
      <span slot="title" v-if="onlyOneChild.meta&&onlyOneChild.meta.title">
        <router-link class="A" :to="resolvePath(onlyOneChild.path)">{{onlyOneChild.meta.title}}</router-link>
      </span>
    </el-menu-item>
    <!-- 多级菜单 -->
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
      </template>
      <sideItem
        v-for="(item2,index2) in item.children"
        :key="index2"
        :item="item2"
        :base-path="resolvePath(item.path)"
      ></sideItem>
    </el-submenu>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate";
import path from "path";
export default {
  name: "sideItem",
  props: {
    item: {
      type: Object,
      default: {}
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    this.onlyOneChild = null;
    return {
      // onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          //false
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        parent.alwaysShow = false;
        return true;
      }
      if (showingChildren.length === 0) {
        parent.alwaysShow = false;
        this.onlyOneChild = { ...parent, noShowingChildren: true };
        return true;
      }
      return false;
    },

    resolvePath(routePath) {
      if (routePath) {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(this.basePath)) {
          return this.basePath;
        }
        return path.resolve(this.basePath, routePath);
      }
    },
    handleClick(item, item2) {
      // this.$router.push(item.path+'/'+item2.path)
    }
  },
  mounted() {
    // console.log(this.route);
  }
};
</script>

<style lang="scss" scoped>
.handleClick {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.A {
  width: 100%;
  height: 100%;
  display: inline-block;
  text-decoration: none;
  font-size: 14px;
  color: #333;
}
.router-link-active {
  color: #22e17e;
}
.is-active {
  background: #f5f5f5;
  .el-submenu__title * {
    color: #22e17e;
  }
  /deep/ .el-submenu__icon-arrow {
    color: #22e17e;
  }
}
</style>
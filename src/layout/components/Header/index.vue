//头部
<template>
  <div class="Head">
    <div class="head_left">
      <div class="LOGO pointer" @click.stop="returnHomePage">
        <logo />
      </div>
      <span class="systemName pointer" @click.stop="returnHomePage">{{systemTitle}}</span>
      <span class="homePage" v-if="isShowNav" @click.stop="returnHomePage">首页</span>
    </div>
    <div class="head_nav">
      <Navigation
        v-if="isShowNav"
        :defaultIndex="0"
        :isShowIcon="false"
        :btnCount="7"
        @clickBtnEvent="clickBtnEvent"
      />
    </div>
    <div class="head_right">
      <div class="userNews pointer">
        <span class="name notCopy">{{$store.getters.user.name}}</span>
        <div class="head">
          <img :src="headUrl" @error="imgError" :alt="$store.getters.user.name+'的头像'" />
        </div>
        <el-dropdown trigger="click" @command="handle">
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(item,index) in dropdownData">
              <el-dropdown-item :key="index" :command="item.id">{{item.title}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <div class="loginOut" @click.stop="loginOut">退出</div> -->
    </div>
  </div>
</template>

<script>
import config from "../../../settings";
import Navigation from "../Navigation/index";
import store from "@/store";
export default {
  name: "Head",
  components: {
    Navigation
  },
  data() {
    return {
      headUrl: ""
    };
  },
  computed: {
    isShowNav(){
      return store.getters.showNav;
    },
    systemTitle() {
      return config.title;
    },
    dropdownData() {
      return [
        { title: "修改密码", id: 0 },
        { title: "退出登录", id: 1 }
      ];
    }
  },
  created() {
    this.init();
  },
  methods: {
    handle(command) {
      switch (command) {
        case 0:
          this.$router.push({path:'/user/change'})
          break;
        case 1:
          this.loginOut();
          break;
      }
    },
    init() {
      this.headUrl = store.getters.user.image;
    },
    imgError(e) {
      this.headUrl = require("@/assets/images/defaultHead.jpg");
    },
    returnHomePage() {
      this.$router.push("/");
    },
    //注销登录
    loginOut() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(res => {
            location.reload();
          });
        })
        .catch(err => {});
    },
    //头部导航栏点击跳转路由
    clickBtnEvent(item, path) {
      // console.log('头部导航栏点击跳转路由',path)
      this.$router.push(path);
      this.$store.dispatch("permission/setSideBarRouters", item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
.Head {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .head_left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 280px;
    position: relative;
    .LOGO {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .systemName {
      color: #fff;
      font-size: 16px;
    }
    .homePage {
      width: 100px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.2s;
      &:hover {
        color: #ffc600;
      }
    }
  }
  .head_nav {
    flex: 1;
    width: 400px;
    overflow: hidden;
    /deep/ .Navigation .nav-scroll-view {
      background: transparent;
      border-right: 1px solid #636363;
    }
    /deep/ .selectBtn {
      width: 138.9px;
      background: transparent;
      border-left-color: #636363;
      .content {
        font-size: 14px;
        &:hover {
          padding-top: 0;
          top: 0;
        }
        &.btn-selected {
          padding-top: 0;
          top: 0;
        }
      }
    }
    /deep/ .dragBtn {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }
  }
  .head_right {
    @include Flex;
    justify-content: flex-end;
    width: 240px;
    .userNews {
      @include Flex;
      position: relative;
      .name {
        color: #fff;
        font-size: 14px;
        margin-right: 12px;
      }
      .head {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .loginOut {
      margin-left: 30px;
      cursor: pointer;
    }
  }
}

//下拉菜单的样式拓展
/deep/ .el-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2020;
  opacity: 0;
  .el-dropdown-link {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
}
</style>
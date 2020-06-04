<template>
  <div class="loginView" :style="{background:'url('+loginBg+') no-repeat center center'}">
    <div class="formView">
      <div class="title">
        <span class="icon bgStyle_cover" :style="{background:'url('+logoUrl+')'}"></span>
        <span class="text">{{systemName}}</span>
      </div>
      <div class="elFormView" ref="elFormView">
        <h1 class="title">账号登录</h1>
        <el-form ref="form" :model="loginForm" label-width="80px">
          <el-input
            v-model="loginForm.userName"
            type="text"
            placeholder="请输入账号或手机号"
            auto-complete="off"
            @keyup.enter.native="loginSubmit"
          ></el-input>
          <el-input
            v-model="loginForm.passWord"
            type="password"
            placeholder="请输入密码"
            auto-complete="off"
            @keyup.enter.native="loginSubmit"
          ></el-input>
          <!-- <div class="sideTestView" ref="sideTestView">
            <span class="tips">行为验证安全组件加载中</span>
          </div>-->
          <div class="alertView">
            <el-alert
              v-if="loginForm.isShowMsg"
              :title="loginForm.msg"
              :closable="false"
              type="warning"
              show-icon
            ></el-alert>
          </div>
          <el-button v-if="!loginForm.allowLogin" type="button" class="loginBtn greyBtn">登录</el-button>
          <el-button
            v-if="loginForm.allowLogin"
            type="primary"
            class="loginBtn greenBtn"
            :loading="isLoading"
            @click="loginSubmit"
          >{{loginBtnText}}</el-button>
          <div class="handleView">
            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
            <span class="forgetPwd pointer">忘记密码</span>
          </div>
        </el-form>
        <!-- <picture-code ref="pictureCode" blockType="puzzle" :onSuccess="onSuccess" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { strIsNull } from "../utils/validate";
import setting from "../settings";
// import pictureCode from "../components/PictureTest/index.vue";
import store from "../store";
import { getImgCode, test } from "@/api/login";
import Cookies from "js-cookie";

export default {
  name: "login",
  // components: { pictureCode },
  data() {
    return {
      loginForm: {
        userName: "",
        passWord: "",
        rememberMe: false, //是否记住我
        allowLogin: false,
        isShowMsg: false,
        msg: ""
      },
      loginBtnText: "登录",
      redirect: null,
      isLoading: false,
      dialogVisible: true,
      appendbody: false,
      registerFail: false,
      imgCodeArr: [],
      imgCodeArr2: []
    };
  },
  mounted() {
    this.registerSlide();
    this.getCookie();
  },
  methods: {
    /**
     * 获取行为验证按钮
     */
    registerSlide() {
      this.imgCodeArr = [];
      //获取行为验证码
      getImgCode()
        .then(data => {
          initGeetest(
            {
              gt: data.gt,
              challenge: data.challenge,
              new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
              offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
              product: "bind" // 产品形式，包括：float，popup
            },
            captchaObj => {
              captchaObj
                .onReady(() => {
                  this.registerFail = false;
                  this.imgCodeArr.forEach(item => {
                    item.fn.call(this, captchaObj);
                  });
                  this.imgCodeArr2 = [captchaObj];
                })
                .onSuccess(() => {
                  var result = captchaObj.getValidate();
                  //验证成功后就进行登录
                  this.returnToLogin(result);
                })
                .onError(() => {
                  //your code
                  this.isLoading = false;
                });
            }
          );
        })
        .catch(err => {
          this.isLoading = false;
          this.registerFail = true;
        });
    },
    /**
     * 获取cookie中的信息
     */
    getCookie() {
      const userName = Cookies.get("userName");
      let passWord = Cookies.get("passWord");
      const rememberMe = Cookies.get("rememberMe");
      // 保存cookie里面的加密后的密码
      this.cookiePass = passWord ? passWord : "";
      passWord = passWord ? passWord : this.loginForm.passWord;
      this.loginForm.userName = userName ? userName : this.loginForm.userName;
      this.loginForm.passWord = passWord;
      this.loginForm.rememberMe = rememberMe ? Boolean(rememberMe) : false;
    },
    //设置提示内容
    setMsg(show = false, msg = "") {
      this.loginForm.isShowMsg = show;
      this.loginForm.msg = msg;
    },
    //登录确认
    loginSubmit() {
      if (this.loginForm.allowLogin) {
        //如果网络出问题没初始化到图形验证码则重新初始化
        if (this.registerFail) this.registerSlide();
        this.imgCodeArr2.forEach(item => {
          this.showImgCode(item);
        });
        if (this.imgCodeArr2.length == 0)
          this.imgCodeArr = [{ fn: this.showImgCode }];
      }
    },
    //使用captchaObj()方法显示行为验证码图片
    showImgCode(captchaObj) {
      captchaObj.verify(); //显示验证码
    },
    //验证完成后进行登录
    returnToLogin(data) {
      this.isLoading = true;
      if (!this.loginForm.allowLogin) return false;
      const user = {
        userName: this.loginForm.userName,
        passWord: this.loginForm.passWord,
        rememberMe: this.loginForm.rememberMe
      };
      if (user.rememberMe) {
        this.setCookies("userName", user.userName);
        this.setCookies("passWord", user.passWord);
        this.setCookies("rememberMe", user.rememberMe);
      } else {
        Cookies.remove("userName");
        Cookies.remove("passWord");
        Cookies.remove("rememberMe");
      }
      store
        .dispatch("login", this.loginForm)
        .then(res => {
          //  console.log('登录之后返回的值2：',res)
          if (res.status != 0) {
            this.setMsg(true, res.msg);
            this.isLoading = false;
            return false;
          } else {
            this.loginBtnText = "登录成功,请稍等...";
            setTimeout(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.isLoading = false;
            }, 400);
          }
        })
        .catch(error => {
          this.isLoading = false;
          // console.log("登陆异常", error);
        });
    },
    //设置cookies
    setCookies(setName, setValue) {
      Cookies.set(setName, setValue, { expires: setting.passCookieExpires });
    }
  },
  computed: {
    ...mapGetters("resources/", {
      loginBg: "loginBg",
      logoUrl: "logo"
    }),
    systemName() {
      return setting.title;
    }
  },
  watch: {
    loginForm: {
      deep: true,
      handler(obj) {
        let userName = obj.userName;
        let pwd = obj.passWord;
        this.loginForm.allowLogin =
          !strIsNull(userName) && !strIsNull(pwd) ? true : false;
      }
    },
    $route: {
      deep: true,
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";
.loginView .el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: $blue;
}
.loginView .el-input__inner::placeholder {
  color: #bbb;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
/deep/ .el-input__inner {
  height: 48px;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}
.alertView {
  // height: 40px;
  // display: flex;
  // align-items: center;
  // margin: 6px 0;
  margin-top: -8px;
  height: 40px;
}
/deep/ .el-alert--warning.is-light,
.el-alert--success.is-light {
  background: rgba(255, 249, 213, 1);
  width: 240px;
  border: 1px solid rgba(255, 223, 19, 1);
  font-size: 14px;
  color: #ffc513;
  .el-alert__icon {
    width: 18px;
    height: 18px;
  }
}
.loginBtn {
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  padding: 0;
  margin-top: 8px;
}
.greyBtn.el-button {
  color: #bbb;
  background: #e4e4e4;
  border: 0;
}
.greenBtn.el-button {
  color: #fff;
  background: $green;
  border: 0;
}
.greyBtn.el-button:hover {
  color: #bbb;
  border-color: #e4e4e4;
  background-color: #e4e4e4;
}

.loginView {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover !important;
  overflow: hidden;
  .formView {
    width: 400px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 230px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 46px;
    .icon {
      display: inline-block;
      width: 64px;
      height: 64px;
      background: $green;
      vertical-align: middle;
      margin-right: 20px;
    }
    .text {
      color: $smallTitleColor;
      font-size: 28px;
    }
  }

  .elFormView {
    // transform: scale(1); //为了改变其中弹窗固定定位失效
    background: #fff;
    box-shadow: 5px 9px 10px 0px rgba(86, 86, 86, 0.1);
    height: 400px;
    border-radius: 5px;
    padding: 10px 20px;
    box-sizing: border-box;
    h1.title {
      font-size: 24px;
      text-align: center;
      font-weight: 400;
      color: #333;
      // margin-bottom: 30px;
      margin-bottom: 38px;
    }
  }
}

/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: $blue;
  border-color: $blue;
}
/deep/ .el-checkbox__label {
  color: #bbb;
}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: $blue;
  font-size: 14px;
}
.handleView {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.forgetPwd {
  font-size: 14px;
  color: #333;
}

// //验证按钮的扩展样式
// .sideTestView {
//   height: 50px;
//   background: #e4e4e4;
//   border-radius: 2x;
//   position: relative;
//   .tips {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     color: #999;
//   }
//   /deep/ .geetest_holder.geetest_wind {
//     min-width: auto;
//     width: 100% !important;
//   }
// }
</style>

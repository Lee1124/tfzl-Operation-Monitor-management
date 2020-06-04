//拼图验证
<template>
  <div class="pictureTest notCopy">
    <el-dialog
      title="拖动下方滑块完成拼图"
      :append-to-body="false"
      :modal-append-to-body="false"
      :modal="false"
      :visible.sync="show"
      :close-on-click-modal="false"
      custom-class="dialogStyle1 picture-code"
    >
      <div
        class="puzzle-container"
        v-loading="loadImg"
        element-loading-text="加载中..."
        v-show="isVerificationShow"
      >
        <div class="updateBtn pointer" @click="refreshImg">
          <svg-icon icon-class="update" class="icon" />
        </div>
        <div ref="dd" style="position:relative;overflow:hidden;width:100%;height:100%;">
          <div style="position:relative;overflow:hidden;width:100%;height:100%;">
            <img id="scream" ref="scream" :src="imgRandom" style="width:100%;height:100%;" />
            <img class="defaultImg" ref="scream" v-show="showDefaultImg" :src="defaultImg" />
            <canvas id="puzzle-box" ref="puzzleBox" :width="dataWidth" :height="dataHeight"></canvas>
          </div>
          <div class="puzzle-lost-box" :style="'left:' + left_Num + 'px;width:100%;height:100%'">
            <canvas id="puzzle-shadow" ref="puzzleShadow" :width="dataWidth" :height="dataHeight"></canvas>
            <canvas id="puzzle-lost" ref="puzzleLost" :width="dataWidth" :height="dataHeight"></canvas>
          </div>
          <!-- <p :class="['ver-tips'+ (displayTips ? ' slider-tips' : '')]" ref="verTips">
            <template v-if="verification">
              <svg-icon icon-class="success-icon" style="color:#22e17e;" class="jiantou" />
              <span style="color:#42ca6b;">验证通过</span>
              <span></span>
            </template>
            <template v-if="!verification">
              <svg-icon icon-class="fail-icon" style="color:#ff3939;" class="jiantou" />
              <span style="color:red;">验证失败:</span>
              <span style="margin-left:4px;">拖动滑块将悬浮图像正确拼合</span>
            </template>
          </p>-->
        </div>

        <div class="slider-container">
          <div class="slider-bar"></div>
          <div
            :class="['yidun_slide_indicator',indicator.className]"
            :style="' width: '+indicator.width+'px'"
          ></div>
          <div class="yidun_tips" v-show="tips.show">{{tips.msg}}</div>
          <div
            :class="['slider-btn',sliderBtn.className]"
            ref="sliderBtn"
            @mousedown="startMove"
            @touchstart="startMove"
          >
            <svg-icon
              v-show="sliderBtn.className=='slider-btn-moving'||sliderBtn.className==''"
              icon-class="right-turn"
              class="icon"
            />
            <svg-icon
              v-show="sliderBtn.className=='slider-btn-fail'"
              icon-class="fail2"
              style="color:#fff;"
              class="icon"
            />
            <svg-icon
              v-show="sliderBtn.className=='slider-btn-success'"
              icon-class="success2"
              style="color:#fff;"
              class="icon"
            />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      show: false,
      sideTime: 600, //滑动按钮回弹的延时时间
      isVerificationShow: false,
      moveStart: "",
      randomX: null,
      randomY: null,
      imgRandom: "",
      left_Num: 0,
      dataWidth: null,
      dataHeight: null,
      puzzleSize: null, // 滑块的大小
      deviationValue: null,
      radius: null,
      padding: null,
      loadImg: false, //加载图片
      showDefaultImg:false,
      indicator: {
        width: 0,
        className: ""
      },
      sliderBtn: {
        className: ""
      },
      tips: {
        show: true,
        msg: "向右拖动滑块填充拼图"
      }
    };
  },
  props: {
    // 画布图片的尺寸
    // width: {
    //   type: [String, Number],
    //   default: 300
    // },
    // height: {
    //   type: [String, Number],
    //   default: 140
    // },
    // 图集
    puzzleImgList: {
      type: Array,
      default: () => [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551244821054&di=bf03257cfaf9d0a0f020e7f1363cf5f8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F11%2F96%2F88W58PIC7Y2_1024.jpg",
        require("@/assets/images/pictrueCode/1.png"),
        require("@/assets/images/pictrueCode/2.png"),
        require("@/assets/images/pictrueCode/3.png"),
        require("@/assets/images/pictrueCode/4.png"),
        require("@/assets/images/pictrueCode/5.png"),
        require("@/assets/images/pictrueCode/6.png")
      ]
    },
    // 滑块的大小
    blockSize: {
      type: [String, Number],
      default: 40
    },
    // 误差
    deviation: {
      type: [String, Number],
      default: 4
    },
    // 滑块的圆角大小
    blockRadius: {
      type: [String, Number],
      default: 4
    },
    // 滑块随机出现的范围
    wraperPadding: {
      type: [String, Number],
      default: 20
    },
    // 滑块形状 square  puzzle
    blockType: {
      type: String,
      default: "square"
    },
    // 成功的回调
    onSuccess: {
      type: Function,
      default: val => {
        console.log("成功", val);
      }
    },
    // 失败的回调
    onError: {
      type: Function,
      default: () => {
        console.log("失败");
      }
    },
    verificationShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defaultImg() {
      return require("@/assets/images/pictrueCode/2.png");
    }
  },
  created() {
    // 随机显示一张图片
    let imgRandomIndex = Math.round(
      Math.random() * (this.puzzleImgList.length - 1)
    );
    this.imgRandom = this.puzzleImgList[imgRandomIndex];
    this.puzzleSize = Number(this.blockSize);
    this.deviationValue = Number(this.deviation);
    this.radius = Number(this.blockRadius);
    // this.dataWidth = Number(this.width);
    // this.dataHeight = Number(this.height);
    this.padding = Number(this.wraperPadding);
  },
  methods: {
    /**
     * 设置sideBtn
     */
    setSideBtn(className = "") {
      this.sliderBtn.className = className;
    },
    /**
     * 设置indicator
     */
    setIndicator(className = "moving", width = 0) {
      if (width) this.indicator.width = width;
      this.indicator.className = "indicator-" + className;
    },
    /**
     * 设置tips
     */
    setTips(show = true, msg = "向右拖动滑块填充拼图") {
      this.tips.show = show;
      this.tips.msg = msg;
    },
    /* 刷新 */
    refreshImg() {
      let imgRandomIndex = Math.round(
        Math.random() * (this.puzzleImgList.length - 1)
      );
      this.imgRandom = this.puzzleImgList[imgRandomIndex];
      this.initCanvas();
    },
    /* 画布初始化 */
    initCanvas() {
      this.showDefaultImg=true;
      this.clearCanvas();
      let w = this.dataWidth;
      let h = this.dataHeight;
      let PL_Size = this.puzzleSize;
      let padding = this.padding;
      let MinN_X = padding + PL_Size;
      let MaxN_X = w - padding - PL_Size - PL_Size / 6;
      let MaxN_Y = padding;
      let MinN_Y = h - padding - PL_Size - PL_Size / 6;
      this.randomX = Math.round(Math.random() * (MaxN_X - PL_Size) + MinN_X);
      let random = Math.random();
      let randomNum = random < 0.2 ? random + 0.2 : random;
      this.randomY = Math.round(randomNum * (MaxN_Y + MinN_Y));
      let X = this.randomX;
      let Y = this.randomY;
      // console.log("XY", X, Y);
      this.left_Num = -X + 10;
      let d = PL_Size / 3;
      let radius = Number(this.radius);
      let c = this.$refs.puzzleBox;
      let c_l = this.$refs.puzzleLost;
      let c_s = this.$refs.puzzleShadow;
      let ctx = c.getContext("2d");
      let ctx_l = c_l.getContext("2d");
      let ctx_s = c_s.getContext("2d");
      ctx.globalCompositeOperation = "xor";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#fff";
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "rgba(0,0,0,0)";
      if (this.blockType === "square") {
        ctx.arc(X + radius, Y + radius, radius, Math.PI, (Math.PI * 3) / 2);
        ctx.lineTo(PL_Size - radius + X, Y);
        ctx.arc(
          PL_Size - radius + X,
          radius + Y,
          radius,
          (Math.PI * 3) / 2,
          Math.PI * 2
        );
        ctx.lineTo(PL_Size + X, PL_Size + Y - radius);
        ctx.arc(
          PL_Size - radius + X,
          PL_Size - radius + Y,
          radius,
          0,
          (Math.PI * 1) / 2
        );
        ctx.lineTo(radius + X, PL_Size + Y);
        ctx.arc(
          radius + X,
          PL_Size - radius + Y,
          radius,
          (Math.PI * 1) / 2,
          Math.PI
        );
      } else {
        ctx.moveTo(X, Y);
        ctx.lineTo(X + d, Y);
        ctx.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
        ctx.lineTo(X + 3 * d, Y);
        ctx.lineTo(X + 3 * d, Y + d);
        ctx.bezierCurveTo(
          X + 2 * d,
          Y + d,
          X + 2 * d,
          Y + 2 * d,
          X + 3 * d,
          Y + 2 * d
        );
        ctx.lineTo(X + 3 * d, Y + 3 * d);
        ctx.lineTo(X, Y + 3 * d);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      this.loadImg = true;
      this.setTips(true, "加载中...");
      let img = new Image();
      img.src = this.imgRandom;
      img.onload = () => {
        clearTimeout(this.imgId);
        this.imgId = setTimeout(() => {
          this.loadImg = false;
          this.setTips(true);
          this.showDefaultImg=false;
        }, 100);
        ctx_l.drawImage(img, 0, 0, w, h);
      };
      ctx_l.beginPath();
      ctx_l.strokeStyle = "rgba(0,0,0,0)";
      if (this.blockType === "square") {
        ctx_l.arc(X + radius, Y + radius, radius, Math.PI, (Math.PI * 3) / 2);
        ctx_l.lineTo(PL_Size - radius + X, Y);
        ctx_l.arc(
          PL_Size - radius + X,
          radius + Y,
          radius,
          (Math.PI * 3) / 2,
          Math.PI * 2
        );
        ctx_l.lineTo(PL_Size + X, PL_Size + Y - radius);
        ctx_l.arc(
          PL_Size - radius + X,
          PL_Size - radius + Y,
          radius,
          0,
          (Math.PI * 1) / 2
        );
        ctx_l.lineTo(radius + X, PL_Size + Y);
        ctx_l.arc(
          radius + X,
          PL_Size - radius + Y,
          radius,
          (Math.PI * 1) / 2,
          Math.PI
        );
      } else {
        ctx_l.moveTo(X, Y);
        ctx_l.lineTo(X + d, Y);
        ctx_l.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
        ctx_l.lineTo(X + 3 * d, Y);
        ctx_l.lineTo(X + 3 * d, Y + d);
        ctx_l.bezierCurveTo(
          X + 2 * d,
          Y + d,
          X + 2 * d,
          Y + 2 * d,
          X + 3 * d,
          Y + 2 * d
        );
        ctx_l.lineTo(X + 3 * d, Y + 3 * d);
        ctx_l.lineTo(X, Y + 3 * d);
      }
      ctx_l.closePath();
      ctx_l.stroke();
      ctx_l.shadowBlur = 10;
      ctx_l.shadowColor = "black";
      ctx_l.clip();
      ctx_s.beginPath();
      ctx_s.lineWidth = "1";
      ctx_s.strokeStyle = "rgba(0,0,0,0)";
      if (this.blockType === "square") {
        ctx_s.arc(X + radius, Y + radius, radius, Math.PI, (Math.PI * 3) / 2);
        ctx_s.lineTo(PL_Size - radius + X, Y);
        ctx_s.arc(
          PL_Size - radius + X,
          radius + Y,
          radius,
          (Math.PI * 3) / 2,
          Math.PI * 2
        );
        ctx_s.lineTo(PL_Size + X, PL_Size + Y - radius);
        ctx_s.arc(
          PL_Size - radius + X,
          PL_Size - radius + Y,
          radius,
          0,
          (Math.PI * 1) / 2
        );
        ctx_s.lineTo(radius + X, PL_Size + Y);
        ctx_s.arc(
          radius + X,
          PL_Size - radius + Y,
          radius,
          (Math.PI * 1) / 2,
          Math.PI
        );
      } else {
        ctx_s.moveTo(X, Y);
        ctx_s.lineTo(X + d, Y);
        ctx_s.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
        ctx_s.lineTo(X + 3 * d, Y);
        ctx_s.lineTo(X + 3 * d, Y + d);
        ctx_s.bezierCurveTo(
          X + 2 * d,
          Y + d,
          X + 2 * d,
          Y + 2 * d,
          X + 3 * d,
          Y + 2 * d
        );
        ctx_s.lineTo(X + 3 * d, Y + 3 * d);
        ctx_s.lineTo(X, Y + 3 * d);
      }
      ctx_s.closePath();
      ctx_s.stroke();
      ctx_s.shadowBlur = 20;
      ctx_s.shadowColor = "black";
      ctx_s.fill();
    },
    /* 通过重置画布尺寸清空画布，这种方式更彻底 */
    clearCanvas() {
      let c = this.$refs.puzzleBox;
      let c_l = this.$refs.puzzleLost;
      let c_s = this.$refs.puzzleShadow;
      c.setAttribute("height", c.getAttribute("height"));
      c_l.setAttribute("height", c.getAttribute("height"));
      c_s.setAttribute("height", c.getAttribute("height"));
    },
    /* 按住滑块后初始化移动监听，记录初始位置 */
    startMove(e) {
      // console.log(e);
      e = e || window.event;
      this.moveStart = e.pageX || e.targetTouches[0].pageX;
      this.addMouseMoveListener();
    },
    /* 滑块移动 */
    moving(e) {
      let self = this;
      e = e || window.event;
      let moveX = e.pageX || e.targetTouches[0].pageX;
      let d = moveX - self.moveStart;
      // console.log(d);
      let w = self.dataWidth;
      let PL_Size = this.puzzleSize;
      let padding = this.padding;
      if (self.moveStart === "") {
        return "";
      }
      if (d < 0 || d > w - padding - PL_Size) {
        return false;
      } else {
        this.setTips(false, "");
        this.setIndicator("moving", d + self.$refs.sliderBtn.clientWidth);
        this.setSideBtn("slider-btn-moving");
      }

      self.$refs.sliderBtn.style.left = d + "px";
      self.$refs.sliderBtn.style.transition = "inherit";
      self.$refs.puzzleLost.style.left = d + "px";
      self.$refs.puzzleLost.style.transition = "inherit";
      self.$refs.puzzleShadow.style.left = d + "px";
      self.$refs.puzzleShadow.style.transition = "inherit";
    },
    /* 移动结束，验证并回调 */
    moveEnd(e) {
      let self = this;
      e = e || window.event;
      let moveEnd_X = (e.pageX || e.changedTouches[0].pageX) - self.moveStart;
      let ver_Num = self.randomX - 10;
      let deviationValue = this.deviationValue;
      let Min_left = ver_Num - deviationValue;
      let Max_left = ver_Num + deviationValue;
      if (self.moveStart !== "" && moveEnd_X > 0) {
        if (Max_left > moveEnd_X && moveEnd_X > Min_left) {
          self.setIndicator("success");
          this.setSideBtn("slider-btn-success");
          clearTimeout(self.successID);
          self.successID = setTimeout(() => {
            /* 成功的回调函数 */
            self.onSuccess(moveEnd_X);
            this.show = false;
            this.reloadState();
          }, this.sideTime);
          this.removeMoveListener();
          return false;
        } else {
          self.displayTips = true;
          self.setIndicator("fail");
          this.setSideBtn("slider-btn-fail");
          clearTimeout(self.errID);
          this.reloadState();
          self.errID = setTimeout(() => {
            self.displayTips = false;
            self.initCanvas();
            /* 失败的回调函数 */
            self.onError();
          }, this.sideTime);
        }
      }
    },

    reloadState() {
      let self = this;
      if (
        typeof self.$refs.sliderBtn !== "undefined" &&
        typeof self.$refs.puzzleLost !== "undefined" &&
        typeof self.$refs.puzzleShadow !== "undefined"
      ) {
        clearTimeout(this.endID);
        this.endID = setTimeout(() => {
          self.$refs.sliderBtn.style.left = 0;
          self.$refs.sliderBtn.style.transition = "left 0.5s";
          self.$refs.puzzleLost.style.left = 0;
          self.$refs.puzzleLost.style.transition = "left 0.5s";
          self.$refs.puzzleShadow.style.left = 0;
          self.$refs.puzzleShadow.style.transition = "left 0.5s";
          this.setTips(true);
          this.setIndicator("", 0);
          this.setSideBtn("");
        }, this.sideTime);
        // self.$refs.sliderBtn.style.backgroundPosition = "0 -84px";
      }
      self.moveStart = "";
      this.removeMoveListener();
    },
    /* 全局绑定滑块移动与滑动结束，移动过程中鼠标可在页面任何位置 */
    addMouseMoveListener() {
      let self = this;
      document.addEventListener("mousemove", self.moving);
      document.addEventListener("touchmove", self.moving);
      document.addEventListener("mouseup", self.moveEnd);
      document.addEventListener("touchend", self.moveEnd);
    },
    removeMoveListener() {
      let self = this;
      document.removeEventListener("mousemove", self.moving);
      document.removeEventListener("touchmove", self.moving);
      document.removeEventListener("mouseup", self.moving);
      document.removeEventListener("touchend", self.moving);
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.isVerificationShow = val;
        if (val)
          this.$nextTick(() => {
            this.dataWidth = this.$refs.dd.clientWidth;
            this.dataHeight = this.$refs.dd.clientHeight;
            clearTimeout(this.initID);
            this.initID = setTimeout(() => {
              this.initCanvas();
            });
          });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
@import "~@/assets/styles/variables.scss";
/deep/ .picture-code {
  width: 96%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  .el-dialog__header {
    padding: 16px 16px 10px;
    .el-dialog__headerbtn {
      top: 14px;
      right: 14px;
    }
  }
  .el-dialog__body {
    padding: 10px 10px 58px;
  }
}

.defaultImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 333;
  left: 0;
  top: 0;
}

.updateBtn {
  position: absolute;
  z-index: 2019;
  right: 10px;
  top: 10px;

  .icon {
    font-size: 24px;
    color: #ccc;
  }
  &:hover {
    .icon {
      color: #fff;
    }
  }
}

.ver-tips {
  position: absolute;
  left: 0;
  bottom: -22px;
  background: rgba(255, 255, 255, 0.9);
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  width: 100%;
  margin: 0;
  text-align: left;
  padding: 0 8px;
  transition: all 0.4s;
}

.slider-tips {
  bottom: 0;
}

.ver-tips span {
  display: inline-block;
  vertical-align: top;
  line-height: 22px;
  color: #455;
}

.active-tips {
  display: block;
}

.hidden {
  display: none;
}

.puzzle-container {
  width: 100%;
  height: 180px;
  position: relative;
  display: inline-block;
  // padding: 15px 15px 28px;
  // border: 1px solid #ddd;
  background: #ffffff;
  border-radius: 16px;
}

.puzzle-header {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.puzzle-header-left {
  color: #333;
}

.close-btn:hover {
  color: #f56c6c;
}

.close-btn {
  margin-left: 5px;
}

.slider-container {
  width: 100%;
  position: relative;
  margin: 6px auto 0;
  border: 1px solid #e4e7eb;
  background-color: #f7f9fa;
  border-radius: 4px;
}

.slider-bar {
  height: 44px;
  position: relative;
}

.slider-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  position: absolute;
  width: 44px;
  height: 44px;
  background: #fff;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 12;
  cursor: pointer;
  // background-image: url('@/assets/images/sprite.3.2.0.png');
  // background-position: 0 -84px;
  transition: inherit;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  transition: background 0.2s !important;
  .icon {
    font-size: 20px;
    transition: color 0.2s;
  }
  &:hover {
    background-color: $blue;
    .icon {
      color: #fff;
    }
  }
}

.slider-btn-moving {
  background-color: $blue;
  &:hover {
    background-color: $blue;
  }
  .icon {
    color: #fff;
  }
}
.slider-btn-success {
  background-color: $green;
  &:hover {
    background-color: $green;
  }
}
.slider-btn-fail {
  background-color: $red;
  &:hover {
    background-color: $red;
  }
}

#puzzle-box {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 22;
}

#puzzle-shadow {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 22;
}

#puzzle-lost {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 33;
}

.puzzle-lost-box {
  position: absolute;
  width: 260px;
  height: 116px;
  left: 0;
  top: 0;
  z-index: 111;
}
.yidun_slide_indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 2px;
  border: 1px solid transparent;
  box-sizing: border-box;
}
.indicator-moving {
  border-color: $blue;
  background: rgba(63, 152, 247, 0.3);
}
.indicator-success {
  border-color: $green;
  background: rgba(34, 225, 126, 0.3);
}
.indicator-fail {
  border-color: $red;
  background: rgba(255, 57, 57, 0.3);
}

.yidun_tips {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  line-height: 44px;
  color: #45494c;
  font-size: 16px;
}
</style>
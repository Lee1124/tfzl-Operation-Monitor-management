//回复弹框内容
<template>
  <el-dialog
    title="用户反馈"
    custom-class="dialogStyle1 replyPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="标题:">
        <el-input v-model="form.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="提交人:" class="inline-item">
        <el-input v-model="form.person" disabled></el-input>
      </el-form-item>
      <el-form-item label="提交时间:" class="inline-item">
        <el-input v-model="form.time" disabled></el-input>
      </el-form-item>
      <el-form-item label="反馈内容:">
        <el-input type="textarea" resize="none" disabled v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="图片:">
        <template v-for="(item,index) in form.srcList">
          <el-image
            :key="index"
            style="width: 100px; height: 100px"
            :src="item"
            :preview-src-list="form.srcList"
          ></el-image>
        </template>
      </el-form-item>
      <el-form-item label="回复内容:" prop="replyContent">
        <el-input type="textarea" resize="none" v-model="form.replyContent"></el-input>
      </el-form-item>
      <el-form-item class="textCenter" label-width="0">
        <el-button type="primary" @click="onSubmit('form')" class="blue_color_btn">回复</el-button>
        <el-button @click="show=false">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      show: false,
      showMessage:false,
      form: {
        title: "",
        person: "",
        time: "",
        content: "",
        srcList: [
          "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        ],
        replyContent: ""
      },
      rules: {
        replyContent: [{ required: true, message: "请输入回复内容" }]
      }
    };
  },
  methods: {
    //打开弹框
    open() {
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  filters: {
    // dealTime(time) {
    //   return time ? getY_M_D_H_M_S(time) : "";
    // },
    // orderState(val) {
    //   const orderState = store.getters["parameter/inquiry_orderState"];
    //   return findName(orderState, val);
    // }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
// @import "~@/assets/styles/page.scss";
/deep/ .replyPopup {
  width: 60%;
  .el-image {
    margin-right: 10px;
  }
  .inline-item {
    display: inline-block;
  }
  .textCenter {
    text-align: center;
  }
}
</style>
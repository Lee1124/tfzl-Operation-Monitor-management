
//个人信息
<template>
  <div class="information">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="病人标识号:" class="inline-item">
        <el-input v-model="form.sign"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" class="inline-item">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别:" class="inline-item">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="出生日期:" class="inline-item">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="国籍:" class="inline-item">
        <el-input v-model="form.nationality"></el-input>
      </el-form-item>
      <el-form-item label="民族:" class="inline-item">
        <el-input v-model="form.nation"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" class="inline-item">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="账号:" class="inline-item">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="密码:" class="inline-item">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="住址:" class="inline-item2">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="头像:" class="inline-item3">
        <span style="display:flex;">
          <el-image
            class="head"
            src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
          ></el-image>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>
      </el-form-item>
      <el-form-item label="身份证号码:" class="inline-item">
        <el-input v-model="form.ID"></el-input>
      </el-form-item>
      <el-form-item label="是否黑名单:" class="inline-item">
        <el-radio-group v-model="form.blacklist">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="实名认证:" class="inline-item">
        <span style="color:#ff3939;">{{form.realName}}</span>
      </el-form-item>
      <el-form-item label="标签:">
        <template v-for="(item,index) in form.labels">
          <span class="label" :key="index">{{item}}</span>
        </template>
        <i class="el-icon-circle-plus-outline addLabels pointer"></i>
      </el-form-item>
      <el-form-item label="身份证照片:">
        <template v-for="(item,index) in form.srcList">
          <el-image class="ID_images" :key="index" :src="item" :preview-src-list="form.srcList"></el-image>
        </template>
      </el-form-item>
      <el-form-item class="textCenter" label-width="0">
        <el-button type="primary" @click="keep('form')" class="blue_color_btn">保存</el-button>
        <el-button @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      form: {
        sign: "",
        name: "",
        sex: "",
        age: "",
        nationality: "",
        nation: "",
        phone: "",
        number: "",
        pwd: "",
        ID: "",
        blacklist: "否",
        realName: "未认证",
        labels: ["标签1", "标签2"],
        srcList: [
          "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        ],
        replyContent: ""
      },
      imageUrl: "",
      rules: {
        replyContent: [{ required: true, message: "请输入回复内容" }]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    keep(formName) {
      console.log("保存");
    },
    close(){
        this.$emit('close')
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/page.scss";
.head {
  width: 40px;
  height: 40px;
}
.inline-item {
  display: inline-block;
  width: 33%;
}
.inline-item2 {
  display: inline-block;
  width: 66%;
}
.inline-item3 {
  display: inline-block;
  width: 30%;
  height: 20px;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
/deep/ .avatar {
  width: 40px;
  height: 40px;
  display: block;
}
.label {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #3f98f7;
  margin-right: 10px;
  color: #3f98f7;
}
.addLabels {
  font-size: 30px;
  vertical-align: middle;
  color: #ccc;
  transition: all 0.2s;
  &:hover {
    color: #3f98f7;
  }
}
.ID_images {
  width: 200px;
  height: 150px;
}
</style>

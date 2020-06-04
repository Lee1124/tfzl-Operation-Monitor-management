//问诊单
<template>
  <div class="inquiryList">
    <!-- 标题 -->
    <title-view text="病情描述" />
    <!-- 病情描述 -->
    <ul class="description scrollbarStyle2" v-if="data">
      <li>
        <span class="label">既往病史：</span>
        <span class="value">{{data.medicalHistory}}</span>
      </li>
      <li>
        <span class="label">问题描述：</span>
        <span class="value">{{data.problemDesc}}</span>
      </li>
      <li>
        <span class="label">病情照片：</span>
        <span class="value">
          <template v-for="(item,index) in photos(data)">
            <el-image :key="index" :src="item">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      imgArr: [
        { img: this.$store.getters["resources/defaultHead"] },
        { img: this.$store.getters["resources/defaultHead"] }
      ],
      
    };
  },
  methods: {
    //病情图片
    photos(data){
      let imgs=data.illnessPhotos?data.illnessPhotos.split(','):[];
      return imgs
    }
  }
};
</script>
<style lang='scss' scoped>
.description {
  height: 380px;
  overflow: auto;
  li {
    color: #666;
    font-size: 14px;
    padding: 20px 0;
    display: flex;
    .label {
      flex-basis: 14%;
    }
    .value {
      flex-basis: 86%;
    }
  }
  /deep/ .el-image {
    width: 240px;
    height: 150px;
    margin-right: 10px;
  }
}
</style>
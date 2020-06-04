<template>
  <div class="message scrollbarStyle" v-loading="loading">
    <template v-for="(item,index) in messageData">
      <item-view :item="item" :key="index" />
    </template>
  </div>
</template>

<script>
import itemView from "./item";
import { message } from "@/api/home";
import { deepClone } from "@/utils/index";
export default {
  name: "message",
  components: {
    itemView
  },
  data() {
    return {
      messageData: [],
      loading: false
    };
  },
  activated(){
    this.init();
  },
  methods: {
    dealData(data) {
      let myData = deepClone(data);
      // myData
      this.messageData = myData;
    },
    init() {
      this.loading = true;
      message()
        .then(res => {
          this.loading = false;
          this.dealData(res.data);
        })
        .catch(err => {
          this.loading = false;
        });
    },
    openView(item) {}
  }
};
</script>

<style lang="scss" scoped>
.message {
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 5px 9px 20px 0px rgba(115, 115, 115, 0.1);
}
</style>
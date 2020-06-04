<template>
  <div class="menuListView">
    <!-- <button @click="test" v-permission="['del']">请求</button> -->
    <template v-for="(item,index) in homeMenuData">
      <div :key="index" v-if="item.route===$route.path">
        <div class="label" v-if="item.data.length!=0">
          <svg-icon icon-class="you-turn"></svg-icon>
          <span class="label-text">{{item.title}}</span>
        </div>
        <div class="content">
          <el-row>
            <template v-for="(item2,index2) in item.data">
              <board-item :key="index2" :path="item.path" :item="item2" />
            </template>
          </el-row>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import boardItem from "./boardItem";
import { setToken } from "@/utils/auth";
import { abnormalMenu } from "@/api/abnormal";
import { mapGetters } from "vuex";
export default {
  name: "menuListView",
  components: {
    boardItem
  },
  computed: {
    ...mapGetters("homeData/", ["homeMenuData"])
  },
  data() {
    return {
      is12Index: 0 //is12 的索引位置
    };
  },

  activated() {
    this.getMenu(this.$route);
    this.changeData();
  },

  methods: {
    //处理请求的数据
    dealWithData(key, data) {
      this.itemData.forEach(item => {
        if (item.path === key) {
          item.data.forEach(item2 => {
            if (data[item2.key]) item2.value = data[item2.key];
          });
        }
      });
    },
    // 获取菜单信息
    getMenu(to) {
      let path = to.path;
      switch (path) {
        case "/home/abnormal":
          this.$store.dispatch("homeData/getAbnormalMenu");
          break;
      }
    },

    /**
     * 根据数据的个数来改变数据中span的数值
     * 奇数：（奇数-1）个6和1个12
     * 偶数：（偶数%4=0  就没有12，全为6；偶数%4!=0  (偶数-2 )个6和2个12 ）
     */
    changeData() {
      let data = this.$store.getters["homeData/homeMenuData"];
      data.forEach(item => {
        let length = item.data.length;
        let oddEven = length % 2 == 0 ? 2 : 1; //1为奇数 2为偶数
        let arr = [];
        let is6;
        let is12;
        if (oddEven == 1) {
          is6 = length - 1;
          is12 = 1;
        } else {
          let isyu4 = length % 4 == 0 ? 4 : 5; //4为4的倍数 5反之
          is6 = isyu4 == 4 ? length : length - 2;
          is12 = isyu4 == 4 ? 0 : 2;
        }
        arr = this.getArr(is6, 6).concat(this.getArr(is12, 12));
        arr = this.getArr(is6, 6).concat(this.getArr(is12, 12));
        // this.changeIndex(arr);
        this.changeArr(arr, item);
        // console.log(arr)
      });
    },
    /**
     * 根据数量返回数组
     */
    getArr(isNum, span) {
      let arr = [];
      for (let i = 0; i < isNum; i++) {
        arr[i] = span;
      }
      return arr;
    },
    /**
     * 改变数据
     */
    changeArr(arr, itemObj) {
      arr.forEach((item, index) => {
        if (item != itemObj.data[index].span) itemObj.data[index].span = item;
      });
    },
    changeIndex(arr) {
      let index = this.is12Index;
    }
  },
  watch: {
    $route(to) {
      // this.getMenu(to);
    }
  }
};
</script>

<style lang="scss" scoped>
.menuListView {
  .label .label-text {
    font-size: 14px;
    color: #323436;
    font-weight: 700;
    margin-left: 6px;
  }
  .content {
    margin-top: 18px;
  }
}
</style>
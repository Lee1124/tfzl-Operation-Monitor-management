<template>
  <div class="message_item" @click.stop="openView(item)">
    <span class="item_sign"></span>
    <div class="item_top">
      <div class="row_left">
        <div class="icon">
          <svg-icon icon-class="laba" class="svgIcon" />
        </div>
        <div class="orderType">{{item.orderType|orderType}}</div>
      </div>
      <div class="orderState">{{item.orderType|orderState}}</div>
    </div>
    <div class="item_center">
      <span :class="{'isOpened':item.viewState>0}">{{item.content}}</span>
    </div>
    <div class="item_bottom">{{item.time|dealTime}}</div>
  </div>
</template>
<script>
import { filterItem, getY_M_D_H_M_S } from "@/utils/index";
import store from "@/store";
export default {
  name: "item",
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods:{
    openView(item){
      let arr = store.getters["parameter/systemAbnormalTypes"];
      let path=filterItem(arr, item.orderType).path;
      this.$router.push(path);
    }
  },
  filters: {
    dealTime(val) {
      return getY_M_D_H_M_S(val);
    },
    orderType(val) {
      let arr = store.getters["parameter/systemAbnormalTypes"];
      return filterItem(arr, val).label1;
    },
    orderState(val) {
      let arr = store.getters["parameter/systemAbnormalTypes"];
      return filterItem(arr, val).label2;
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@mixin flex {
  display: flex;
  align-items: center;
}
.message_item {
  width: 420px;
  height: 100px;
  background: #fff;
  padding: 14px 16px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;
  cursor: pointer;
  margin: 6px auto;

  .item_sign {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 36px;
    background: rgba(255, 100, 144, 1);
    border-radius: 0px 0px 4px 0px;
  }

  .item_top {
    @include flex;
    justify-content: space-between;
    .row_left {
      @include flex;
      flex-basis: 70%;
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 12px;
        .svgIcon {
          width: 100%;
          height: 100%;
        }
      }
      .orderType {
        color: #282828;
        font-size: 14px;
        font-weight: 700;
      }
    }
    .orderState {
      flex-basis: 30%;
      color: #df495e;
      font-size: 12px;
      text-align: right;
    }
  }

  .item_center {
    font-size: 10px;
    color: #666;
    text-align: right;
    margin-right: -6px;
    .isOpened {
      opacity: 0.5;
    }
  }
  .item_bottom {
    text-align: right;
    color: #bbb;
    font-size: 14px;
  }
  .orderState,
  .orderType,
  .item_center,
  .item_bottom {
    transition: all 0.2s;
  }
  &:hover {
    background: #22e17e;
    transform: scale(1.03);
    color: #fff;
    .orderState,
    .orderType,
    .item_center,
    .item_bottom {
      color: #fff !important;
    }
  }
}
</style>
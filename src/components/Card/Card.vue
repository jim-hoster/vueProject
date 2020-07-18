<template>
  <div id="card" :style="{width:setWidth}">
    <!-- 计算卡片的宽度值 -->
    <img :src="card.img" alt="卡片组件" />
    <div class="content">
      <p class="title">{{card.title}}</p>
      <p class="num">{{card.num}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({}), //此处需要加括号   箭头函数  只有一个参数时，会直接return返回
      required: true
    }
  },
  computed: {
    setWidth() {
      return (document.body.clientWidth - 500) / 4 + "px";
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";
#card {
  // width: 200px;
  height: 100px;
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
  }
  .content {
    text-align: right;
    p {
      &.title {
        font-size: @f24;
        color: rgb(133, 133, 133);
      }
      &.num {
        font-size: @f18;
      }
      & + p {
        margin-top: 20px;
      }
    }
  }
}
</style>
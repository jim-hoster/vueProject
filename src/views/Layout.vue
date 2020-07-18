<template>
  <div id="layout">
    <!-- 左侧布局 -->
    <div class="left">
      <Nav />
    </div>
    <!-- 右侧布局 -->
    <div class="right">
      <Main />
    </div>
  </div>
</template>

<script>
// 引入导航组件
import Nav from "./Layout/left/Nav.vue";
import Main from "./Layout/right/Main";
export default {
  components: {
    Nav,
    Main
  }
};
</script>

<style lang="less" scoped>
#layout {
  display: flex;
  height: 100%;
  .left {
    flex: 0 0 220px;
  }
  .right {
    flex: 1;
  }
}
</style>

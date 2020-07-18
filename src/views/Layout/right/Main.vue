<template>
  <div id="main">
    <!-- 引入顶部组件！！ -->
    <Welcome />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Welcome from "../right/header/Welcome.vue";
export default {
  components: {
    Welcome
  },
  computed: {}
};
</script>

<style lang="less" scoped>
@import "./../../../assets/css/common.less";
#main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  // box-sizing: border-box;
  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: @hcolor;
  }
}
</style>
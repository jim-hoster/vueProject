<template>
  <div id="nav">
    <div class="title">
      <img :src="title.imgSrc" alt="商家服务中心" />
      <span>{{ title.msg }}</span>
    </div>

    <el-menu
      router
      unique-opened
      :default-active="path"
      class="el-menu-vertical-demo"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#409eff"
    >
      <el-menu-item index="/home">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <el-menu-item index="/order">
        <i class="iconfont icon-dingdan"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-shangpin"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="/product/product-list">商品列表</el-menu-item>
        <el-menu-item index="/product/add-product">添加商品</el-menu-item>
        <el-menu-item index="/product/product-class">商品分类</el-menu-item>
      </el-submenu>

      <el-menu-item index="/shop">
        <i class="iconfont icon-dianpu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>

      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-zhanghao"></i>
          <span slot="title">账号管理</span>
        </template>
        <el-menu-item index="/account/account-list">账号列表</el-menu-item>
        <el-menu-item index="/account/add-account">添加账号</el-menu-item>
        <el-menu-item index="/account/change-account">修改密码</el-menu-item>
        <el-menu-item index="/account/person">个人中心</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="iconfont icon-tongji"></i>
          <span slot="title">商品统计</span>
        </template>
        <el-menu-item index="/sales/product-sale">商品统计</el-menu-item>
        <el-menu-item index="/sales/order-sale">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: {
        imgSrc: require("@/assets/images/商家.svg"),
        msg: "商家服务中心"
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    path() {
      // 判断条件中永远是判断符号，建议写成全等
      if (this.$route.path === "/order/order-edit") return "/order";
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/common.less";
#nav {
  height: 100%;
  background-color: @base;
  display: flex;
  flex-direction: column;
  .el-menu {
    border-right: none;
    .iconfont {
      font-size: @f18;
      margin-right: 10px;
    }
  }
  .title {
    margin: 20px;
    font-size: @f20;
    color: @white;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>

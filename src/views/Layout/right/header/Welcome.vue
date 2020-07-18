<template>
  <div id="header">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="val in bread"
          :to="{ path: val.path }"
          :key="val.title"
        >{{ val.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="userinfo">
        <el-dropdown>
          <span class="el-dropdown-link">
            欢迎你，{{name
            }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="person">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="exit">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 欢迎你-->
        <!-- 头像 -->
        <el-avatar size="medium" :src="imgUrl"></el-avatar>
      </div>
    </div>
  </div>
</template>

<script>
// 引入本地存储工具函数
import local from "@/utils/local";
import { personInfo } from "@/api/account";
export default {
  data() {
    return {
      name: "",
      imgUrl: "", // 头像: "",
      bread: []
      // 面包屑路由思路
      // 给每一个路由配置自定义对象，通过自定义对象可以设置一些字段，从而达到对路由的单独操作
      // 设置一个空数组，数组中添加每个路由所对应的路由标题和路由指向
      // 判断当路由的匹配值中的自定义对象存在时，将标题和路由作为一个完整对象放进数组中
      // 设定一个函数，每次进入页面的时候需要调用函数，同时当路由发生改变的时候也要调用此对象
    };
  },
  methods: {
    // 定义一个函数，获取用户个人信息，并且保存到本地存储中
    async fetchData() {
      // 直接保存到本地当中
      let res = await personInfo();
      // 解构，取出账户名字和头像，赋值给个人账户
      // let { account, imgUrl } = res;
      // 对参数进行赋值
      this.name = res.account;
      this.imgUrl = res.imgUrl;
      // 放进本地存储中
      local.set("personInfo", res);
    },

    breadFn() {
      // 定义空数组
      let arr = [{ title: "首页", path: "/home" }];
      this.$route.matched.forEach(v => {
        if (v.meta && v.meta.title) {
          arr.push({ title: v.meta.title, path: v.path });
        }
      });
      this.bread = arr;
    },
    person() {
      this.$router.push("/account/person");
    },
    exit() {
      this.$confirm("此操作将退出当前账号, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        center: true
      }).then(() => {
        // 清除本地存储
        local.clear();
        this.$message({
          type: "success",
          message: "账号已退出!"
        });
        // 跳转到登录页面
        this.$router.push("/login");
      });
    }
  },
  created() {
    // 进入页面调用函数
    this.breadFn();
    // 进入页面，将数组存储到本地
    this.fetchData();

    // 接收事件通知
    this.$bus.$on("update_avatar", () => {
      this.fetchData();
    });
  },

  // 监听函数
  // 当页面路由发生改变时，渲染数据！
  watch: {
    "$route.path"() {
      this.breadFn();
    }
  }
};
</script>

<style lang="less" scoped>
#header {
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 60px;

  .header {
    width: 100%;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 30px;
    .el-dropdown {
      cursor: pointer;
    }
    .userinfo {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 20px;
      }
    }
  }
}
</style>

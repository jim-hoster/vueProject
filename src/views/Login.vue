<template>
  <div id="box">
    <div id="login">
      <h1>系统登录</h1>
      <el-form
        :model="loginForm"
        :rules="loginRule"
        status-icon
        ref="loginForm"
        label-width="40px"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="loginForm.account"
            auto-complete="off"
            placeholder="请输入您的用户名"
            prefix-icon="iconfont icon-yonghu"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            @click.native="Open"
            @keydown.native.enter="submitForm('loginForm')"
            :suffix-icon="isOpen ? 'iconfont icon-yanjing_kai':' iconfont icon-yanjing_bi'"
            :type="isOpen?'text':'password'"
            v-model.number="loginForm.password"
            auto-complete="off"
            placeholder="请输入您的密码"
            prefix-icon="iconfont icon-mima"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 正则表达引入
import { USER_REG, PWD_REG } from "../utils/reg.js";
// ajax业务模块引入
import { login } from "@/api/login";
// 本地存储工具函数
import local from "@/utils/local.js";

export default {
  data() {
    // callback结果回调函数，必传参数
    // 用户名自定义验证
    const checkUser = (rule, val, callback) => {
      // 非空判断
      if (!val) {
        return callback(new Error("请输入用户名"));
      } else if (!USER_REG.test(val)) {
        return callback(new Error("4到16位（字母，数字，下划线,中文）"));
      } else {
        return callback();
      }
    };
    // 密码自定义验证
    const checkpassword = (rule, val, callback) => {
      // 非空判断
      if (!val) {
        return callback(new Error("请输入密码"));
      } else if (!PWD_REG.test(val)) {
        return callback(
          new Error("最少6位，包括至少1个大写字母，1个小写字母，1个数字")
        );
      } else {
        return callback();
      }
    };

    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRule: {
        account: [{ validator: checkUser, required: true, trigger: "blur" }],
        password: [
          { validator: checkpassword, required: true, trigger: "blur" }
        ]
      },
      isOpen: false
    };
  },

  methods: {
    submitForm(loginForm) {
      // debugger;
      this.$refs[loginForm].validate(async valid => {
        if (valid) {
          // 对业务模块返回的数据直接进行结构
          let { code, msg, role, token } = await login(this.loginForm);
          if (code == 0) {
            // 成功登录，将指令牌存入本地存储
            local.set("pass", token);
            // ui框架提示信息设置
            // this.$message({ type: "success", message: msg });
            // 跳转到首页
            this.$router.push("/");
          }
          // 测试阶段提示
          // this.$notify({
          //   title: "进入首页",
          //   message: "恭喜您登陆成功",
          //   type: "success"
          // });
        } else {
          alert("抱歉，登录失败，请稍后重试");
          return false;
        }
      });
    },
    Open(e) {
      if (e.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/common.less";

#box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: @base;
  background: url("../assets/images/bgimg.jpg") no-repeat;
  background-size: 100% 100%;
  .el-form-item__label {
    color: white;
  }
  #login {
    width: 600px;
    height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    h1 {
      color: @blue;
      position: relative;
      left: 15px;
    }
    .el-input {
      width: 360px;
      /deep/.iconfont {
        font-size: 20px;
      }
    }

    .el-button--primary {
      display: inline-block;
      width: 360px;
      font-size: @f18;
    }
  }
}
</style>

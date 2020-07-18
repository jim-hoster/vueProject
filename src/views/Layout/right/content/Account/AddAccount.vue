<template>
  <div id="cheackAcc">
    <Panel>
      <span slot="header">添加账号</span>
      <div slot="content">
        <el-form
          :model="addAccount"
          :rules="addRule"
          ref="addAccount"
          style="width:350px"
          size="small"
          label-width="100px"
          status-icon
        >
          <!-- 账号项 -->
          <el-form-item label="账号" prop="account">
            <el-input v-model="addAccount.account"></el-input>
          </el-form-item>

          <!-- 密码项 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="addAccount.password"></el-input>
          </el-form-item>
          <!-- 用户组项 -->
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="addAccount.userGroup">
              <el-option value="超级管理">超级管理员</el-option>
              <el-option value="普通管理">普通管理员</el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="submitForm">添加</el-button>
            <el-button size="small" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Panel>
  </div>
</template>

<script>
//引入面板组件
import Panel from "@/components/Panel/Panel.vue";
//引入两个正则表达式
import { USER_REG, PWD_REG } from "@/utils/reg.js";
// 引入添加账号业务模块

import { addAccount } from "@/api/account";
export default {
  data() {
    // 此处放validator自定义验证规则
    // 函数体内，不需要用this去指向

    // 用户名自定义验证规则
    const checkAcc = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入账号")); //非空判断
      } else if (!USER_REG.test(val)) {
        callback(new Error("4到16位（字母，数字，下划线"));
      } else {
        callback();
        // 成功时必须回调反馈
      }
    };
    // 用户名自定义验证规则
    const checkpassword = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入密码")); //非空判断
      } else if (!PWD_REG.test(val)) {
        callback(
          new Error("最少6位，包括至少1个大写字母，1个小写字母，1个数字")
        );
      } else {
        callback(alert());
      }
    };
    return {
      addAccount: { account: "", password: "", userGroup: "" },
      //   验证规则
      addRule: {
        account: {
          validator: checkAcc,
          required: true,
          trigger: "blur"
        },
        password: {
          validator: checkpassword,
          required: true,
          trigger: "blur"
        },
        userGroup: {
          required: true,
          trigger: "change"
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addAccount.validate(async valid => {
        if (valid) {
          // 对返回内容进行结构
          let { code, msg } = await addAccount(this.addAccount);
          if (code === 0) {
            this.$router.push("/account/account-list");
          }
        }
      });
    },
    resetForm() {
      // 获取表单dom节点
      this.$refs.addAccount.resetFields();
    }
  },
  components: {
    // 注册组件
    Panel
  }
};
</script>

<style lang="less" scoped>
</style>
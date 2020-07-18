<template>
  <div id="cheackAcc">
    <Panel>
      <span slot="header">修改密码</span>
      <div slot="content">
        <el-form
          :model="changePwd"
          :rules="changeRule"
          ref="changePwd"
          style="width:350px"
          size="small"
          label-width="100px"
          status-icon
        >
          <!-- 账号项 -->
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="changePwd.oldPwd" ref="old"></el-input>
          </el-form-item>

          <!-- 密码项 -->
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="changePwd.newPwd"></el-input>
          </el-form-item>
          <!-- 用户组项 -->
          <el-form-item label="确认新密码" prop="confirmPwd">
            <el-input v-model="changePwd.confirmPwd"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="submitForm">修改</el-button>
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
import { PWD_REG } from "@/utils/reg.js";
// 引入业务模块
import { checkOldPwd, editPwd } from "@/api/account";
export default {
  data() {
    // 此处放validator自定义验证规则
    // 函数体内，不需要用this去指向
    const checkOld = async (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入原始密码"));
      } else {
        let { code, msg } = await checkOldPwd({
          oldPwd: val
        });
        //  发送ajax
        if (code === "11") {
          this.$refs.old.focus();
          val = "";
          // 回调函数执行错误信息
          callback(new Error(msg));
        } else {
          callback();
        }
      }
    };

    const checkNew = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入新密码"));
      } else if (!PWD_REG.test(val)) {
        callback(
          new Error("最少6位，包括至少1个大写字母，1个小写字母，1个数字")
        );
      } else {
        if (this.changePwd.confirmPwd != "")
          // 如果确认密码不为空，重新激活反验证事件
          this.$refs.changePwd.validateField("confirmPwd");
      }
      callback();
    };

    // 确认新密码
    const checkConfirm = (rule, val, callback) => {
      if (!val) {
        callback(new Error("确认密码未输入"));
      } else if (val !== this.changePwd.newPwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      changePwd: { oldPwd: "", newPwd: "", confirmPwd: "" },
      //   验证规则
      changeRule: {
        oldPwd: {
          validator: checkOld,
          required: true,
          trigger: "blur"
        },
        newPwd: {
          validator: checkNew,
          required: true,
          trigger: "blur"
        },
        confirmPwd: {
          validator: checkConfirm,
          required: true,
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    resetForm() {
      // 获取表单dom节点
      this.$refs.changePwd.resetFields();
    },

    async submitForm() {
      // 发送修改新密码
      let { code } = await editPwd({ newPwd: this.changePwd.newPwd });
      // 正常修改，跳转到账号列表
      if (code === 0) {
        this.$router.push("/login");
      }
    }
  },
  components: {
    // 注册组件
    Panel
  }
};
</script>

<style lang="less" scoped></style>

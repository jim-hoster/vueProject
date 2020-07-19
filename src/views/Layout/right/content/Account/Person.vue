<template>
  <div id="person">
    <Panel>
      <span slot="header">管理员信息</span>
      <div slot="content" class="content">
        <ul>
          <li>
            管理员ID：
            <span>{{person.id}}</span>
          </li>
          <li>
            账号：
            <span>{{person.account}}</span>
          </li>
          <li>
            用户组：
            <span>{{person.userGroup}}</span>
          </li>
          <li>
            创建时间：
            <span>{{person.ctime| filter(person.ctime)}}</span>
          </li>
          <li>
            管理员头像：
            <span>
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/users/avatar_upload"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
              >
                <img v-if="imgUrl" :src="imgBaseUrl+imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button
                type="primary"
                size="mini"
                style="margin-top:20px"
                @click="handleEditAvatar"
              >上传头像</el-button>
            </span>
          </li>
        </ul>
      </div>
    </Panel>
  </div>
</template>

<script>
// 引入面板组件
import Panel from "@/components/Panel/Panel.vue";
import local from "../../../../../utils/local";
// 采用dayjs优化时间函数，相比moment更轻量
// import moment from "moment";
let day = require("dayjs");
import { avatarEdit } from "@/api/account";
export default {
  data() {
    return {
      person: {
        id: "",
        account: "",
        userGroup: "",
        ctime: ""
      },
      imgUrl: "", //图片名称
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/" // 图片所在服务的文件夹的位置【目录】
    };
  },
  methods: {
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    //   const isLt10M = file.size / 1024 / 1024 < 10;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
    //   }
    //   if (!isLt10M) {
    //     this.$message.error("上传头像图片大小不能超过 10MB!");
    //   }
    //   return isJPG && isLt10M;
    // },
    // 后台接受数据
    handleAvatarSuccess(res) {
      //上传组件定义的函数，成功后的反馈
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.imgUrl = imgUrl;
      }
    },
    // 给后台发送数据库发送头像文件
    async handleEditAvatar() {
      let { code } = await avatarEdit({ imgUrl: this.imgUrl });
      if (code === 0) {
        this.$bus.$emit("update_avatar");
      }
    }
  },
  //   页面打开时，进行渲染
  created() {
    this.person = local.get("personInfo");
  },
  // 注册面板组件
  components: {
    Panel
  },
  filters: {
    filter(val) {
      return day(val).format("YYYY年MM月DD日");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/css/common.less";
#person {
  .content {
    /deep/.avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    li {
      padding: 15px 0;
      display: flex;
      align-items: center;
      & + li {
        border-top: 1px solid @hcolor;
      }
      span {
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
}
</style>
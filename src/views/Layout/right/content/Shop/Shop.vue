<template>
  <div id="shop" class="container-fluid">
    <Panel>
      <div slot="header" class="header">
        <span>店铺管理</span>
        <el-button
          :type="isEdit?'success':'primary'"
          @click="submit"
          size="small"
        >{{ isEdit ? '保存' : '编辑' }}</el-button>
      </div>
      <!-- 内容区 -->
      <div slot="content" class="content">
        <el-form
          :model="shopData"
          ref="shopAccount"
          style="width:350px"
          size="small"
          label-width="100px"
          :disabled="!isEdit"
        >
          <!-- 店铺名称 -->
          <el-form-item label="店铺名称">
            <el-input v-model="shopData.name"></el-input>
          </el-form-item>
          <!-- 店铺公告 -->
          <el-form-item label="店铺公告">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="shopData.  bulletin"></el-input>
          </el-form-item>

          <!-- 店铺头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action="http://127.0.0.1:5000/shop/upload"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="shopData.avatar" :src="shopData.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 店铺图片 -->
          <el-form-item label="店铺图片">
            <el-upload
              :file-list="shopData.pics"
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-success="handleImgSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>

          <!-- 店铺配送费 -->
          <el-form-item label="配送费">
            <el-input v-model="shopData.deliveryPrice"></el-input>
          </el-form-item>
          <!-- 配送时间！ -->
          <el-form-item label="配送时间">
            <el-input v-model="shopData.deliveryTime"></el-input>
          </el-form-item>

          <el-form-item label="配送描述">
            <el-input v-model="shopData.description"></el-input>
          </el-form-item>

          <el-form-item label="店铺评分">
            <el-input v-model="shopData.score"></el-input>
          </el-form-item>

          <el-form-item label="销量">
            <el-input v-model="shopData.sellCount"></el-input>
          </el-form-item>

          <!-- 活动 -->
          <el-form-item label="活动">
            <el-checkbox-group v-model="shopData.supports">
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
              <el-checkbox label="多人精彩套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              arrow-control
              v-model="shopData.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>

          <el-form-item label="起送价格">
            <el-input v-model="shopData.minPrice"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </Panel>
  </div>
</template>

<script>
// 面板组件引入
import Panel from "@/components/Panel/Panel.vue";
// 引入业务模块接口
import { getShopInfo, shopEdit } from "@/api/shop";
export default {
  data() {
    return {
      shopData: {
        name: "",
        bulletin: "",
        // 头像
        avatar: "",
        // 图片
        pics: [],
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: [],
        date: []
      },
      // 模态框
      dialogVisible: false,
      dialogImageUrl: "",
      baseImgUrl: "http://127.0.0.1:5000/upload/shop/", // 图片所在服务器目录
      isEdit: false
    };
  },
  methods: {
    // 获取店铺数据
    async fetchData() {
      let { data } = await getShopInfo();

      // 处理图片显示问题
      data.avatar = this.baseImgUrl + data.avatar;
      data.pics = data.pics.map(v => ({
        url: this.baseImgUrl + v
      }));
      // 数据渲染
      this.shopData = data;
    },

    // 上传前的判断与限制条件执行
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt10M;
    },
    // 头像上传成功后的函数反馈
    handleAvatarSuccess(res) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.shopData.avatar = this.baseImgUrl + imgUrl;
      }
    },
    // 图片墙上传成功后的反馈
    handleImgSuccess(res) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.shopData.pics.push({ url: this.baseImgUrl + imgUrl });
      }
    },
    // 图片查看
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片删除
    handleRemove(file) {
      this.shopData.pics.forEach((v, i) => {
        if (v.uid === file.uid) {
          this.shopData.pics.splice(i, 1);
        }
      });
    },
    // 保存店铺内容修改
    async submit() {
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        console.log(1);
        let arr = this.shopData.pics.map(v =>
          v.url.substr(this.baseImgUrl.length)
        );
        // 保存店铺修改信息
        let { code } = await shopEdit({
          id: 1,
          name: this.shopData.name,
          bulletin: this.shopData.bulletin,
          avatar: this.shopData.avatar.substr(this.baseImgUrl.length),
          deliveryPrice: this.shopData.deliveryPrice,
          deliveryTime: this.shopData.deliveryTime,
          description: this.shopData.description,
          score: this.shopData.score,
          sellCount: this.shopData.sellCount,
          supports: JSON.stringify(this.shopData.supports),
          date: JSON.stringify(this.shopData.date),
          pics: JSON.stringify(arr)
        });
        //如果成功，直接跳转到首页
        if (code === 0) {
          this.$router.push("/");
        }
      }
    }
  },
  created() {
    this.fetchData();
  },
  components: {
    Panel
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/css/common.less";

#shop {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
    .pagination {
      margin: 10px 0;
    }
  }
}
</style>

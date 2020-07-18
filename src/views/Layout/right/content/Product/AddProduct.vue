<template>
  <div id="product-class">
    <Panel>
      <div slot="header" class="header">商品添加</div>
      <div slot="content" class="content">
        <el-form
          :model="addProduct"
          ref="addProduct"
          style="width:350px"
          size="small"
          label-width="100px"
        >
          <el-form-item label="商品名称">
            <el-input v-model="addProduct.name" style="width:196px" placeholder="请输入商品名称"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <el-select v-model="addProduct.category" placeholder="请选择商品分类">
              <el-option
                v-for="cate in categories"
                :key="cate.cateName"
                :value="cate.cateName"
              >{{ cate.cateName }}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input-number v-model="addProduct.price" :min="1" :max="10000"></el-input-number>
          </el-form-item>

          <el-form-item label="商品图片">
            <!-- 商品图片上传组件 -->
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              class="avatar-uploader"
            >
              <img v-if="addProduct.imgUrl" :src="imgBaseUrl+ addProduct.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入商品描述"
              v-model="addProduct.goodsDesc"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="submitForm">添加商品</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Panel>
  </div>
</template>

<script>
// 面板组件引入
import Panel from "@/components/Panel/Panel.vue";
import { getCateNames, addProduct } from "@/api/product";
export default {
  data() {
    return {
      // isOpen: true,
      addProduct: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: ""
      },
      categories: [], //商品分类名称
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/" // 图片所在服务的文件夹的位置【目录】
    };
  },
  components: {
    Panel
  },
  methods: {
    // 上传之前限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png"; // 限制类型
      const isLt10M = file.size / 1024 / 1024 < 10; // 限制大小

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt10M;
    },
    // ajax发送图片成功 后端响应数据 在此函数接收
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      console.log(imgUrl);

      if (code === 0) {
        this.$message({ type: "success", message: msg }); // 弹出成功提示
        this.addProduct.imgUrl = imgUrl; // 回填图片
      }
    },

    // 添加商品
    async submitForm() {
      let { code } = await addProduct(this.addProduct); // 发送添加商品请求
      if (code === 0) {
        this.$router.push("/product/product-list"); // 添加成功 跳转到商品列表
      }
    }
  },
  async created() {
    // 发送ajax请求 获取所有分类名称
    let { categories } = await getCateNames();
    this.categories = categories; // 赋值渲染
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/css/common.less";

#product-class {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: @f18;
  }
  .content {
    .pagination {
      margin: 10px 0;
    }
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
      width: 120px;
      height: 120px;
      display: block;
    }
  }
}
</style>

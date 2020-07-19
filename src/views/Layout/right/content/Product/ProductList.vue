<template>
  <div id="productList">
    <Panel>
      <div slot="header" class="header">
        <span>商品列表</span>
        <el-form :model="search" style="width:320px">
          <el-form-item label="分类查询" label-width="70px">
            <el-input
              v-model="search.category"
              placeholder="输入商品分类名即可查询"
              @keydown.native.enter="searchForm"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button size="small" type="primary" @click.native="searchForm">查询</el-button>
        <el-button size="small" type="primary" @click.native=" resetForm">重置</el-button>
      </div>
      <div class="content" slot="content">
        <el-table :data="productData" :style="{width:setWidth}" highlight-current-row>
          <!-- 外层-->
          <!-- 商品名称 -->
          <el-table-column type="expand">
            <!-- 快级作用域插槽 -->
            <template slot-scope="props">
              <!-- 内层内容 -->
              <el-form label-position="left" inline class="demo-table-expand">
                <!-- 商品ID -->
                <el-form-item label="商品ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <!-- 商品名称 -->
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <!-- 所属分类 -->
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>

                <!-- 商品价格-->
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>

                <!-- 商品图片 -->
                <el-form-item label="商品图片">
                  <img :src="imgBaseUrl+props.row.imgUrl" width="30px" />
                </el-form-item>

                <!-- 创建时间 -->
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>

                <!-- 商品评价 -->
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>

                <!-- 商品销量 -->
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>

                <!-- 商品描述 -->
                <el-form-item label="商品描述">
                  <span>{{ props.row.productDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <!-- 所属分类 -->
          <el-table-column label="所属分类" prop="category" width="180px"></el-table-column>

          <!-- 商品价格 -->
          <el-table-column label="商品价格" prop="price" width="100px"></el-table-column>

          <!-- 商品图片 -->
          <el-table-column label="商品图片" width="130px">
            <template slot-scope="scope">
              <img width="50" height="50" :src="imgBaseUrl + scope.row.imgUrl" alt />
            </template>
          </el-table-column>

          <!-- 商品描述 -->
          <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          style="margin-top: 30px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10,10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </Panel>
  </div>
</template>

<script>
// 面板组件引入
import Panel from "@/components/Panel/Panel.vue";
import { getProductList, delProduct } from "@/api/product";
// 时间处理库引入
let day = require("dayjs");
export default {
  data() {
    return {
      productData: [],
      currentPage: 1, // 当前页
      pageSize: 10, // 每页条数
      total: 0, // 总条数

      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/", // 图片所在服务的文件夹的位置【目录】
      search: {
        category: ""
      }
    };
  },
  methods: {
    // 获取商品列表
    // 三次渲染
    async fetchData() {
      let { total, data } = await getProductList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        // 去除两端空白
        category: (this.search.category = this.search.category.trim())
      });

      // 处理ctime时间格式
      data.forEach(v => {
        v.ctime = day(v.ctime).format("YYYY-MM-DD HH:mm:ss");
      });
      // 边界判断 如果当前页码没有数据了 且 当前页码不是第一页
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1; // 页码-1
        this.fetchData(); // 重新获取数据
      }

      // 部分字段做显示处理
      // 商品价格
      data.forEach(v => {
        v.price = v.price + "元";
      });
      // 商品销量
      data.forEach(v => {
        v.sellCount = v.sellCount + "个";
      });

      // 赋值渲染
      this.total = total;
      this.productData = data;
    },
    // 当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },

    // 每页条数改变
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    // 删除商品
    async handleDelete(id) {
      let { code } = await delProduct({ id });
      // 删除成功，重新获取页面数据
      if (code === 0) {
        this.fetchData();
      }
    },
    // 查询
    searchForm() {
      this.currentPage = 1;
      this.fetchData();
    },
    // 重置
    resetForm() {
      this.currentPage = 1;
      this.search = {
        category: ""
      };
      this.searchForm();
    }
  },

  components: {
    Panel
  },
  created() {
    this.fetchData(); // 重新获取数据
  },
  computed: {
    setWidth() {
      return document.body.clientWidth - 360 + "px";
    }
  }
};
</script>

<style lang="less" scoped>
#productList {
  height: 100%;
  .header {
    display: flex;
    align-items: center;
    .el-form-item {
      margin: 0 20px;
    }
  }
  .content {
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}
</style>
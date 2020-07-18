<template>
  <Panel>
    <span slot="header" class="header">
      <span>商品分类</span>
      <el-button type="primary" size="small" @click="addClass">添加分类</el-button>
    </span>
    <div slot="content">
      <!-- 表格 -->
      <el-table :data="tableData">
        <!-- 序号 -->
        <el-table-column type="index" label="序号" width="120px"></el-table-column>

        <!-- 分类名称 -->
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <!-- 文字 不可编辑 -->
            <span v-if="!scope.row.isEdit">{{ scope.row.cateName }}</span>

            <!-- 输入框 可以编辑 -->
            <el-input v-else size="mini" v-model="scope.row.cateName" />
          </template>
        </el-table-column>

        <!-- 是否启用 -->
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.isEdit ? false : true"
              v-model="scope.row.state"
              active-color="#13ce66"
            ></el-switch>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row)"
              size="small"
              :type="scope.row.isEdit ? 'success' : 'primary'"
            >{{ scope.row.isEdit ? '完成' : '编辑' }}</el-button>
            <el-button size="small" type="danger" @click="handleDele(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 30px;"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 编辑模态框 -->
      <el-dialog title="添加分类" :visible.sync="visible" width="360px">
        <el-form :model="dialogForm">
          <el-form-item label="分类名称" label-width="70px">
            <el-input v-model="dialogForm.cateName" placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <!-- 是否启用 -->
          <el-form-item label="是否启用">
            <el-switch v-model="dialogForm.state" active-color="#13ce66"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveClass">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
import {
  getProductCateList,
  editCate,
  delProductClass,
  addProductClass
} from "@/api/product";

export default {
  components: {
    Panel
  },

  data() {
    return {
      tableData: [], // 表格数据
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页条数
      total: 28, // 总条数
      visible: false, //模态框显示隐藏
      dialogForm: {
        cateName: "",
        state: false
      }
    };
  },

  methods: {
    // 编辑
    async handleEdit(row) {
      row.isEdit = !row.isEdit; // 改变当前行状态

      if (!row.isEdit) {
        // 发送修改请求
        let { code } = await editCate({
          id: row.id,
          cateName: row.cateName,
          state: row.state
        });

        if (code == 0) {
          this.fetchData(); // 刷新
        }
      }
    },
    //删除商品分类
    async handleDele(id) {
      let { code } = await delProductClass({ id });
      if (code === 0) {
        this.fetchData();
      }
    },

    // 获取数据
    async fetchData() {
      let { total, data } = await getProductCateList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      // 处理数据
      data.forEach(v => {
        v.state = v.state == 1 ? true : false;
        v.isEdit = false; // 每一条数据 添加一个是否可以编辑的状态
      });

      // 赋值渲染
      this.total = total;
      this.tableData = data;
    },

    // 当前页码改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    // 添加分类
    addClass() {
      this.visible = true;
    },
    // 保存分类名称
    async saveClass() {
      // alert(1);
      // 发送数据给后台
      let { code } = await addProductClass(this.dialogForm);
      if (code === 0) {
        this.fetchData();
        this.visible = false;
      }
    }
  },

  created() {
    this.fetchData(); // 进入页面就调用
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
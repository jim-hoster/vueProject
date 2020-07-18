<template>
  <div id="cheackAcc">
    <Panel>
      <span slot="header">账号列表</span>
      <div slot="content">
        <el-table
          :data="accountData"
          @selection-change="handleSectionChange"
          ref="accTable"
          :style="{width:setWidth}"
        >
          <!-- 顶部选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 账号 -->
          <el-table-column prop="account" label="账号" width="180"></el-table-column>

          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>

          <!-- 创建时间 -->
          <el-table-column prop="ctime" label="创建时间" width="240"></el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <!--ele-ui内部使用了作用域插槽  scope为整个作用域插槽  -->

            <template slot-scope="scope">
              <!-- scope.row选择每一条数据，获取整个数据所包含的信息，方便编辑时调用 -->

              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="pagination"
        ></el-pagination>

        <!-- 批量删除 -->
        <div style="margin-top: 20px">
          <el-button @click="batchDel" type="danger">批量删除</el-button>
          <el-button @click="cancelSelect" type="primary">取消选择</el-button>
        </div>

        <!-- 编辑模态框 -->

        <el-dialog title="账号编辑" :visible.sync="visible" width="360px">
          <el-form :model="form">
            <el-form-item label="账号名称" label-width="100px" style="width:290px">
              <el-input v-model="form.account"></el-input>
            </el-form-item>

            <el-form-item label="用户管理组" label-width="100px">
              <el-select v-model="form.userGroup">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </Panel>
  </div>
</template>

<script>
//引入面板组件
import Panel from "@/components/Panel/Panel.vue";
// 引入业务模块发送后端数据模块
import {
  accountList,
  editAccount,
  delAccount,
  batchdelAccount
} from "@/api/account";

// 引入时间处理函数
import day from "day";
export default {
  data() {
    return {
      accountData: [], //数据库获取到的后台数据
      currentPage: 1, //当前页码
      pageSize: 10, //每页条数
      total: 0, //总条数
      form: { name: "", region: "" },
      // 控制编辑模态框显示隐藏
      visible: false
    };
  },
  methods: {
    // 获取业务数据，并渲染到页面函数
    async fetchData() {
      // 获取后台数据
      let { total, data } = await accountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      // 处理ctime时间格式
      data.forEach(v => {
        v.ctime = day().format("YYYY年MM月DD日");
      });

      // 后台数据以分页形式传递，如果传入的当前页面没有数据，页面就会显示无数据，为了解决这一问题，可以
      // 判断当当前数据数组长度不存在，同时页面不是1的时候，就让页面自减1
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.fetchData();
      }

      // 页面数据和总条数进行渲染
      this.total = total;
      this.accountData = data;
    },

    // 单次删除账号
    handleDelete(id) {
      this.$confirm("账号删除后将无法找回", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await delAccount({ id });
          if (code === 0) {
            this.fetchData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 当选项发生改变时调用的函数，传入每一个节点，找出有id的行，形成一个新的值
    handleSectionChange(rows) {
      // 将有id的选项挂载的实例vue中
      if (rows) {
        this.ids = rows.map(v => v.id);
      }
    },

    // 批量删除
    batchDel() {
      // 优化删除体验
      if (!this.ids) {
        this.$message.error("请选中后进行操作");
        return;
      }

      // 优化删除体验
      this.$confirm("删除后无法账号无法撤回！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送批量删除请求
          let { code } = await batchdelAccount({
            ids: JSON.stringify(this.ids)
          });
          if (code === 0) {
            this.fetchData(); // 刷新
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 取消选择
    cancelSelect() {
      this.$refs.accTable.clearSelection();
    },

    // 打开编辑模态框
    handleEdit(row) {
      this.visible = true;
      // 账号回填
      this.form = { ...row };
    },

    // 保存编辑
    async saveEdit() {
      let { code } = await editAccount({
        id: this.form.id,
        account: this.form.account,
        userGroup: this.form.userGroup
      });
      if (code == 0) {
        //刷新页面
        this.fetchData();
        // 关闭模态框
        this.visible = false;
      }
    },

    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData(); // 第三次： 每页条数改变 调用1次
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData(); // 第二次： 当前页码改变调用1次
    }
  },
  created() {
    this.fetchData();
  },
  // 组件注册功能
  components: {
    // 注册组件
    Panel
  },
  // 属性计算工具
  computed: {
    setWidth() {
      return document.body.clientWidth - 320 + "px";
    }
  }
};
</script>

<style lang="less" scoped>
#cheackAcc {
  .pagination {
    margin: 10px 0;
  }
}
</style>

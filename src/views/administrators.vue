<template>
  <div>
    <!-- 用户管理 -->

    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-input v-model="input" class="searcon" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="showAdd">新增</el-button>
    </div>

    <!-- table 列表-->
    <!-- selection-change 设置前面选框的
      tooltip-effect 表格样式
     v-loading 加载
    -->
    <el-table
      ref="multipleTable"
      :data="newList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="show"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="id" width="160" prop="id"></el-table-column>
      <el-table-column prop="username" label="用户名" width="220"></el-table-column>
      <el-table-column prop="password" label="密码" width="220"></el-table-column>
      <el-table-column prop="phone" label="电话" width="220"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="220"></el-table-column>

      <el-table-column min-width="100"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="success" plain @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="change"
        :total="total"
        style="position:fixed;bottom:4%;right:0"
      ></el-pagination>
    </div>
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm">
        <el-form-item prop="name">
          <el-input v-model="addForm.name" auto-complete="off" placeholder="请输入用户名 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="addForm.pwd" auto-complete="off" placeholder="请输入密码 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off" placeholder="请输入手机号 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="addForm.email" auto-complete="off" placeholder="请输入邮箱 " clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </el-dialog>
    <!--编辑 -->
    <el-dialog title="编辑" :visible.sync="editdialogVisible" width="30%">
      <el-form :model="editForm" ref="editForm">
        <el-form-item prop="username">
          <el-input v-model="editForm.username" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="editForm.password" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="editForm.email" auto-complete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { success, error, listCode } from "../assets/common/js/request";
export default {
  data() {
    return {
      input: "", //搜索框内容
      tableData: [], //存放拿到的数据
      multipleSelection: [], //可以多勾选
      show: false,
      total: 1, //总页数
      pg: 1, //默认选中的页数
      // 新增 相关初始化数据
      addForm: {
        name: "",
        pwd: "",
        phone: "",
        email: "",
      },
      dialogVisible: false, //新增页面的显示
      // 验证规则
      addFormRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
      // 编辑 相关初始化数据
      editdialogVisible: false,
      editForm: {
        username: "",
        password: "",
        phone: "",
        email: "",
      },
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //   分也-监听页面改变
    change(page) {
      // console.log(page);
      this.pg = page;
    },
    //  显示新增页面
    showAdd() {
      this.dialogVisible = true;
    },
    //   提交新增数据
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let username = this.addForm.name;
          //   console.log(this.addForm.name)
          let password = this.addForm.pwd;
          let phone = this.addForm.phone;
          let email = this.addForm.email;
          this.$axios
            .post(
              "admin/user/add",
              {
                username,
                password,
                phone,
                email,
              },
              { timeout: 1000 * 6 }
            )
            .then((res) => {
              success(res, { ok: "添加成功", no: "添加失败" });
              this.dialogVisible = false;
              let ref = setTimeout(() => {
                this.$router.go(0);
                clearTimeout(ref);
              }, 1000);
            })
            .catch((err) => {
              error(err);
              this.dialogVisible = false;
            });
        }
      });
    },
    //   s删除
    del(id) {
      // console.log(id);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning",
      }).then(() => {
        this.$axios
          .post("admin/user/del", {
            id: id,
          })
          .then((res) => {
            success(res, { ok: "删除成功", no: "删除失败请检查数据" });
            let ref = setTimeout(() => {
              this.$router.go(0);
              clearTimeout(ref);
            }, 1000);
          })
          .catch((err) => {
            error(err);
          });
      });
    },
    //   编辑
    edit(row) {
      this.editdialogVisible = true;
      this.editForm = row;
      console.log(this.editForm);
    },
    // 编辑提交
    editSubmit() {
      let newForm = this.editForm;
      this.$axios
        .post("admin/user/update", newForm)
        .then((res) => {
          console.log(res);
          success(res, { ok: "修改成功", no: "修改失败" });
          this.editdialogVisible = false;
        })
        .catch((err) => {
          error(err);
          this.editdialogVisible = false;
        });
    },
  },
  // 列表遍历
  mounted() {
    this.show = true;
    this.$axios
      .post("admin/user")
      .then((res) => {
        // console.log(res);
        this.tableData = listCode(res).data;
        this.show = false;
      })
      .catch((err) => {
        this.show = false;
      });
  },
  // 分页
  computed: {
    newList() {
      let page = this.pg;
      let total = this.total;
      if (page == 1) {
        return this.tableData.slice(0, 10);
      }
      if (page == 2) {
        return this.tableData.slice(10, 20);
      }
      if (page == 3) {
        return this.tableData.slice(20, 30);
      }
      return this.tableData.slice(30, total);
    },
  },
};
</script>
<style scoped>
.search {
  width: 350px;
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
}
.searcon {
  width: 70%;
}
.page {
  text-align: center;
}
</style>
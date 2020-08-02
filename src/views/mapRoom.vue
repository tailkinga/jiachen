<template>
  <div>
    <div class="nav" style="margin:20px 0;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>房源管理</el-breadcrumb-item>
        <el-breadcrumb-item>地图找房</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="search">
      <el-button type="primary" @click="showAdd">新增</el-button>
    </div>
    <!-- table 列表-->
    <el-table
      ref="multipleTable"
      :data="newList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column label="id" width="80" type="index"></el-table-column>
      <el-table-column prop="title" label="房屋简介" width="150"></el-table-column>
      <el-table-column prop="city" label="所在城市" width="150"></el-table-column>
      <el-table-column prop="lng" label="经度" width="150"></el-table-column>
      <el-table-column prop="lat" label="纬度" width="150"></el-table-column>
      <el-table-column prop="price" label="最低价格" width="150"></el-table-column>
      <el-table-column min-width="50"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="success" plain @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row)">
            <el-button type="danger" style="margin-left:10px " plain slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="change"
        :page-size="10"
        :total="total"
        style="position:fixed;bottom:4%;right:0"
      ></el-pagination>

      <!-- 新增 -->
      <el-dialog title="新增" :visible.sync="addMap" width="30%">
        <el-form :model="addForm" :rules="addFormRules" ref="addForm">
          <el-form-item prop="title">
            <el-input v-model="addForm.title" auto-complete="off" placeholder="房屋简介 " clearable></el-input>
          </el-form-item>
          <el-form-item prop="city">
            <el-input v-model="addForm.city" auto-complete="off" placeholder="所在城市 " clearable></el-input>
          </el-form-item>
          <el-form-item prop="lng">
            <el-input v-model="addForm.lng" auto-complete="off" placeholder="经度 " clearable></el-input>
          </el-form-item>
          <el-form-item prop="lat">
            <el-input v-model="addForm.lat" auto-complete="off" placeholder="纬度 " clearable></el-input>
          </el-form-item>
          <el-form-item prop="price">
            <el-input v-model="addForm.price" auto-complete="off" placeholder="最低价格 " clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addMap = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
      </el-dialog>

      <!-- x修改 -->
      <el-dialog title="修改" :visible.sync="editMap" width="30%">
        <el-form :model="editForm" :rules="addFormRules" ref="editForm">
          <el-form-item prop="title">
            <el-input v-model="editForm.title" auto-complete="off" placeholder="房屋简介 " clearable></el-input>
          </el-form-item>
          <el-form-item prop="city">
            <el-input v-model="editForm.city" auto-complete="off" placeholder="所在城市 " clearable></el-input>
          </el-form-item>
          <el-form-item prop="lng">
            <el-input v-model="editForm.lng" auto-complete="off" placeholder="经度 " clearable></el-input>
          </el-form-item>
          <el-form-item prop="lat">
            <el-input v-model="editForm.lat" auto-complete="off" placeholder="纬度 " clearable></el-input>
          </el-form-item>
          <el-form-item prop="price">
            <el-input v-model="editForm.price" auto-complete="off" placeholder="最低价格 " clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editMap = false">取 消</el-button>
          <el-button type="primary" @click="editsubmit">提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      total: 1, //页数
      pg: 1,
      addMap: false, //显示新增
      addForm: {
        //表单信息
        title: "",
        city: "",
        price: "",
        lng: "",
        lat: "",
      },
      // 验证规则
      addFormRules: {
        title: [{ required: true, message: "房屋简介", trigger: "blur" }],
        city: [{ required: true, message: "所在城市", trigger: "blur" }],
        price: [{ required: true, message: "最低价格", trigger: "blur" }],
        lng: [{ required: true, message: "经度", trigger: "blur" }],
        lat: [{ required: true, message: "纬度", trigger: "blur" }],
      },
      editMap: false, //显示修改
      editForm: {
        //表单信息
        title: "",
        city: "",
        price: "",
        lng: "",
        lat: "",
      },
    };
  },
  mounted() {
    this.$axios.post("admin/mapRoom").then((res) => {
      // console.log(res);
      this.list = res.data.data;
      this.total = res.data.data.length;
    });
  },
  methods: {
    handleSelectionChange() {},
    // 点击分页
    change(page) {
      // console.log(page);
      this.pg = page;
    },
    // 删除
    del(data) {
      console.log(data.id);
      let id = data.id;
      this.$axios
        .post("admin/mapRoom/del", {
          id,
        })
        .then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          let ref = setTimeout(() => {
            this.$router.go(0);
            clearTimeout(ref);
          }, 1000);
        });
    },
    // 提交表单
    submitForm() {
      this.$refs.addForm.validate((vaild) => {
        if (vaild) {
          this.addMap = false;
          this.$axios.post("admin/mapRoom/add", this.addForm).then((res) => {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            let ref = setTimeout(() => {
              this.$router.go(0);
              clearTimeout(ref);
            }, 1000);
          });
        }
      });
    },
    //新增
    showAdd() {
      this.addMap = true;
    },
    // 修改显示
    edit(data) {
      console.log(data);
      this.editMap = true;
      this.editForm = data;
    },
    editsubmit() {
      this.editMap = false;
      this.$axios.post("admin/mapRoom/update", this.editForm).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        let ref = setTimeout(() => {
          this.$router.go(0);
          clearTimeout(ref);
        }, 1000);
      });
    },
  },
  computed: {
    // 分页
    newList() {
      let page = this.pg;
      let total = this.total;
      if (page == 1) {
        return this.list.slice(0, 10);
      }
      if (page == 2) {
        return this.list.slice(10, 20);
      }
      if (page == 3) {
        return this.list.slice(20, 30);
      }
      return this.list.slice(30, total);
    },
  },
};
</script>
<style scoped>
.search {
  width: 350px;
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  padding-bottom: 8px;
}
</style>
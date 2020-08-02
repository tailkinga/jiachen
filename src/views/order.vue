<template>
  <div>
    <div class="nav" style="margin:20px 0;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- table 列表-->
    <el-table
      ref="multipleTable"
      :data="orderList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column label="id" width="80" type="index"></el-table-column>
      <el-table-column label="房屋图片" width="200">
        <template slot-scope="scope">
          <img :src="'http://localhost:3001'+scope.row.url" width="80%" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="房屋简介" width="150"></el-table-column>
      <el-table-column prop="type" label="租房类型" width="150"></el-table-column>
      <el-table-column prop="price" label="租房价格" width="150"></el-table-column>
      <el-table-column prop="content" label="地理位置" width="150"></el-table-column>
      <el-table-column prop="sizeinfo" label="房屋大小" width="150"></el-table-column>

      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status=='true'?'success':'danger'"
            size="mini"
          >{{scope.row.status=='waiting'?'等待审核':(scope.row.status=='true'?'审核通过':'审核失败')}}</el-button>
        </template>
      </el-table-column>
      <el-table-column min-width="50"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="success" plain @click="pass(scope.row)">通过</el-button>
          <el-button
            type="danger"
            slot="reference"
            :disabled="scope.row.status=='true'?true:false"
            plain
            @click="out(scope.row)"
          >驳回</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row)">
            <el-button type="danger" style="margin-left:10px " slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: [],
    };
  },
  mounted() {
    this.$axios.post("lease/select").then((res) => {
      // console.log(res);
      this.orderList = res.data.data;
    });
  },
  methods: {
    handleSelectionChange() {},
    pass(data) {
      console.log(data);
      let title = data.title;
      let status = true;
      this.$axios
        .post("lease/pass", {
          title,
          status,
        })
        .then((res) => {
          console.log(res);
          this.$router.go(0);
        });
    },
    out(data) {
      let title = data.title;
      let status = false;
      this.$axios
        .post("lease/pass", {
          title,
          status,
        })
        .then((res) => {
          console.log(res);
          this.$router.go(0);
        });
    },
    del(data) {
      // console.log(data);
      if (data.status == "true" || data.status == "false") {
        let title = data.title;
        this.$axios
          .post("lease/del", {
            title,
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
      } else {
        this.$message({
          message: "审核后才能删除",
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped>
</style>
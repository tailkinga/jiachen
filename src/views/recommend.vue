<template>
  <!--  推荐房源 -->
  <div>
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>房源管理</el-breadcrumb-item>
        <el-breadcrumb-item>推荐房源</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-input v-model="input" class="searcon" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="showAdd">新增</el-button>
    </div>

    <!-- table 列表-->
    <el-table
      ref="multipleTable"
      :data="newList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column label="id" width="80" type="index"></el-table-column>
      <el-table-column prop="title" label="房屋简介" width="250"></el-table-column>
      <el-table-column prop="type" label="租房类型" width="150"></el-table-column>
      <el-table-column prop="price" label="租房价格" width="150"></el-table-column>
      <el-table-column prop="content" label="地理位置" width="250"></el-table-column>
      <el-table-column prop="sizeinfo" label="房屋大小" width="200"></el-table-column>
      <el-table-column label="房屋图片" width="200">
        <template slot-scope="scope">
          <img :src="'http://39.106.159.90:3001'+scope.row.url" width="100%" />
        </template>
      </el-table-column>
      <el-table-column min-width="50"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="success" plain @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row.pid)">
            <el-button type="danger" style="margin-left:10px " slot="reference" plain>删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="change"
        :page-size="4"
        :total="total"
        style="position:fixed;bottom:4%;right:0"
      ></el-pagination>
    </div>

    <!-- 新增 -->
    <add-room v-if="addshow" @addcancel="addcel" :show="addshow"></add-room>

    <!-- 修改 -->

    <edit-room v-if="editshow" @cancel="cel" :editshow="editshow" :editform="editForm"></edit-room>
  </div>
</template>
<script>
import { success, error, listCode } from "../assets/common/js/request";
import editRoom from "../components/recommend/editroom";
import addRoom from "../components/recommend/addroom";
export default {
  data() {
    return {
      input: "", //头部搜索的双向数据绑定,
      multipleSelection: [], //可以多勾选
      show: false, //列表加载
      roomList: [], //房屋遍历的数据
      total: 1, //分页总条数
      pg: 1,
      addshow: false, //是否显示 新增
      editshow: false, //是否显示修改
      editForm: {}, //修改前的数据
      loading: true,
    };
  },
  components: {
    addRoom,
    editRoom,
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 点击新增
    showAdd() {
      this.addshow = true;
    },
    // 编辑
    edit(data) {
      this.editshow = true;
      this.editForm = data;
      console.log(data);
    },
    // 删除
    del(id) {
      if (id) {
        this.$axios
          .post("admin/recommend/del", {
            pid: id,
          })
          .then((res) => {
            success(res, { ok: "删除成功", no: "删除失败请检查数据" });
            let ref = setTimeout(() => {
              this.$router.go(0);
              clearTimeout(ref);
            }, 1000);
          });
      }
    },
    // 点击分页
    change(page) {
      this.pg = page;
    },

    // 隐藏新增页面
    addcel(data) {
      // console.log(data);
      this.addshow = data;
    },
    // 隐藏修页面
    cel(data) {
      this.editshow = data;
    },
  },
  // 列表遍历
  mounted() {
    this.$axios
      .post("admin/recommend")
      .then((res) => {
        // console.log(res);
        let data = res.data;
        if (data.code == 200 && data.data.length > 0) {
          // this.show=false
          this.roomList = data.data;
          this.total = this.roomList.length;
          this.loading = false;
        } else {
          this.$message({
            message: "请求失败",
            type: "error",
          });
          this.loading = false;
        }
      })
      .catch((err) => {
        this.loading = false;
        this.$message({
          message: "请求网络错误",
          type: "error",
        });
      });
  },
  computed: {
    // 分页
    newList() {
      let page = this.pg;
      let total = this.total;
      if (page == 1) {
        return this.roomList.slice(0, 4);
      }
      if (page == 2) {
        return this.roomList.slice(4, 8);
      }
      if (page == 3) {
        return this.roomList.slice(8, 12);
      }
      return this.roomList.slice(12, total);
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
}
.searcon {
  width: 70%;
}
.page {
  text-align: center;
}
</style>
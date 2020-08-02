<template>
  <!-- 图片管理 -->
  <div>
    <el-button class="uploadImg" type="primary" @click="dialogVisible = true">上传图片</el-button>
    <!-- 图片列表 -->
    <el-table
      ref="multipleTable"
      :data="newList"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="120"></el-table-column>
      <el-table-column label="id" width="180" prop="id"></el-table-column>
      <el-table-column label="图片" width="300">
        <template slot-scope="scope">
          <img :src="'http://localhost:3001'+scope.row.url" width="50%" />
        </template>
      </el-table-column>
      <el-table-column label="所属模块" width="150" prop="pid"></el-table-column>
      <el-table-column min-width="200"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template v-slot="scope">
          <el-button type="success" plain @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row.id,scope.row.url)">
            <el-button type="danger" style="margin-left:10px " slot="reference" plain>删除</el-button>
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
        :page-size="5"
        :total="total"
        style="position:fixed;bottom:5%;right:0"
      ></el-pagination>
    </div>

    <!--       图片上传     -->
    <el-dialog title="图片上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 基本的input上传 
        <input type="file" ref="input">
        <button @click="submit">提交</button>
      -->
      <div class="upload">
        <el-input
          v-model="pid"
          auto-complete="off"
          style="margin:50px 0"
          placeholder="所属模块"
          clearable
        ></el-input>
        <img :src="url" class="image" width="100%" alt />
        <el-upload
          action
          :before-upload="beforeupload"
          list-type="picture-card"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <el-button @click="submit" class="submit">上传</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>

    <!--       图片修改    -->
    <el-dialog title="图片修改" :visible.sync="editVsi" width="30%" :before-close="handleClose">
      <!-- 基本的input上传 
        <input type="file" ref="input">
        <button @click="submit">提交</button>
      -->
      <div class="upload">
        <img :src="editUrl" width="100%" />
        <el-upload
          action
          :before-upload="editbeforeupload"
          list-type="picture-card"
          :on-remove="editRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-input
          v-model="pid"
          auto-complete="off"
          style="margin-top:50px"
          placeholder="所属模块"
          clearable
        ></el-input>
      </div>
      <el-button @click="editsubmit" class="submit">修改</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { success, error, listCode } from "../assets/common/js/request";
export default {
  data() {
    return {
      loading: true, //加载动画
      // 新增页面显示
      dialogVisible: false,
      // 上传图片显示
      url: "",
      // 上传图片信息的formdata对象存放
      param: "",
      //
      imageList: [],
      // 修改
      editVsi: false, //编辑页面显示
      editUrl: "", //编辑图片时的临时路径
      editId: "", //修改图片的id
      pid: "", //所属模块
      total: 1, //默认总页数
      pg: 1, //默认选中页数
    };
  },
  methods: {
    //    多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 上传前获取文件信息 return false 禁止自动上传
    beforeupload(file) {
      //    console.log(file)
      let pid = this.pid;
      // console.log(pid);
      this.param = new FormData();
      this.param.append("file", file);
      this.param.append("pid", pid);
      return false;
    },
    // 修改上传前获取文件信息 return false 禁止自动上传
    editbeforeupload(file) {
      //    console.log(file)
      // let id =this.editId
      // console.log(this.editId);
      let id = this.editId;
      let pid = this.pid;
      this.param = new FormData();
      this.param.append("file", file);
      this.param.append("id", id);
      this.param.append("pid", pid);
      return false;
    },
    //    新增上传时获取临时路径以便于显示 此方法必须是 禁止自动上传后才能触发
    handleRemove(file, fileList) {
      // console.log(file)
      this.url = file.url;
    },
    // 修改时获取临时路径以便于显示 此方法必须是 禁止自动上传后才能触发
    editRemove(file, fileList) {
      // console.log(file);
      this.editUrl = file.url;
    },

    // 添加图片提交
    submit() {
      if (!this.url) {
        this.$message({
          message: "请选择上传的图片",
        });
        return;
      }

      this.$axios
        .post("admin/images/upload", this.param)
        .then((res) => {
          // console.log(res);
          success(res, { ok: "上传成功", no: "上传失败" });
          this.dialogVisible = false;
          this.$router.go(0); //页面刷新
        })
        .catch((err) => {
          console.log("fail");
        });
      //   let file=  this.$refs.input.files[0]  接收input的图片信息
      //   console.log(file)
    },
    // 修改提交图片
    editsubmit() {
      if (!this.editUrl) {
        this.$message({
          message: "请选择修改后的图片",
        });
        return;
      }

      this.$axios
        .post("admin/images/update", this.param)
        .then((res) => {
          console.log(res);
          success(res, { ok: "修改成功", no: "修改失败" });
          this.dialogVisible = false;
          this.$router.go(0); //页面刷新
        })
        .catch((err) => {
          console.log("fail");
        });
      //   let file=  this.$refs.input.files[0]  接收input的图片信息
      //   console.log(file)
    },
    uploadI() {
      if (this.pid == "") {
        this.$message({
          message: "请先填入所属模块",
        });
        return;
      }
    },
    // 取消新增
    cancel(done) {
      let that = this;
      this.$confirm("确认取消上传吗")
        .then((_) => {
          that.dialogVisible = false;
          that.url = "";
          done();
        })
        .catch((_) => {});
    },
    // 取消修改
    cancelEdit(done) {
      let that = this;
      this.$confirm("确认取消上传吗")
        .then((_) => {
          that.editVsi = false;
          that.url = "";
          done();
        })
        .catch((_) => {});
    },
    // 右上角的取消
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.url = "";
        })
        .catch((_) => {});
    },
    // 删除
    del(id, file) {
      // console.log(id,file)
      let filename = file.split("/");
      let index = filename.length - 1;
      let url = filename[index];
      // console.log(filename[index]);
      this.$axios
        .post("admin/images/del", {
          id,
          url,
        })
        .then((res) => {
          this.$router.go(0); //页面刷新
        })
        .catch((err) => {
          console.log("no");
        });
    },
    //    点击编辑显示
    edit(data) {
      this.editVsi = true;
      // console.log(data);
      this.editUrl = "http://39.106.159.90:3001" + data.url;
      this.editId = data.id;
      this.pid = data.pid;
      // console.log(this.pid);
    },

    // 点击跳转不同的分页
    change(page) {
      // console.log(page);
      this.pg = page;
    },
  },
  // 分页
  computed: {
    newList() {
      let page = this.pg;
      let total = this.total;
      if (page == 1) {
        return this.imageList.slice(0, 5);
      }
      if (page == 2) {
        return this.imageList.slice(5, 10);
      }
      if (page == 3) {
        return this.imageList.slice(10, 15);
      }
      if (page == 4) {
        return this.imageList.slice(15, 20);
      }
      if (page == 5) {
        return this.imageList.slice(20, 25);
      }
      if (page == 6) {
        return this.imageList.slice(25, 30);
      }
      if (page == 7) {
        return this.imageList.slice(30, 35);
      }
      return this.imageList.slice(35, total);
    },
  },

  // 请求图片列表
  mounted() {
    this.$axios
      .post("admin/images")
      .then((res) => {
        let result = listCode(res);
        this.imageList = result.data;
        this.total = this.imageList.length;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
};
</script>
<style scoped>
.upload {
  width: 50%;
  position: relative;
  overflow: hidden;
}
.image {
  position: absolute;
  left: 0;
  top: 0;
}
.submit {
  width: 100px;
  margin: 30px 25px;
}
.uploadImg {
  margin-bottom: 20px !important;
}
</style>
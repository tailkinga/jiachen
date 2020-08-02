<template>
  <div>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="show" width="30%" :before-close="handleClose">
      <!-- 上传图片 -->
      <div class="upload">
        <img :src="url" class="image" width="100%" alt />
        <el-upload
          style="display:block;margin-top:200px"
          action
          :before-upload="beforeupload"
          list-type="picture-card"
          :on-remove="handleRemove"
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
      <el-button @click="submit" class="submit">修改</el-button>

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item prop="title">
          <el-input v-model="editForm.title" auto-complete="off" placeholder="房屋简介 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-input v-model="editForm.type" auto-complete="off" placeholder="租房类型 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input v-model="editForm.price" auto-complete="off" placeholder="租房价格 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <el-input v-model="editForm.content" auto-complete="off" placeholder="地理位置 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="sizeinfo">
          <el-input v-model="editForm.sizeinfo" auto-complete="off" placeholder="房屋大小 " clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { success, error, listCode } from "../../assets/common/js/request";

export default {
  props: {
    editshow: Boolean,
    editform: Object,
  },

  data() {
    return {
      //   上传图片显示
      show: false,
      url: "",
      // 上传图片信息的formdata对象存放
      param: "",
      pid: "",
      editForm: {
        title: "",
        type: "",
        price: "",
        content: "",
        sizeinfo: "",
      },
      editId: "",
      editFormRules: {
        title: [{ required: true, message: "房屋简介", trigger: "blur" }],
        type: [{ required: true, message: "租房类型", trigger: "blur" }],
        price: [{ required: true, message: "租房价格", trigger: "blur" }],
        content: [{ required: true, message: "地理位置", trigger: "blur" }],
        sizeinfo: [{ required: true, message: "房屋大小", trigger: "blur" }],
      },
    };
  },
  mounted() {
    console.log(1);
    this.show = this.editshow;
    this.editForm = this.editform;
    this.pid = this.editform.pid;
    this.editId = this.editform.id;
    this.url = "http://localhost:3001" + this.editform.url;
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$emit("cancel", false);
          done();
          this.url = "";
        })
        .catch((_) => {});
    },
    cancel() {
      this.$emit("cancel", false);
    },
    // 上传前获取文件信息 return false 禁止自动上传
    beforeupload(file) {
      //    console.log(file)
      let pid = this.pid;
      let id = this.editId;
      console.log(pid, 1);
      this.param = new FormData();
      this.param.append("file", file);
      this.param.append("pid", pid);
      this.param.append("id", id);
      return false;
    },
    //    获取临时路径以便于显示 此方法必须是 禁止自动上传后才能触发
    handleRemove(file, fileList) {
      // console.log(file)
      this.url = file.url;
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
        .post("admin/images/update", this.param)
        .then((res) => {
          console.log(res);
          success(res, { ok: "修改成功", no: "修改失败" });
        })
        .catch((err) => {
          console.log("fail");
        });
      //   let file=  this.$refs.input.files[0]  接收input的图片信息
      //   console.log(file)
    },

    //   提交新增数据
    submitForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let title = this.editForm.title;
          //   console.log(this.addForm.name)
          let type = this.editForm.type;
          let price = this.editForm.price;
          let content = this.editForm.content;
          let sizeinfo = this.editForm.sizeinfo;
          let pid = this.pid;

          console.log(title, type, price, pid);
          this.$emit("cancel", false);
          this.$axios
            .post(
              "admin/home/update",
              {
                title,
                type,
                price,
                content,
                sizeinfo,
                pid,
              },
              { timeout: 1000 * 6 }
            )
            .then((res) => {
              success(res, { ok: "添加成功", no: "添加失败" });
              this.show = false;
              let ref = setTimeout(() => {
                this.$router.go(0);
                clearTimeout(ref);
              }, 1000);
            })
            .catch((err) => {
              error(err);
              this.show = false;
            });
        }
      });
    },
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
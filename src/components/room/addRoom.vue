<template>
  <div>
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 上传图片 -->
      <el-input
        v-model="pid"
        auto-complete="off"
        style="margin:50px 0"
        placeholder="所属模块"
        clearable
      ></el-input>
      <div class="upload">
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

      <el-form :model="addForm" :rules="addFormRules" ref="addForm">
        <el-form-item prop="title">
          <el-input v-model="addForm.title" auto-complete="off" placeholder="房屋简介 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-input v-model="addForm.type" auto-complete="off" placeholder="租房类型 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input v-model="addForm.price" auto-complete="off" placeholder="租房价格 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <el-input v-model="addForm.content" auto-complete="off" placeholder="地理位置 " clearable></el-input>
        </el-form-item>
        <el-form-item prop="sizeinfo">
          <el-input v-model="addForm.sizeinfo" auto-complete="off" placeholder="房屋大小 " clearable></el-input>
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
    show: Boolean
  },

  data() {
    return {
      dialogVisible: false,
      //   上传图片显示
      url: "",
      // 上传图片信息的formdata对象存放
      param: "",
      pid: "",
      addForm: {
        title: "",
        type: "",
        price: "",
        content: "",
        sizeinfo: ""
      },
      addFormRules: {
        title: [{ required: true, message: "房屋简介", trigger: "blur" }],
        type: [{ required: true, message: "租房类型", trigger: "blur" }],
        price: [{ required: true, message: "租房价格", trigger: "blur" }],
        content: [{ required: true, message: "地理位置", trigger: "blur" }],
        sizeinfo: [{ required: true, message: "房屋大小", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // console.log(this.show);
    this.dialogVisible = this.show;
  },
  methods: {
    // 右上角的取消
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("addcancel", false);
          done();
          this.url = "";
        })
        .catch(_ => {});
    },
    cancel() {
      this.$emit("addcancel", false);
    },
    // 上传前获取文件信息 return false 禁止自动上传
    beforeupload(file) {
      //    console.log(file)
      let pid = this.pid;
      console.log(pid);
      this.param = new FormData();
      this.param.append("file", file);
      this.param.append("pid", pid);
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
          message: "请选择上传的图片"
        });
        return;
      }

      this.$axios
        .post("admin/images/upload", this.param)
        .then(res => {
          console.log(res);
          success(res, { ok: "上传成功", no: "上传失败" });
        })
        .catch(err => {
          console.log("fail");
        });
      //   let file=  this.$refs.input.files[0]  接收input的图片信息
      //   console.log(file)
    },

    //   提交新增数据
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let title = this.addForm.title;
          //   console.log(this.addForm.name)
          let type = this.addForm.type;
          let price = this.addForm.price;
          let content = this.addForm.content;
          let sizeinfo = this.addForm.sizeinfo;
          let pid = this.pid;
          this.$axios
            .post(
              "admin/home/add",
              {
                title,
                type,
                price,
                content,
                sizeinfo,
                pid
              },
              { timeout: 1000 * 6 }
            )
            .then(res => {
              success(res, { ok: "添加成功", no: "添加失败" });
              this.$emit("addcancel", false);
              let ref = setTimeout(() => {
                this.$router.go(0);
                clearTimeout(ref);
              }, 1000);
            })
            .catch(err => {
              error(err);
              this.$emit("addcancel", false);
            });
        }
      });
    }
  }
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
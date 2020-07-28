<template>
  <div>
    <div class="title">
      <span class="iconfont iconfanhui" @click="back"></span>
      <p>出租信息</p>
    </div>
    <div class="form">
      <van-cell-group style="padding-bottom:.3rem">
        <van-field v-model="house.title" required label="房屋描述" placeholder="九龙山 九龙花园 朝南-主卧" />
        <van-field v-model="house.sizeinfo" required label="房屋大小" placeholder="3室1厅  ·14m³ ·5/6层" />
        <van-field v-model="house.content" required label="地理位置" placeholder="距天通南苑东827米" />
        <van-field v-model="house.type" required label="出租类型" placeholder="整租/合租" />
        <van-field v-model="house.price" required label="出租价格" placeholder="￥666/月" />
        <van-field v-model="house.model" required label="所属模块" placeholder="7-1 至 9-9" />
        <van-field label="房屋图片" required disabled />
        <van-uploader
          v-model="house.fileList"
          :after-read="afterRead"
          multiple
          :max-count="1"
          style="margin:0.3rem ;"
        />
        <van-button
          type="default"
          size="small"
          style="display:block;margin-left:0.4rem;width:1.5rem;"
          @click="upload"
        >上传</van-button>
      </van-cell-group>
      <van-button
        round
        type="info"
        :disabled="determine"
        style="margin:.5rem auto;display:block;width:40%"
        color="#23d4ce"
        @click="submit"
      >确认提交</van-button>
    </div>
  </div>
</template>
<script>
import { post, toast, fail, success } from "../assets/styles/common/request";
export default {
  data() {
    return {
      house: {
        title: "",
        sizeinfo: "",
        content: "",
        type: "",
        fileList: [],
        model: ""
      },

      determine: true,
      param: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 图片上传
    afterRead(file) {
      //   console.log(file.file.type);
      console.log(this.house.fileList);
    },
    // 上传图片
    upload() {
      if (this.house.fileList.length > 0) {
        if (this.house.model) {
          let pid = this.house.model;
          //   console.log(pid);
          let file = this.house.fileList[0].file;
          this.param = new FormData();
          this.param.append("file", file);
          this.param.append("pid", pid);
          post("images/upload", this.param).then(res => {
            success("上传成功");
          });
        } else {
          toast("请填写所属模块");
        }
      } else {
        toast("请选择上传的图片");
      }
    },
    // 提交表单
    submit() {
      console.log(1);
      post("lease", {
        title: this.house.title,
        sizeinfo: this.house.sizeinfo,
        content: this.house.content,
        type: this.house.type,
        price: this.house.price,
        pid: this.house.model,
        status: "waiting"
      })
        .then(res => {
          success("提交成功，等待审核");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    let house = this.house;
    // Object.keys() 这个方法 返回的是一个数组
    // 然后再使用every 方法  当五个都不为空的时候 才返回true 否则返回false
    let res = Object.keys(house).every(res => {
      return house[res].length;
    });
    if (res) {
      this.determine = false;
    } else {
      this.determine = true;
    }
  }
};
</script>
<style scoped lang="less">
.title {
  width: 100%;
  height: 0.8rem;
  background: #23d4ce;
  color: #fff;
  font-size: 0.35rem;
  position: relative;
  .iconfanhui {
    position: absolute;
    left: 1%;
    line-height: 0.8rem;
    font-size: 0.6rem;
  }
  p {
    text-align: center;
    line-height: 0.8rem;
  }
}
.submit {
  width: 40%;
  margin: 0.5rem auto;
  display: block;
  background: #23d4ce;
  color: #fff;
  padding: 0.2rem 0;
  border-radius: 0.4rem;
}
</style>
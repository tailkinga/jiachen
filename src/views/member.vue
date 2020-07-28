<template>
  <div>
    <van-popup v-model="show" round position="bottom" :style="{ height: '20%' }">
      <p
        class="content"
        style="color:#999;border-bottom:1px solid #ddd;margin-top:.25rem"
        @click="cancellation"
      >注销账户</p>
      <p class="content" @click="logout">退出登录</p>
    </van-popup>

    <!-- 头部背景 -->
    <div class="header">
      <div style="height:30%">
        <img src="../assets/styles/images/center.png" style="width:100%" alt />
      </div>
      <div class="set">
        <span @click="tip" class="iconfont iconshezhi"></span>
      </div>
      <!-- 用户头像及名字 -->
      <div class="userInfo">
        <div class="userImage">
          <van-uploader :before-read="beforeRead" :disabled="login" />
          <div class="imgUrl" v-if="fileList">
            <img :src="fileList" alt />
          </div>
        </div>
        <p @click="nologin">{{ userName }}</p>
      </div>
      <!-- 卡券等 -->
      <div class="coupon">
        <dl>
          <dt>卡券</dt>
          <dd>0</dd>
        </dl>
        <dl>
          <dt>余额</dt>
          <dd>0</dd>
        </dl>
        <dl>
          <dt>积分</dt>
          <dd>0</dd>
        </dl>
        <dl>
          <dt>关注</dt>
          <dd>{{followNum}}</dd>
        </dl>
      </div>
    </div>
    <!-- 功能区 -->
    <div class="funList">
      <div @click="order">
        <p>服务订单</p>
        <span class="iconfont iconqianjinxiayige"></span>
      </div>
      <div @click="follow">
        <p>我的关注</p>
        <span class="iconfont iconqianjinxiayige"></span>
      </div>
      <div @click="checkGuide">
        <p>入住指南</p>
        <span class="iconfont iconqianjinxiayige"></span>
      </div>
      <div @click="opinion">
        <p>意见反馈</p>
        <span class="iconfont iconqianjinxiayige"></span>
      </div>
      <div @click="callPhone(11738945227)">
        <p>联系客服</p>
        <span class="iconfont iconqianjinxiayige"></span>
      </div>
    </div>

    <navigation></navigation>
  </div>
</template>

<script>
import Navigation from "../components/nav/nav";
import { push, toast, post, fail } from "../assets/styles/common/request";

export default {
  data() {
    return {
      userName: "未登录",
      show: false,
      param: "",
      fileList: "",
      login: true,
      followNum: 0
    };
  },
  methods: {
    // 上传头像
    beforeRead(file) {
      console.log(file);
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        toast("请上传 jpg 或者 png格式图片");
        return false;
      } else if (file.size > 50000) {
        toast("图片太大");
        return false;
      }
      // console.log(file);
      this.param = new FormData();
      this.param.append("file", file);
      this.param.append("pid", 5);
      post("images/upload", this.param).then(res => {
        console.log(res);
        toast("上传成功");
        this.fileList = "http://localhost:3001" + res.data.data;
      });
    },
    // 底弹框
    tip() {
      this.show = true;
    },
    //订单
    order() {
      push("/order", {});
    },
    // 联系客服
    callPhone(phoneNumber) {
      window.location.href = "tel://" + phoneNumber;
    },
    // 退出登录
    logout() {
      if (localStorage.getItem("username")) {
        localStorage.removeItem("username");
        localStorage.removeItem("conrn");
        this.$router.go(0);
      } else {
        fail("尚未登录");
      }
    },
    // 注销用户
    cancellation() {
      if (localStorage.getItem("username")) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定要注销吗"
          })
          .then(() => {
            // console.log(localStorage.getItem("username"));
            let username = localStorage.getItem("username");
            this.$axios
              .post("login/cancellation", {
                username
              })
              .then(res => {
                // console.log(res);
                localStorage.removeItem("username");
                localStorage.removeItem("conrn");
                this.$router.go(0);
              });
          })
          .catch(() => {
            // 取消
          });
        // this.$router.go(0);
      } else {
        fail("尚未登录");
      }
    },
    // 未开发功能
    uncultivated() {
      if (this.userName == "未登录") {
        push("/login");
      } else {
        toast("此功能尚未开发");
      }
    },
    // 未登录禁止操作
    nologin() {
      if (this.userName == "未登录") {
        push("/login");
      } else {
        return;
      }
    },
    // 关注
    follow() {
      push("/follow");
    },
    // 入住指南
    checkGuide() {
      if (this.userName == "未登录") {
        push("/login");
      } else {
        // 如果使用router跳转的h话是跳不到外部链接的
        window.location.href = "https://sspai.com/post/45561";
      }
    },
    // 意见反馈
    opinion() {
      if (this.userName == "未登录") {
        push("/login");
      } else {
        push("/opinion", {});
      }
    }
  },
  components: {
    Navigation
  },
  mounted() {
    if (localStorage.getItem("username")) {
      this.userName = localStorage.getItem("username");
      this.login = false;
    }

    if (localStorage.getItem("conrn")) {
      let follow = JSON.parse(localStorage.getItem("conrn")).length;
      this.followNum = follow;
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  position: relative;
  .set {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    .iconfont {
      font-size: 0.5rem;
    }
  }

  //  /deep/和 >>> 是一个作用就是 穿透父组件去控住子组件的样式
  /deep/ .van-uploader__upload {
    border-radius: 50%;
  }
  .userInfo {
    width: 30%;
    text-align: center;
    position: absolute;
    top: 20%;
    left: 35%;
    color: #fff;
    .userImage {
      .imgUrl {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        position: absolute;
        left: 6%;
        bottom: 18%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
  .coupon {
    width: 90%;
    position: absolute;
    left: 5%;
    bottom: 5%;
    display: flex;
    color: #fff;
    justify-content: space-between;
    dl {
      text-align: center;
      dt {
        margin-bottom: 0.1rem;
      }
    }
  }
}
.funList {
  div {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    font-size: 0.3rem;
  }
}
.content {
  font-size: 0.4rem;
  width: 100%;
  text-align: center;
  padding: 0.4rem 0;
  color: red;
  // border-top: 1px solid #ddd;
}
</style>

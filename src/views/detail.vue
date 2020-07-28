<template>
  <div>
    <div class="top">
      <span class="iconfont iconfanhui" @click="back"></span>
      <div class="banner">
        <img :src="'http://localhost:3001' + list.url" />
      </div>
      <van-skeleton title :loading="loading" :row="3" class="kj">
        <div class="title">
          <div class="name">
            <p>{{list.title}}</p>
            <p>{{list.type}}|{{list.sizeinfo || "三室一厅"}}</p>
          </div>
          <span class="iconfont icondianhua" @click="phone(16545986515)"></span>
        </div>
        <p class="price">￥{{list.price || 3666}}/月</p>
      </van-skeleton>
      <van-skeleton title :loading="loading" :row="3" class="kj">
        <div class="discount">
          <p>优惠</p>
          <div>
            <p>免租2个月</p>首月租金4.9折
          </div>
          <div>
            <p>毕业生租房0押金</p>0押金最高免租2个月
          </div>
        </div>
      </van-skeleton>
      <van-skeleton :loading="loading" :row="1" class="kj">
        <div class="distance">
          <span class="iconfont iconlocation"></span>
          <span>{{list.content}}</span>
        </div>
      </van-skeleton>
      <van-skeleton title :loading="loading" :row="3" class="kj">
        <div class="roomInfo">
          <p style="font-size:.3rem;font-weight:600">房源信息</p>
          <div class="intro">
            <div>
              <p>朝向</p>南
            </div>
            <div>
              <p>户型</p>三室一厅一卫
            </div>
            <div>
              <p>建面</p>14㎡
            </div>
            <div>
              <p>年代</p>暂无数据
            </div>
            <div>
              <p>绿化</p>暂无数据
            </div>
            <div>
              <p>状态</p>可立即入住
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>

    <div class="nav">
      <div @click="follow" :class="conrn?'followed':''">
        <p class="iconfont icongz"></p>
        <p>关注</p>
      </div>
      <div @click="chat">
        <p class="iconfont iconzhaoshangxiaochengxu-qianyuebang"></p>
        <p>签约</p>
      </div>
      <div @click="chat">
        <p class="iconfont iconliaotian"></p>
        <p>聊天</p>
      </div>
      <button @click="watching">预约看房</button>
      <button @click="phone(16545986515)">电话咨询</button>
    </div>
  </div>
</template>
<script>
import { post, success, toast, push } from "../assets/styles/common/request";
export default {
  data() {
    return {
      loading: true,
      list: "",
      conrn: false //关注状态
    };
  },
  mounted() {
    if (this.$route.query.follow) {
      this.conrn = true;
    }
    // console.log(this.$route.query.name);
    let name = this.$route.query.name;
    // console.log(this.$route.query.biao);
    let surface = this.$route.query.surface;
    let gujia = setTimeout(() => {
      post("/renting/detail", {
        name,
        surface
      }).then(res => {
        // console.log(res.data.data);
        this.list = res.data.data[0];
        this.loading = false;
        clearInterval(gujia);
      });
    }, 2000);
  },
  methods: {
    watching() {
      success("预约成功！请注意手机，我们会给您来电");
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 关注
    follow() {
      this.conrn = !this.conrn;

      if (!localStorage.getItem("username")) {
        push("/login", {});
        return;
      }
      let getlocalStorage = localStorage.getItem("conrn");

      if (this.conrn) {
        // console.log(1);
        if (!getlocalStorage) {
          let data = [];
          this.list.surface = this.$route.query.surface;
          data.push(this.list);
          localStorage.setItem("conrn", JSON.stringify(data));
          success("已关注，请在关注里查看");
          return;
        } else {
          // console.log(localStorage.getItem("conrn"));
          let newData = JSON.parse(getlocalStorage);
          newData.push(this.list);
          // console.log(newData);
          localStorage.setItem("conrn", JSON.stringify(newData));
          success("已关注，请在关注里查看");
        }
      } else {
        // console.log(typeof JSON.parse(getlocalStorage));
        let res = [];
        for (let i in JSON.parse(getlocalStorage)) {
          res.push(JSON.parse(getlocalStorage)[i]);
        }
        res.pop();
        localStorage.setItem("conrn", JSON.stringify(res));
      }
    },
    // 电话咨询
    phone(phoneNumber) {
      window.location.href = "tel://" + phoneNumber;
    },
    // 暂不支持聊天
    chat() {
      let getlocalStorage = localStorage.getItem("username");
      if (!getlocalStorage) {
        push("/login", {});
        return;
      }

      toast("暂不支持");
    }
  }
};
</script>
<style scoped lang="less">
.top {
  margin-bottom: 2rem;
  .iconfanhui {
    font-size: 0.5rem;
    color: #fff;
    position: absolute;
    left: 2%;
    top: 1%;
    background: rgba(219, 219, 219, 0.5);
    border-radius: 50%;
    z-index: 99;
  }
  .banner {
    height: 4rem;
    position: relative;
    img {
      width: 100%;
      height: 4rem;
      // visibility: hidden;
    }
  }
  .kj {
    margin: 0.5rem 0;
  }
  .title {
    display: flex;
    width: 90%;
    margin: 0.3rem auto 0.2rem auto;
    line-height: 0.6rem;
    align-items: center;
    justify-content: space-between;
    .icondianhua {
      width: 1rem;
      text-align: center;
      line-height: 1rem;
      font-size: 0.6rem;
      height: 1rem;
      background: #23d4ce;
      color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 15px 1px #28dee7;
    }

    .name {
      p {
        font-size: 0.35rem;
        color: #666;
        &:nth-of-type(1) {
          font-size: 0.4rem;
          font-weight: 600;
        }
      }
    }
  }
  .discount {
    width: 90%;
    margin: 0.5rem auto;
    display: flex;
    justify-content: space-between;
    line-height: 0.5rem;
  }
  .price {
    font-size: 0.4rem;
    color: #17c6cf;
    width: 90%;
    margin: 0 auto;
  }
  .distance {
    width: 90%;
    margin: 0.5rem auto;
  }
  .roomInfo {
    width: 90%;
    margin: 0.5rem auto;
    .intro {
      display: flex;
      flex-flow: row wrap;
      div {
        width: 50%;
        display: flex;
        font-size: 0.3rem;
        margin-top: 0.5rem;
        p {
          margin-right: 0.3rem;
          color: #999;
        }
      }
    }
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0.2rem;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
  background: #fff;
  width: 100%;
  button {
    width: 26%;
    color: #ffffff;
    padding: 0.25rem 0;
    box-sizing: border-box;
    border-radius: 0.1rem;
    &:nth-of-type(1) {
      background: #fec752;
    }
    &:nth-of-type(2) {
      background: #23d4ce;
    }
  }
  div {
    width: 15%;
    text-align: center;
    color: #999;
    line-height: 0.4rem;
    p {
      &:nth-of-type(2) {
        font-size: 0.2rem;
      }
    }
  }
  .followed {
    color: red;
  }
}
</style>
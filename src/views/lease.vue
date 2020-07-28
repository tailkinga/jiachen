<template>
  <div>
    <div>
      <div class="head">
        <img src="../assets/styles/images/lease.jpg" style="width:100%" alt />
        <dl class="intro">
          <dt>RENRAL HOUSING</dt>
          <dd>房屋出租模式</dd>
          <dd>享受一键出租，坐等回报收益</dd>
        </dl>
      </div>

      <div class="content">
        <div class="option">
          <button @click="callPhone(11738945227)">电话咨询</button>
          <button @click="lease">立即出租</button>
        </div>
        <div class="vip">
          <span class="iconfont icongz"></span>
          <span>甩手掌柜</span>
          <p>拥有专人打理您的房屋，升级改造，配置全新家具，省心省力，坐享收益</p>
        </div>
        <div class="vip">
          <span class="iconfont icongz"></span>
          <span>安心无忧</span>
          <p>出租人群严格把控，高素质租户，保证房屋完善及优质保洁</p>
        </div>
        <div class="vip">
          <span class="iconfont icongz"></span>
          <span>信誉保证</span>
          <p>嘉辰一直以信誉品4和品质为宗旨，一旦存在客户不满意等，会立即做出客户满意的解决方案</p>
        </div>

        <div class="step">
          <dl>
            <dt>简单4步 省心做房东</dt>
            <dd>告别忙绿的房东</dd>
            <dd>经常找租客，找维修，找增值途径...</dd>
          </dl>
        </div>
        <div class="destep">
          <span>线上挂载</span>
          <span class="iconfont iconqianjinxiayige"></span>
          <span>实勘测量</span>
          <span class="iconfont iconqianjinxiayige"></span>
          <span>合作签约</span>
          <span class="iconfont iconqianjinxiayige"></span>
          <span>坐享收益</span>
        </div>
        <button class="join" @click="lease">加入我们</button>
      </div>
    </div>
    <navigation @meauHeight="Mheight"></navigation>
  </div>
</template>
<script>
import Navigation from "../components/nav/nav";
export default {
  data() {
    return {
      M: ""
    };
  },
  components: {
    Navigation
  },
  methods: {
    Mheight(el) {
      this.M = el;
    },
    // 电话咨询
    callPhone(phoneNumber) {
      window.location.href = "tel://" + phoneNumber;
    },
    lease() {
      this.$router.push("/infor");
    }
  },
  mounted() {
    // this.$refs.scroll.style.height =
    //   document.documentElement.clientHeight - this.M + "px";
  }
};
</script>
<style scoped lang="less">
.head {
  width: 100%;
  height: 4.2rem;
  position: fixed;
  z-index: 1;
  .intro {
    position: absolute;
    top: 32%;
    left: 5%;
    color: #fff;
    font-size: 0.2rem;
    dt {
      font-size: 0.35rem;
      font-weight: 600;
      margin-bottom: 0.4rem;
    }
    dd {
      margin-bottom: 0.3rem;
    }
  }
}
.content {
  width: 100%;
  background: #fff;
  position: absolute;
  z-index: 2;
  top: 3.8rem;
  height: 18rem;
  border-radius: 0.3rem 0.3rem 0 0;
  .option {
    width: 80%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-between;
    button {
      background: #17c6cf;
      color: #fff;
      padding: 0.18rem 0.5rem;
      box-sizing: border-box;
      border-radius: 0.4rem;
      font-weight: 600;
      font-size: 0.3rem;
      &:nth-of-type(1) {
        background: none;
        border: 1px solid #17c6cf;
        color: #17c6cf;
      }
    }
  }
  .vip {
    width: 90%;
    margin: 0 auto 1rem auto;
    span {
      &:nth-of-type(2) {
        font-size: 0.35rem;
        margin: 0.2rem;
      }
    }
    p {
      color: #999;
      line-height: 0.5rem;
      margin-top: 0.3rem;
    }
  }
  .step {
    width: 100%;
    background: #17c6cf;
    // height: 3rem;
    text-align: center;
    line-height: 0.5rem;
    padding: 0.8rem 0;
    color: #fff;
    dl {
      dt {
        font-size: 0.4rem;
        margin-bottom: 0.3rem;
      }
    }
  }
  .destep {
    width: 90%;
    margin: -0.5rem auto 0 auto;
    background: #fff;
    text-align: center;
    padding: 0.5rem 0;
    box-shadow: 0 2px 5px 1px #ddd;
    color: #999;
    .iconqianjinxiayige {
      margin: 0 0.1rem;
    }
  }
  .join {
    width: 30%;
    display: block;
    margin: 0.6rem auto;
    background: #17c6cf;
    color: #fff;
    border-radius: 0.4rem;
    padding: 0.1rem 0;
  }
}
</style>
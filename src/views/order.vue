<template>
  <div ref="scroll" style="background:#f6f6f6">
    <div class="title">
      <span class="iconfont iconfanhui" @click="back"></span>
      <p>订单</p>
    </div>
    <div v-if="lease.length>0">
      <div>
        <div class="list" v-for="(item,index) of lease" :key="index">
          <img
            :src="'http://localhost:3001' + item.url"
            alt
            style="width:50%;border-radius:0.2rem;height:2.5rem"
          />
          <div class="content">
            <p
              style="font-size:.35rem;font-weight:600;color:#000"
            >{{item.title.length>9?item.title.slice(0,8)+'...':item.title}}</p>
            <p>{{item.content.length>11?item.title.slice(0,11)+'...':item.content}}</p>
            <p>{{item.type}} | {{item.sizeinfo.length>11?item.sizeinfo.slice(0,11)+'...':item.sizeinfo}}</p>
            <p style="color:#17c6cf">￥{{item.price}}/月</p>
            <div class="status">
              <p>{{item.status=="waiting"?"等待审核...":(item.status?"审核通过":"审核未通过")}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-else description="暂无订单" style="margin-top:2rem" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      lease: "",
      status: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$refs.scroll.style.height =
      document.documentElement.clientHeight + "px";

    if (localStorage.getItem("username")) {
      this.$axios.post("lease/select").then(res => {
        // console.log(res.data.data);
        this.lease = res.data.data;
      });
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
.list {
  width: 95%;
  margin: 0.8rem auto;
  display: flex;
  align-items: flex-start;
  background: #fff;
  padding: 0.4rem 0.2rem;
  box-sizing: border-box;
  border-radius: 0.15rem;
  .content {
    width: 50%;
    margin-left: 0.2rem;
    line-height: 0.5rem;
    color: #7e7e7e;
    span {
      background: #ddd;
      border-radius: 0.1rem;
      font-size: 0.2rem;
      padding: 0.05rem;
      margin-right: 0.2rem;
      &:nth-of-type(1) {
        background: #5de0dc;
        color: #fff;
      }
    }
    .status {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      p {
        background: #23d4ce;
        color: #fff;
        border-radius: 0.1rem;
        width: 58%;
        text-align: center;
      }
    }
  }
}
</style>
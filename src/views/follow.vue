<template>
  <div>
    <div class="title">
      <span class="iconfont iconfanhui" @click="back"></span>
      <p>我的关注</p>
    </div>

    <div v-if="list !='' ">
      <div class="list" v-for="(item,index) of list" :key="index" @click="detail(item.title,index)">
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
          <div>
            <span>免租一个月</span>
            <span>品质公寓</span>
          </div>
        </div>
      </div>
    </div>

    <van-empty v-else description="暂无关注~" style="margin-top:1.5rem" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    let getStrong = localStorage.getItem("conrn");
    if (getStrong) {
      this.list = JSON.parse(getStrong);
    }
    // console.log(this.list.length);
  },
  // computed: {
  //   newList(){

  //   }
  // },
  methods: {
    detail(name, index) {
      let surface = JSON.parse(localStorage.getItem("conrn"))[index].surface;
      console.log(surface);
      this.$router.push({
        path: "/detail",
        query: { name: name, surface: surface, follow: true }
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
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
  width: 90%;
  margin: 0.8rem auto;
  display: flex;
  align-items: flex-start;

  .content {
    width: 50%;
    margin-left: 0.2rem;
    line-height: 0.45rem;
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
  }
}
</style>
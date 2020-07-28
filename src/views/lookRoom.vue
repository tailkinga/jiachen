<template>
  <div>
    <div ref="head">
      <div class="search">
        <div class="searchInput">
          <span class="iconfont iconsousuo"></span>
          <input type="text" v-model="search" />
        </div>
        <span class="iconfont iconlocation" @click="location"></span>
      </div>
      <div v-show="show" class="search_con">对不起！未检索到您的搜索内容</div>
      <div>
        <van-dropdown-menu active-color="#5de0dc" style="width:100%;overflow:hidden" change="meth">
          <van-dropdown-item v-model="value1" disabled :options="option1" />
          <van-dropdown-item v-model="value2" @change="money" :options="option2" />
          <van-dropdown-item v-model="value3" @change="type" :options="option3" />
          <van-dropdown-item v-model="value4" @change="price" :options="option4" />
        </van-dropdown-menu>
      </div>
    </div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了~"
        @load="onLoad"
        offset="20"
        class="scrollheight"
        :style="{height:scrollHeigth}"
        :immediate-check="false"
        v-if="chh"
      >
        <div>
          <div class="list" v-for="(item,index) of room" :key="index" @click="detail(item.title)">
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
      </van-list>
      <div v-else style="margin-top:35%">
        <van-empty image="network" description="网络错误" />
      </div>
    </div>
    <navigation @meauHeight="Mheight"></navigation>
  </div>
</template>
<script>
import Navigation from "../components/nav/nav";
import { sortByKey, ByKey } from "../assets/styles/sort";
export default {
  data() {
    return {
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      option1: [
        { text: "全部房源", value: 1 },
        { text: "最新房源", value: "1-1" },
        { text: "活动房源", value: "1-2" }
      ],
      option2: [
        { text: "价格", value: 2 },
        { text: "不限", value: "不限" },
        { text: "3000以下", value: "3000以下" }
      ],
      option3: [
        { text: "合/整租", value: 3 },
        { text: "合租", value: "合租" },
        { text: "整租", value: "整租" }
      ],
      option4: [
        { text: "默认排序", value: 4 },
        { text: "价格从低到高", value: "低到高" },
        { text: "价格从高到低", value: "高到低" }
      ],
      room: [],
      M: "",
      loading: false,
      finished: false, //上拉加载没有数据时
      scrollHeigth: "",
      chh: false, //初始化
      search: "", //搜索内容
      show: false //搜索结果
    };
  },
  components: {
    Navigation
  },
  methods: {
    Mheight(el) {
      this.M = el;
      //  console.log( this.Mheight)
    },

    // 跳转地图页
    location() {
      this.$router.push("/location");
    },

    //利用vant框架的list组件 当滚动条距离底部多长时触发 load 距离可以用offset设定
    /**
     * 这个有个坑就是你初始化的时候 他会自动触发你的load事件 需要 :immediate-check="false" 关闭他的自动校验位置
     *
     *  */

    onLoad() {
      // console.log(1);
      if (this.room.length >= 10) {
        this.loading = false;
        this.finished = true;
        return;
      }
      let clear = setTimeout(() => {
        this.$axios
          .post("renting/room", {
            num: 10
          })
          .then(res => {
            this.room = res.data.data;
            // console.log(this.room);
            this.loading = false;
            clearInterval(clear);
          });
      }, 2000);
    },

    // 筛选 整租还是 合租
    type() {
      // console.log(this.value3);
      let type = this.value3;
      if (type == 3) {
        this.$router.go(0);
        return;
      }
      this.$axios
        .post("renting/join", {
          type,
          num: 5
        })
        .then(res => {
          // console.log(res.data.data);
          this.finished = true;
          this.room = res.data.data;
        });
    },

    // 筛选 价格从低到高或高到低
    price() {
      // console.log(this.value4);
      let arr = this.room;

      if (this.value4 == "低到高") {
        let res = sortByKey(arr, "price");
        // console.log(1);
        this.room = res;
      } else if (this.value4 == "高到低") {
        let res = ByKey(arr, "price");
        // console.log(2);
        this.room = res;
      }
    },

    // money
    money() {
      if (this.value2 == "3000以下") {
        let arr = this.room;
        let res = arr.filter(item => {
          if (item.price < 3000) {
            return true;
          } else {
            return false;
          }
        });
        this.room = res;
        // console.log(res);
      } else {
        this.$router.go(0);
      }
    },
    detail(name) {
      // console.log(name);
      this.$router.push({
        path: "/detail",
        query: { name: name, surface: "jc_hz" }
      });
    }
  },
  watch: {
    search() {
      if (!this.search) {
        this.show = false;
        this.$axios.post("renting/room", { num: 5 }).then(res => {
          this.room = res.data.data;
        });
        return;
      }
      // 防止不短的请求导致性能消耗
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const result = [];

        this.room.forEach(value => {
          // console.log(value.type, this.search);
          if (
            value.title.indexOf(this.search) > -1 ||
            value.type.indexOf(this.search) > -1
          ) {
            result.push(value);
          }
        });
        // console.log(result);
        if (result.length > 0) {
          this.room = result;
        } else {
          this.show = true;
        }
      }, 500);
    }
  },
  mounted() {
    // this.$refs.scroll.style.height =
    // console.log(this.$refs.head.clientHeight);
    // this.value3 = this.$route.query.type;

    let topHeight = this.$refs.head.clientHeight;
    this.scrollHeigth =
      document.documentElement.clientHeight - topHeight - this.M - 20 + "px";
    let a = this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      overlay: true,
      duration: 3000
    });
    this.$axios
      .post("renting/room", {
        num: 5
      })
      .then(res => {
        // console.log(res.data.data);
        this.room = res.data.data;
        this.chh = true;
        a.clear();
      });
  }
};
</script>
<style lang="less" scoped>
.scrollheight {
  overflow-y: auto;
}
.search {
  width: 85%;
  margin: 0.4rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .iconfont {
    font-size: 0.4rem;
    color: #bebfc0;
  }
  .searchInput {
    width: 90%;
    background: #eeeff1;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    height: 0.6rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    input {
      background: none;
      padding-left: 0.2rem;
    }
  }
}
.search_con {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 9%;
  z-index: 10;
  background: #fff;
  font-size: 0.3rem;
  text-align: center;
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

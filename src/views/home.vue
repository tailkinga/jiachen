<template>
  <div>
    <div ref="scroll" style="overflow-y:auto">
      <!-- 搜索 -->
      <div class="search">
        <div class="searchInput">
          <span class="iconfont iconsousuo"></span>
          <input type="text" />
        </div>
        <div @click="city">
          <span class="iconfont iconlocation" v-if="selectCity"></span>
          <p style="width:.9rem;text-align:right;font-size:.3rem" v-else>{{ storeCity }}</p>
        </div>
      </div>

      <div v-if="!chh">
        <!-- 轮播 -->
        <div class="swiper-content">
          <swiper ref="mySwiper" :options="swiperOption" class="show-swiper" v-if="showSwiper">
            <template v-for="item of list">
              <swiper-slide :key="item.id">
                <img :src="'http://localhost:3001' + item.url" class="imgUrl" alt />
              </swiper-slide>
            </template>
          </swiper>
        </div>
        <!-- meua -->
        <div class="menu">
          <div class="modular" @click="renting">
            <img src="../assets/styles/images/zf.png" alt />
            <p>租房</p>
          </div>
          <div class="modular" @click="renting">
            <img src="../assets/styles/images/hz.png" alt />
            <p>合租</p>
          </div>
          <div class="modular" @click="renting">
            <img src="../assets/styles/images/xiaoqu.png" alt />
            <p>整租</p>
          </div>
          <div class="modular" @click="address">
            <img src="../assets/styles/images/address.png" alt />
            <p>位置</p>
          </div>
        </div>

        <!-- 公寓合租 -->
        <div class="JoinTenancy">
          <div class="title">
            <p>公寓合租</p>
            <van-button
              :loading="loading"
              text="更多"
              type="primary"
              class="lot"
              @click="much"
              loading-type="spinner"
            ></van-button>
          </div>
          <div class="list">
            <div
              class="list_con"
              v-for="(item, index) of jointTenancy"
              :key="index"
              @click="hzdetail(item.title)"
            >
              <img :src="'http://localhost' + item.url" alt />
              <p>{{ item.title }}</p>
              <p style="color:#23d4ce ;margin:.1rem 0">
                ￥{{ item.price }}
                <span style="color:#999;font-size:10px">/月</span>
              </p>
              <div class="condition">
                <p>免租两个月</p>
                <p>集中供暖</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 公寓整租 -->
        <div class="JoinTenancy">
          <div class="title">
            <p>公寓整租</p>
            <van-button
              :loading="zloading"
              text="更多"
              type="primary"
              class="lot"
              @click="lotmuch"
              loading-type="spinner"
            ></van-button>
          </div>
          <div class="list">
            <div
              class="list_con"
              v-for="(item, index) of wholeRent"
              :key="index"
              @click="hzdetail(item.title)"
            >
              <img :src="'http://localhost:3001' + item.url" alt />
              <p>{{ item.title }}</p>
              <p style="color:#23d4ce;margin:.1rem 0">
                ￥{{ item.price }}
                <span style="color:#999;font-size:10px">/月</span>
              </p>
              <div class="condition">
                <p>免租两个月</p>
                <p>集中供暖</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 为你推荐 -->
        <div class="title">
          <p>为你推荐</p>
        </div>
        <div class="recommend">
          <div class="list">
            <div
              class="list_con"
              v-for="(item, index) of recomm"
              :key="index"
              @click="detail(item.title)"
            >
              <img :src="'http://localhost:3001' + item.url" alt />
              <div class="content">
                <p style="font-size:.3rem;font-weight:600;color:#000">
                  {{
                  item.title.length > 9
                  ? item.title.slice(0, 8) + "..."
                  : item.title
                  }}
                </p>
                <p>{{ item.type }}|{{ item.sizeinfo }}</p>
                <p>{{ item.content }}</p>
                <div>
                  <p>品质公寓</p>
                  <p>独立阳台</p>
                </div>
                <p style="color:#23d4ce;font-size:0.3rem">
                  ￥{{ item.price }}
                  <span style="color:#999;font-size:10px">/月</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button class="more" @click="find">更多品质房源</button>
      </div>
      <div v-else style="margin-top:60%">
        <van-empty image="network" description="网络错误" />
      </div>
    </div>

    <navigation @meauHeight="Mheight"></navigation>
  </div>
</template>
<script>
import Navigation from "../components/nav/nav";
import { post, push } from "../assets/styles/common/request";
export default {
  data() {
    return {
      list: [],
      // 轮播配置
      swiperOption: {
        //  pagination:'.swiper-pagination', 显示小点
        slidesPerView: "auto", //设置slider容器能够同时显示的slides数量
        centeredSlides: true,
        init: false, //初始化。
        loop: true, //循环滑动
        autoplay: 2000,
        //滑动速度
        speed: 2000
      },
      M: "", //导航高度
      bannerList: [], //轮播图数组
      wholeRent: [], //整租数据
      jointTenancy: [], //合租数据
      recomm: [], //推荐数据
      loading: false, //加载提示
      zloading: false,
      chh: true //初始化
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
    city() {
      push("/city", {});
    },
    // 跳转列表

    find() {
      push("/lookRoom", { a: 2 });
    },
    // 跳转列表

    renting() {
      push("/lookRoom", { a: 2, type: "合租" });
    },
    // 跳转列表
    address() {
      push("/location", { a: 1 });
    },

    // 合租的更多 加载
    much() {
      this.loading = true;
      let load = setInterval(() => {
        post("renting/join", { type: "合租", num: 5 }).then(res => {
          // console.log(res.data.data);
          this.jointTenancy = res.data.data;
          clearInterval(load);
          this.loading = false;
        });
      }, 2000);
    },
    // 整租的更多加载
    lotmuch() {
      this.zloading = true;
      let load = setInterval(() => {
        post("renting/join", {
          type: "整租",
          num: 5
        }).then(res => {
          // console.log(res.data.data);
          this.wholeRent = res.data.data;
          clearInterval(load);
          this.zloading = false;
        });
      }, 2000);
    },
    //
    hzdetail(name) {
      // console.log(name)
      push("/detail", { name: name, surface: "jc_hz" });
    },
    // 跳转详情
    detail(name) {
      // console.log(name);
      push("/detail", { name: name, surface: "jc_recomm" });
    }
  },
  computed: {
    //这是解决当你进入页面时 轮播图会自动在最后一张的问题
    showSwiper() {
      return this.list.length;
    },

    // 城市选择
    selectCity() {
      return !this.$store.state.city;
    },
    // 城市名字过长时部分显示
    storeCity() {
      let city = this.$store.state.city;
      let showCity = city.slice(0, 2) + "..";

      return city.length > 3 ? showCity : city;
    }

    // newRecom() {
    //   let recomm = this.recomm;
    //   return console.log(recomm.title.length);
    // }
  },
  mounted() {
    // 中间滚动
    this.$refs.scroll.style.height =
      document.documentElement.clientHeight - this.M + "px";

    let a = this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      overlay: true,
      duration: 3000
    });
    // 轮播图请求
    post("images", {
      pid: 0
    }).then(res => {
      // console.log(res.data.data);
      this.list = res.data.data;
      // console.log(this.list);
      this.chh = false;
      a.clear();
    });

    // 整租数据请求
    post("renting/join", {
      type: "整租",
      num: 2
    }).then(res => {
      // console.log(res.data.data);
      this.wholeRent = res.data.data;
    });

    // 合租数据请求
    post("renting/join", {
      type: "合租",
      num: 2
    }).then(res => {
      // console.log(res.data.data);
      this.jointTenancy = res.data.data;
    });

    // 推荐
    post("renting/recom", {}).then(res => {
      // console.log(res.data);
      this.recomm = res.data.data;
    });
  }
};
</script>
<style scoped lang="less">
// 加载更多的样式
.lot {
  background: #19dbe5;
  // width: 1rem;
  height: 0.5rem;
  border: none;
  border-radius: 0.15rem;
  line-height: 0.5rem;
  .van-button__text {
    color: #fff;
  }
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
.swiper-content {
  .show-swiper {
    height: 4rem;

    .imgUrl {
      width: 90%;
      height: 3.5rem;
      display: block;
      margin: 0 auto;
      border-radius: 0.2rem;
      box-shadow: 2px 5px 10px 1px #666;
    }
  }
}

.menu {
  display: flex;
  justify-content: space-between;
  padding: 0 0.3rem 0.5rem 0.3rem;
  box-sizing: border-box;
  border-bottom: 2px solid #f2f2f2;
  .modular {
    width: 20%;
    text-align: center;
    img {
      display: block;
      width: 70%;
      margin: 0.2rem auto;
    }
  }
}

.JoinTenancy {
  border-bottom: 2px solid #f2f2f2;
  padding: 0.5rem 0;
  box-sizing: border-box;
  .title {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    p {
      font-size: 0.4rem;
      &:nth-of-type(2) {
        width: 1rem;
        height: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
        font-size: 0.3rem;
        background: #19dbe5;
        color: #fff;
        border-radius: 0.15rem;
      }
    }
  }
  .list {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    .list_con {
      width: 45%;
      margin-bottom: 0.5rem;
      img {
        width: 100%;
        margin: 0.3rem 0;
        border-radius: 0.2rem;
      }
      div {
        display: flex;
        p {
          font-size: 0.2rem;
          border: 1px solid #ddd;
          margin-right: 0.2rem;
          border-radius: 0.1rem;
          height: 0.35rem;
          line-height: 0.35rem;
          padding: 0 0.05rem;
          color: #999;
          &:nth-of-type(1) {
            background: #23d4ce;
            color: #fff;
            border: none;
          }
        }
      }
    }
  }
}
.title {
  width: 90%;
  margin: 0.5rem auto 0.3rem auto;
  display: flex;
  justify-content: space-between;
  font-size: 0.4rem;
  div {
    font-size: 0.2rem;
    color: #999;
    // width: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
.recommend {
  border-bottom: 2px solid #f2f2f2;
  // padding: 0.5rem 0;
  box-sizing: border-box;
  .list {
    width: 100%;
    .list_con {
      display: flex;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      align-items: flex-start;
      padding: 0.4rem;
      img {
        width: 48%;
        margin-right: 0.3rem;
        border-radius: 0.2rem;
      }
      .content {
        height: 16vh;
        overflow-y: auto;
        p {
          font-size: 0.25rem;
          color: #999;
          line-height: 0.45rem;
        }
        div {
          display: flex;
          p {
            border: 1px solid #ddd;
            border-radius: 0.1rem;
            font-size: 0.2rem;
            height: 13px;
            line-height: 13px;
            margin-right: 0.2rem;
            padding: 0.02rem 0.05rem;
          }
        }
      }
    }
  }
}
.more {
  width: 45%;
  display: block;
  margin: 0.5rem auto;
  padding: 0.18rem 0;
  border-radius: 0.4rem;
  background: #23d4ce;
  color: #fff;
}
</style>

<template>
  <div>
    <div ref="scroll">
      <span class="iconfont iconfanhui" @click="back"></span>
      <!-- 地图容器 -->
      <baidu-map
        style="width:100%;height:100%"
        class="map"
        ak="ofyZucTireWhXsdpWh2TKqbPy2MfuVYe"
        :center="this.$store.state.city"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
      >
        <!-- 地图右下方定位 -->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
          @locationSuccess="getLoctionSuccess"
        ></bm-geolocation>

        <!-- market点 -->
        <div v-for="(item, index) of MarketList" :key="index">
          <bm-marker
            :position="{lng:item.lng,lat:item.lat}"
            @click="moveIn(item.title)"
            animation="BMAP_ANIMATION_BOUNCE"
          >
            <!-- 提示文字 -->
            <bm-label
              :content="item.title+'</br>￥'+item.price+'/月起'"
              :labelStyle="label"
              :offset="{ width: -35, height: 30 }"
            />
          </bm-marker>
        </div>

        <!-- 卫星地图切换 -->
        <bm-map-type
          :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
          anchor="BMAP_ANCHOR_TOP_LEFT"
          style="border:1px solid red"
        ></bm-map-type>
      </baidu-map>
      <!-- 底部弹窗 -->
      <van-popup
        v-model="show"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' ,overflow:'hidden'}"
        round
      >
        <div>
          <p class="title">
            {{title}}
            <span>({{num}})套</span>
          </p>
          <div class="scroll">
            <div class="list" v-for="(item,index) of list" :key="index" @click="detail(item.title)">
              <img
                style="width:50%;border-radius:0.2rem;height:2.5rem"
                :src="'http://localhost:3001' + item.url"
              />
              <div class="content">
                <p
                  style="font-size:.3rem;font-weight:600;color:#000"
                >{{item.type}}·{{item.sizeinfo}}</p>
                <p>{{item.title}} | {{item.floor}}</p>
                <div>
                  <span>免租一个月</span>
                  <span>品质公寓</span>
                </div>
                <p style="color:#17c6cf;margin-top:.1rem">￥{{item.price}}/月</p>
              </div>
            </div>
            <!-- 底部提示文字 -->
            <van-divider :style="{ borderColor: '#ddd', color: '#ddd', padding: '0 16px' }">没有更多了~</van-divider>
          </div>
        </div>
      </van-popup>
    </div>
    <navigation @meauHeight="Mheight"></navigation>
  </div>
</template>
<script>
//百度地图
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmMarkerClusterer from "vue-baidu-map/components/extra/MarkerClusterer";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmGeolocation from "vue-baidu-map/components/controls/Geolocation";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
import BmLabel from "vue-baidu-map/components/overlays/Label";
import BmMapType from "vue-baidu-map/components/controls/MapType";
import Navigation from "../components/nav/nav";

export default {
  data() {
    return {
      MarketList: [],
      label: {
        borderRadius: "5px",
        fontSize: "14px",
        width: "100px",
        height: "40px",
        border: "none",
        background: "#23d4ce",
        color: "#fff",
        marginTop: "5px",
        textAlign: "center"
      },
      show: false,
      M: "",
      title: "",
      num: 0,
      list: "",
      zoom: 15
    };
  },
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmInfoWindow,
    BmGeolocation,
    BmInfoWindow,
    BmLabel,
    BmMapType,
    Navigation
  },

  methods: {
    // 定位成功后触发的函数
    getLoctionSuccess(e) {
      // console.log(e.addressComponent.city);
      let city = e.addressComponent.city;
      this.$store.commit("changeCity", city);
    },
    // 点击不同小区
    moveIn(title) {
      // console.log(title);
      this.title = title;
      this.$axios
        .post("location/selec", {
          title
        })
        .then(res => {
          // console.log(res);
          this.num = res.data.data.length;
          this.list = res.data.data;
        });
      // 显示底部弹框
      this.show = true;
    },
    Mheight(e) {
      this.M = e;
    },
    back() {
      this.$router.go(-1);
    },
    // 跳转详情
    detail(name) {
      console.log(name);
      this.$router.push({
        path: "/detail",
        query: { name: name, surface: "locationlist" }
      });
    }
  },
  mounted() {
    this.$refs.scroll.style.height =
      document.documentElement.clientHeight - this.M + "px";

    let city = this.$store.state.city;
    this.$axios
      .post("/location", {
        city
      })
      .then(res => {
        // console.log(this.MarketList);
        // console.log(res.data.data);
        this.MarketList = res.data.data;
      });
  }
};
</script>
<style scoped lang="less">
.title {
  width: 90%;
  margin: 0 auto;
  font-size: 0.4rem;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0;
}
.scroll {
  height: 40vh;
  overflow-y: auto;
  .list {
    width: 90%;
    margin: 0.5rem auto 0.8rem auto;
    display: flex;
    align-items: flex-start;
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
    }
  }
}

.iconfanhui {
  font-size: 0.5rem;
  color: #fff;
  position: absolute;
  left: 2%;
  top: 4%;
  background: rgba(219, 219, 219, 0.5);
  border-radius: 50%;
  z-index: 99;
}
</style>

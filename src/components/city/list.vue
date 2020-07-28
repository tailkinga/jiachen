<template>
  <div class="list" ref="wrapper">
    <!-- 你选择后的城市 -->
    <div>
      <div class="area">
        <p class="title border-topbottom">当前城市</p>
        <div class="button-list">
          <div class="button-wrap">
            <div class="button" v-show="this.$store.state.city">
              {{ this.$store.state.city }}
            </div>
          </div>
        </div>
      </div>
      <!-- 热门城市推荐 -->
      <div class="area">
        <p class="title border-topbottom">热门城市</p>
        <div class="button-list">
          <div
            class="button-wrap"
            v-for="item of hot"
            :key="item.id"
            @click="handelCity(item.name)"
          >
            <div class="button">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <!-- 城市列表 -->
      <div class="area" v-for="(item, key) of cities" :key="key" :ref="key">
        <p class="title border-topbottom">{{ key }}</p>
        <ul
          class="item-list"
          v-for="infoItem of item"
          :key="infoItem.id"
          @click="handelCity(infoItem.name)"
        >
          <li class="item border-bottom">{{ infoItem.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {};
  },
  props: {
    hot: Array,
    cities: Object,
    letter: String,
  },
  mounted() {
    // 滚动插件及参数配置
    this.scroll = new BScroll(this.$refs.wrapper, {
      mouseWheel: true,
      click: true,
      bounce: false,
      preventDefault: true,
    });
  },
  watch: {
    letter() {
      if (this.letter) {
        const element = this.$refs[this.letter][0];
        //  console.log(this.$refs[this.letter]) 这不是dom 需要加个[0]

        this.scroll.scrollToElement(element, 3000); // 这个方法中必须放入 dom  这个方法是根据dom进行滚动定位
      }
    },
  },
  methods: {
    handelCity(city) {
      // 改变state的值
      this.$store.commit("changeCity", city);
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less" scoped>
.list {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 1.58rem;
  bottom: 0;
  right: 0;
  .title {
    line-height: 0.44rem;
    background: #eeeeee;
    padding-left: 0.2rem;
    font-size: 0.26rem;
    color: #666;
  }
  .button-list {
    padding: 0.1rem 0.6rem 0.1rem 0.1rem;
    overflow: hidden;
    .button-wrap {
      width: 33.33%;
      float: left;
      .button {
        margin: 0.1rem;
        padding: 0.1rem 0;
        text-align: center;
        border: 0.02rem solid #ccc;
        border-radius: 0.06rem;
      }
    }
  }

  .item-list {
    .item {
      line-height: 0.76rem;
      padding-left: 0.2rem;
    }
  }
}
</style>

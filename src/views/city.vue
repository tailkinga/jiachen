<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <router-link to="/home">
        <span class="iconfont iconfanhui"></span>
      </router-link>

      <input v-model="keyword" type="text" class="search-input" placeholder="输入城市名或拼音" />

      <div class="search-content" ref="search" v-show="keyword">
        <ul>
          <li
            class="search-item border-bottom"
            v-for="item of list"
            :key="item.id"
            @click="handelCity(item.name)"
          >{{ item.name }}</li>
          <li class="search-item border-bottom" v-show="listSearch">没有找到匹配项</li>
        </ul>
      </div>
    </div>

    <city-list :hot="hot" :cities="cities" :letter="letter"></city-list>
    <city-letter @change="selectAlp" :cities="cities"></city-letter>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import CityList from "../components/city/list";
import CityLetter from "../components/city/letter";
export default {
  data() {
    return {
      keyword: "", //搜索的输入值
      hot: [], //热门城市
      cities: {}, //所有城市
      letter: "", //所选的右侧字母
      list: [] //搜索到的结果
    };
  },
  components: {
    CityList,
    CityLetter
  },
  computed: {
    listSearch() {
      return !this.list.length;
    }
  },
  methods: {
    // 监听你选择的右侧字母表的哪个字母
    selectAlp(e) {
      // console.log(e);
      this.letter = e;
    },
    handelCity(city) {
      // 向vuex中传入你选的城市
      this.$store.commit("changeCity", city);
      this.$router.push("/home");
      // console.log(city);
    }
  },
  mounted() {
    // 滚动插件
    this.scroll = new BScroll(this.$refs.search, {
      // 允许点击
      click: true
    });
    // 请求本地数据http://39.106.159.90:3002
    this.$axios
      .get("http://localhost:8080/city.json")
      .then(res => {
        // console.log(res);
        let data = res.data.data;
        this.hot = data.hotCities;
        this.cities = data.cities;
        // console.log(this.hot);
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    // 检索你搜索的内容
    keyword() {
      if (!this.keyword) {
        this.list = [];
        return;
      }
      // 节流函数
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const result = [];
        for (let i in this.cities) {
          //  console.log(i)  输出结果是 A B C D  ~ Z
          this.cities[i].forEach(value => {
            // console.log(value) 这是遍历出 每个子母下面对应的值
            if (
              value.spell.indexOf(this.keyword) > -1 ||
              value.name.indexOf(this.keyword) > -1
            ) {
              //indexOf没有找到的话就返回-1
              result.push(value);
            }
          });
        }
        this.list = result;
      }, 100);
    }
  }
};
</script>
<style scoped lang="less">
.search {
  width: 100%;
  background: #23d4ce;
  padding: 0.2rem 0.1rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .iconfont {
    font-size: 0.5rem;
    color: #fff;
  }
  .search-input {
    width: 80%;
    height: 0.62rem;
    margin-left: 3%;
    display: block;
    line-height: 0.62rem;
    border-radius: 0.1rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }
  .search-content {
    overflow: hidden;
    position: absolute;
    z-index: 1;
    top: 1.58rem;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;
    .search-item {
      line-height: 0.62rem;
      padding-left: 0.2rem;
      background: #ffffff;
    }
    .border-bottom {
      &:before {
        border-color: #777;
      }
    }
  }
}
</style>

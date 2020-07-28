<template>
  <div class="nav" ref="nav">
    <div
      :class="shows == index ? 'active' : ''"
      v-for="(item, index) of list"
      :key="item.id"
      @click.prevent="change(index, item.title)"
    >
      <span :class="'iconfont' + ' ' + item.icon"></span>

      <p>{{ item.text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shows: this.$route.query.a || 0,
      list: [
        {
          id: 1,
          text: "首页",
          title: "/home",
          icon: "iconshouye"
        },
        {
          id: 2,
          text: "地图找房",
          title: "/location",
          icon: "iconlocation"
        },
        {
          id: 3,
          text: "快速找房",
          title: "/lookRoom",
          icon: "icongongsixinxi"
        },
        {
          id: 4,
          text: "出租房屋",
          title: "/lease",
          icon: "iconhezu"
        },
        {
          id: 5,
          text: "个人中心",
          title: "/member",
          icon: "iconxiaolian"
        }
      ]
    };
  },
  methods: {
    change(index, title) {
      let that = this;
      that.$router.push({ path: title, query: { a: index } });

      // console.log(index,this.shows)
    }
  },
  mounted() {
    // console.log(this.$refs.nav.clientHeight)
    this.$emit("meauHeight", this.$refs.nav.clientHeight);
  }
};
</script>
<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: center;
  color: #b1b1b3;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  border-top: 1px solid #f2f2f2;
  .active {
    color: #23d4ce;
  }
  div {
    width: 25%;
    text-align: center;
    padding: 0.15rem 0;
    span {
      display: block;
      font-size: 0.5rem;
      margin-bottom: 0.1rem;
    }
  }
}
</style>

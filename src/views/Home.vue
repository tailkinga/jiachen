<template>
  <div>
    <el-container ref="container">
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <home-nav></home-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import HomeHeader from "../components/Home/header";
import HomeNav from "../components/Home/leftNav";
export default {
  data() {
    return {};
  },
  components: {
    HomeHeader,
    HomeNav
  },
  mounted() {
    this.$refs.container.$el.style.height =
      document.documentElement.clientHeight + "px";
    // console.log(document.documentElement.clientHeight + "px");
  }
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>

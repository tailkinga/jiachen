<template>
  <div class="nav">
    <el-radio-group v-model="isCollapse" style="position:absolute;top:10px;left:200px">
      <el-radio-button :label="false">
        <i class="el-icon-s-fold"></i>
      </el-radio-button>
      <el-radio-button :label="true" @click.native="hid">
        <i class="el-icon-s-unfold"></i>
      </el-radio-button>
    </el-radio-group>
    <el-menu
      :default-active="$route.path"
      :unique-opened="true"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin">用户列表</el-menu-item>
        </el-menu-item-group>
        <!-- <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>-->
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">房源管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/room">合租整租房源</el-menu-item>
          <el-menu-item index="/recommend">推荐房源</el-menu-item>
          <el-menu-item index="/mapRoom">地图找房</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-picture"></i>
          <span slot="title">图片管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/images">图片列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">Echarts管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/echarts">Echarts</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    hid() {
      // this.$router.push('/')
    },
  },
};
</script>
<style scoped>
.nav {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}
.el-menu-vertical-demo {
  background: #d3dbe6;
  height: 100%;
}
</style>
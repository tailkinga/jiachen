<template>
  <div class="header">
    <h2>Z-admin</h2>
    <el-dropdown>
      <span class="el-dropdown-link">
        设置
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="loginout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  methods: {
    loginout() {
      console.log(123);
      this.$confirm("确定要退出吗", "提示", {
        type: "warning"
      }).then(() => {
        sessionStorage.clear();
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
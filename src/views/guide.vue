<template>
  <div>
    <img src="../assets/styles/images/logo.png" alt class="logo" />
    <div class="option">
      <button @click.prevent="login">登录</button>
      <button @click.prevent="reg">注册</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    reg() {
      this.$router.push("/reg");
    },
    login() {
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped lang="less">
.logo {
  display: block;
  width: 40%;
  margin: 3.5rem auto;
}
.option {
  width: 70%;
  position: absolute;
  bottom: 10%;
  left: 15%;
  display: flex;
  justify-content: space-between;

  button {
    width: 2.2rem;
    height: 0.8rem;
    font-size: 0.4rem;
    &:nth-of-type(1) {
      background: #17c6cf;
      color: #fff;
    }
    &:nth-of-type(2) {
      background: #fff;
      color: #17c6cf;
      border: 1px solid #17c6cf;
    }
  }
}
</style>
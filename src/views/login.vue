<template>
  <div>
    <img src="../assets/styles/images/logo.png" alt class="logo" />

    <div class="login">
      <div class="input">
        <span class="iconfont iconxingmingyonghumingnicheng"></span>
        <input type="text" placeholder="请输入您的手机号" v-model="phone" />
      </div>

      <div class="input">
        <span class="iconfont iconmima"></span>
        <input type="password" placeholder="请输入您的密码" v-model="pwd" />
      </div>

      <div class="option">
        <p>忘记密码</p>
        <p @click="reg">立即注册</p>
      </div>
      <button class="loginBtn" @click="login">登录</button>
      <router-link to="/home" style="display:block;text-align:center;color:#17c6cf">跳过，直接看房</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "15933258152",
      pwd: "123456"
    };
  },
  methods: {
    login() {
      let phone = this.phone;
      let pwd = this.pwd;
      if (phone && pwd) {
        let a = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          overlay: true,
          duration: 3000
        });
        this.$axios
          .post("login", {
            phone,
            pwd
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              a.clear();
              let username = res.data.data.username;
              localStorage.setItem("username", username);
              this.$router.push("/home");
              return;
            }
            if (res.data.code == 400) {
              this.$toast.fail("尚未注册");
            } else {
              this.$toast.fail("账号或密码不正确");
            }
          })
          .catch(() => {
            a.clear();
            this.$toast.fail("网络错误");
          });
      } else {
        this.$toast("账号或密码不能为空");
      }
    },
    reg() {
      this.$router.push("/reg");
    }
  }
};
</script>
<style scoped lang="less">
.logo {
  display: block;
  width: 40%;
  margin: 30% auto 1rem auto;
}
.login {
  width: 80%;
  margin: 0 auto;

  .input {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    font-size: 0.32rem;
    margin-bottom: 0.3rem;

    input::-webkit-input-placeholder {
      color: #999 !important;
    }

    .iconfont {
      font-size: 0.5rem;
      color: #999;
      margin-right: 0.1rem;
    }
  }

  .option {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.25rem;
    color: #999;
  }
  .loginBtn {
    width: 80%;
    display: block;
    margin: 1.5rem auto 0.5rem auto;
    background: #17c6cf;
    padding: 0.2rem;
    color: #fff;
    font-size: 0.35rem;
    border-radius: 0.4rem;
  }
}
</style>
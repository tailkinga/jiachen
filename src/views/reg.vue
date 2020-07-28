<template>
  <div>
    <img src="../assets/styles/images/logo.png" alt class="logo" />
    <div class="submit">
      <div class="input">
        <span class="iconfont iconxingmingyonghumingnicheng"></span>
        <input type="text" placeholder="请设置您的昵称" v-model="formData.nick" @blur="nick" />
      </div>
      <span style="color:red" v-if="ext">该昵称已被使用！</span>

      <div class="input">
        <span class="iconfont iconmima"></span>
        <input type="password" placeholder="请设置您的密码" v-model="formData.pwd" />
      </div>
      <div class="input">
        <span class="iconfont iconshouji"></span>
        <input type="number" placeholder="请输入手机号" v-model="formData.phone" @blur="phone" />
      </div>
      <span style="color:red" v-if="extPhone">同一手机号不可注册两次！</span>

      <div class="input">
        <span class="iconfont iconyouxiang"></span>
        <input type="text" placeholder="请填写邮箱" v-model="formData.email" />
      </div>
      <div class="input">
        <div class="input_code">
          <span class="iconfont iconyanzhengma"></span>
          <input type="text" placeholder="验证码" v-model="formData.code" />
        </div>
        <button class="resCode" @click="reqCode">{{ txt }}</button>
      </div>

      <button class="reg" @click="reg">注册</button>
      <div class="login">
        已有账号
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { post, toast, fail, success } from "../assets/styles/common/request";

export default {
  data() {
    return {
      formData: {
        nick: "",
        pwd: "",
        phone: "",
        email: "",
        code: ""
      },
      txt: "获取验证码",
      inputCode: "",
      ext: false,
      extPhone: false
    };
  },
  methods: {
    reqCode() {
      let toEmail = this.formData.email;
      if (!toEmail) {
        return toast("请填写邮箱");
      }
      let loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 5000
      });

      post("email", {
        email: toEmail
      })
        .then(res => {
          // console.log(res);
          loading.clear();
          this.txt = "重新获取";
          if (res.data.code == 200) {
            success("已发送至您的邮箱");
            this.inputCode = res.data.send;
          } else {
            fail("发送失败，请检查邮箱");
          }
        })
        .catch(err => {
          loading.clear();
          console.log(err);
        });
    },

    reg() {
      let that = this.formData;
      if (that.nick && that.pwd && that.phone && that.email && that.code) {
        let code = this.formData.code;
        let inputCode = this.inputCode;
        if (code == inputCode) {
          // console.log("ok");
          let data = this.formData;
          post("reg", data)
            .then(res => {
              // console.log(res);
              if (res.data.code == 200) {
                success("注册成功");
                this.$router.push("/login");
              } else {
                fail("注册失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          fail("验证码错误");
        }
      } else {
        return toast("请完善信息");
      }
    },

    nick() {
      let nick = this.formData.nick;
      // console.log(this.formData.nick);
      if (nick) {
        post("reg/ext", {
          nick
        }).then(res => {
          console.log(res);
          if (res.data.code != 200) {
            return (this.ext = true);
          }
          this.ext = false;
        });
      }
    },
    phone() {
      let phone = this.formData.phone;
      // console.log(this.formData.nick);
      if (phone) {
        post("reg/ext", {
          phone
        }).then(res => {
          // console.log(res);
          if (res.data.code != 200) {
            return (this.extPhone = true);
          }
          this.extPhone = false;
        });
      }
    }
  }
};
</script>
<style scoped lang="less">
.logo {
  display: block;
  width: 40%;
  margin: 20% auto 1rem auto;
}
.submit {
  width: 80%;
  margin: 0 auto;

  .input {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    font-size: 0.32rem;
    margin-top: 0.2rem;
    input::-webkit-input-placeholder {
      color: #999 !important;
    }

    .iconfont {
      font-size: 0.5rem;
      color: #999;
      margin-right: 0.1rem;
    }

    .input_code {
      display: flex;

      input {
        width: 60%;
      }
    }

    .resCode {
      font-size: 0.2rem;
      background: #17c6cf;
      color: #fff;
      width: 35%;
      line-height: 0.5rem;
      border-radius: 0.2rem;
    }
  }

  .reg {
    width: 75%;
    padding: 0.1rem 0;
    margin: 0.5rem auto;
    display: block;
    background: #17c6cf;
    color: #fff;
    font-size: 0.4rem;
    border-radius: 0.4rem;
  }

  .login {
    text-align: center;
    color: #999;
  }
}
</style>

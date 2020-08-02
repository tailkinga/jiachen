<template>
  <div class="login">
    <div class="form">
      <div class="form_left">
        <ul class="text">
          <li>Welcome !</li>
          <li>后台管理系统</li>
        </ul>
      </div>
      <div class="form_right">
        <div class="input">
          <span class="iconfont">&#xe657;</span>
          <el-input placeholder="请输入用户名" v-model="user" clearable></el-input>
        </div>
        <div class="input">
          <span class="iconfont">&#xe615;</span>
          <el-input placeholder="请输入密码" v-model="pwd" clearable></el-input>
        </div>
        <div class="input">
          <span class="iconfont">&#xe637;</span>
          <el-input placeholder="验证码" v-model="qpwd" clearable></el-input>
        </div>

        <div class="storage">
          <div>
            <el-checkbox v-model="remeber">记住密码</el-checkbox>
          </div>

          <div>
            <el-checkbox v-model="forget">忘记密码</el-checkbox>
          </div>
        </div>

        <button type="button" class="logBtn" @click="submit" v-loading="log">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      user: "admin",
      pwd: "123456",
      qpwd: "",
      remeber: "",
      forget: "",
      log: false
    };
  },
  methods: {
    submit() {
      let username = this.user;
      let password = this.pwd;
      if (username == "" || password == "") {
        this.$message({
          message: "用户名或密码不能为空",
          type: "error"
        });
        return;
      } else {
        this.log = true;
        this.$axios
          .post("admin/login", {
            username,
            password
          })
          .then(this.getSuccessUser)
          .catch(err => {
            this.log = false;

            this.$message({
              message: "网络错误",
              type: "error"
            });
          });
      }
    },
    getSuccessUser(res) {
      // console.log(res);
      if (res.data.code == 200 && res.data.date !== "") {
        this.$message({
          message: "登录成功",
          type: "success"
        });
        this.log = false;
        // console.log('ok')
        // let token =
        let username = this.user;
        let password = this.pwd;
        let data = {
          token: res.data.token,
          username,
          password
        };
        sessionStorage.setItem("data", JSON.stringify(data));
        this.$router.push("/");
      } else {
        this.$message({
          message: res.data.msg,
          type: "error"
        });
        this.log = false;
      }
    }
  }
};
</script>
<style scoped>
.input >>> .el-input__inner {
  border: none;
}
.login {
  width: 100%;
  height: 100vh;
  background: url("../assets/bg.png") no-repeat center center;
  background-size: 100%;
}
.form {
  width: 50%;
  height: 450px;
  position: fixed;
  left: 25%;
  top: 25%;
  background: #fff;
  border-radius: 15px;
  box-shadow: -3px 3px 20px 1px #09375c;
  display: flex;
}
.form_left {
  width: 50%;
  height: 100%;
  background-image: linear-gradient(to bottom right, #75cfe9, #2e8ad7);
  border-radius: 15px 0 0 15px;
  line-height: 100px;
}
.text {
  padding-top: 120px;
}

.text li {
  color: #fff;
  font-size: 32px;
  text-align: center;
  list-style: none;
}

.form_right {
  width: 50%;
  padding-top: 10px;
}

.form_right span {
  font-size: 40px;
  color: #d6d6d4;
}

.input {
  width: 90%;
  margin: 30px auto;
  border-bottom: 1px solid #d6d6d4;
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.storage {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  color: #d6d6d4;
  padding: 10px 0;
}
.logBtn {
  display: block;
  width: 300px;
  height: 45px;
  margin: 30px auto 0 auto;
  font-size: 18px;
  border: none;
  background-image: linear-gradient(to bottom right, #6ad2f9, #77b2ff);
  border-radius: 5px;
  color: #fff;
  outline: none;
}
</style>
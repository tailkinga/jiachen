<template>
  <div>
    <div class="title">
      <span class="iconfont iconfanhui" @click="back"></span>
      <p>意见反馈</p>
    </div>

    <div>
      <!-- autofocus自动获取焦点 -->
      <textarea
        name="review"
        class="reviewCon"
        v-model="reviewCon"
        cols="30"
        rows="10"
        autofocus
        placeholder="您的宝贵意见~"
      ></textarea>
    </div>

    <div v-for="(item,index) of list" :key="index" class="review">
      <span>{{item.title}}</span>
      <!-- 想要根据点击不同的星评产生相应的分数   v-model的数据绑定必须是一一对应 -->
      <van-rate
        v-model="item.value"
        allow-half
        void-icon="star"
        void-color="#eee"
        color="#ffd21e"
        @change="onChange(index)"
      />
    </div>

    <button class="submit" @click="submit">提交意见</button>
  </div>
</template>
<script>
// import { toast } from "../assets/styles/common/request";
export default {
  data() {
    return {
      // 里面的value值是为了初始化 星评
      list: [
        { title: "推荐满意", value: 5 },
        { title: "服务态度", value: 5 },
        { title: "房屋品质", value: 5 }
      ],
      reviewCon: "",
      result: ""
    };
  },
  methods: {
    onChange(index) {
      // 根据你点击不同的评价 其他两项不点的话自动为五分 然后传给后台
      let result = [5, 5, 5];
      if (index == 0) {
        result.splice(0, 1, this.list[0].value);
      } else if (index == 1) {
        result.splice(1, 1, this.list[1].value);
      } else if (index == 2) {
        result.splice(2, 1, this.list[2].value);
      }
      this.result = result;
    },
    back() {
      this.$router.go(-1);
    },
    // 提交
    submit() {
      if (this.result == "") {
        this.result = [5, 5, 5];
      }
      let result = this.result;
      if (this.reviewCon == "") {
        this.reviewCon = "无建议";
      }
      let reviewCon = this.reviewCon;
      this.$axios
        .post("opinion", {
          result,
          reviewCon
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast.success("提交成功");
            this.$router.go(-1);
          } else {
            this.$toast.success("提交失败");
          }
        });
    }
  }
};
</script>
<style scoped lang="less">
.title {
  width: 100%;
  height: 0.8rem;
  background: #23d4ce;
  color: #fff;
  font-size: 0.35rem;
  position: relative;
  .iconfanhui {
    position: absolute;
    left: 1%;
    line-height: 0.8rem;
    font-size: 0.6rem;
  }
  p {
    text-align: center;
    line-height: 0.8rem;
  }
}
.review {
  // border: 1px solid red;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
  span {
    font-size: 0.35 rem;
    color: #999;
    margin-right: 0.5rem;
  }
}
.reviewCon {
  background: #efefef;
  width: 90%;
  margin: 0.5rem auto;
  border-radius: 0.3rem;
  display: block;
  padding: 0.3rem;
  box-sizing: border-box;
  &::placeholder {
    color: #cfcfcf !important;
  }
}
.submit {
  width: 50%;
  display: block;
  margin: 1rem auto 0 auto;
  background: #23d4ce;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.2rem;
  font-size: 0.3rem;
}
</style>
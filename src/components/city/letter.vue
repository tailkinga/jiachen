<template>
  <!-- 字母列表 -->
  <ul class="A-list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="AlpClick"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      touchStatus: false,
      stratY: 0,
      timer: null,
    };
  },
  props: {
    cities: Object,
  },
  computed: {
    //   从城市列表数据里拿出首字母
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters;
    },
  },
  methods: {
    AlpClick(e) {
      // console.log(e.target.innerText)
      //   向父组件发送
      this.$emit("change", e.target.innerText);
    },
    handleTouchStart() {
      // 触摸开始
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      // 这是你拖动右侧字母列表时 左侧联动的算法
      if (this.touchStatus) {
        /*
        这样写性能会有所下降 所以要优化一下代码
        const stratY=this.$refs['A'][0].offsetTop  //输出的是145 就是A 到上面header最下沿的距离
        */
        //  下面这个节流函数是为了减少touchMove的执行频率  意思是假如你在16毫秒内 又执行滑动（就是你滑的很快在一个字母上未停留16毫秒以上）
        //  他会给你之前的滑动清除
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 200; //这是求你手指触摸的地方 到header最下沿的距离 79 是header的高
          const index = Math.floor((touchY - this.stratY) / 22); //这是求你触目的下标 touchY-stratY你A 到你触摸字母的距离 22是每个字母的高
          // 这就可以知道你所触摸到A有几个字母 也就是下标
          // console.log(index)
          if (index >= 0 && index < this.letters.length) {
            this.$emit("change", this.letters[index]); //然后 根据你上面求出的下标 找到是哪个字母 传给父组件 然后父组件再传给list组件
          }
        }, 16);
      }
    },
    // 触摸结束
    handleTouchEnd() {
      this.touchStatus = false;
    },
  },
};
</script>
<style scoped lang="less">
.A-list {
  position: absolute;
  right: 0;
  top: 1.58rem;
  bottom: 0;
  width: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .item {
    line-height: 0.44rem;
    text-align: center;
    color: #999;
  }
}
</style>

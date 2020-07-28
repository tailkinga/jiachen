import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/reset.css";
import "./assets/styles/border.css";
import "./assets/styles/iconfont.css";
import Vant from "vant";
import "vant/lib/index.css";
import axios from "axios";
import AwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

Vue.config.productionTip = false;
Vue.use(AwesomeSwiper);
Vue.use(Vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// http://39.106.159.90:3001/ 线上接口
axios.defaults.baseURL = "http://localhost:3001/";
Vue.prototype.$axios = axios;

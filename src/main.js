import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import "./assets/iconfont.css";
import "nprogress/nprogress.css";

Vue.config.productionTip = false;
Vue.use(ElementUi);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// http://39.106.159.90:3001/
axios.defaults.baseURL = "http://localhost:3001/";

//请求头中携带token
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    config.headers.data = sessionStorage.getItem("data") || "";
    return config;
  },
  (err) => {
    console.log(err);
  }
);
Vue.prototype.$axios = axios;

//响应拦截器
// axios.interceptors.response.use(res=>{

//   return res   //也是必须返回才有效
// },err =>{
//   console.log(err)
// })

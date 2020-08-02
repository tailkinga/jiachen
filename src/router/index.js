import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import NProgress from "nprogress";
// 上方进度条配置
NProgress.configure({
  showSpinner: false,
});
NProgress.configure({
  easing: "ease-in-out",
  speed: 3000,
});

// 如果重新进入相同路由的话会报错 因为是版本更新的原因 所以 重写push跳转方法
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
Vue.use(VueRouter);

// 进度条的使用
Vue.use(NProgress);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      // 左侧导航栏 进入时会默认显示 children的第一个路径   home页面中main转换页面需要router-view
      {
        path: "/",
        component: () => import("../views/Welcome"),
        name: "welcome",
      },
      {
        path: "/admin",
        component: () => import("../views/administrators"),
        name: "adminis",
      },
      {
        path: "/room",
        component: () => import("../views/room"),
        name: "Room",
      },
      {
        path: "/echarts",
        component: () => import("../views/Echarts"),
        name: "echarts",
      },
      {
        path: "/images",
        component: () => import("../views/images"),
        name: "images",
      },
      {
        path: "/recommend",
        component: () => import("../views/recommend"),
        name: "Recommend",
      },
      {
        path: "/order",
        component: () => import("../views/order"),
        name: "Order",
      },
      {
        path: "/mapRoom",
        component: () => import("../views/mapRoom"),
        name: "mapRoom",
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    NProgress.start();
    return next();
  } else {
    let data = window.sessionStorage.getItem("data");
    // console.log(data)
    if (!data) {
      NProgress.start();
      return next("login");
    } else {
      NProgress.start();

      next();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;

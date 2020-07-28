import Vue from "vue";
import VueRouter from "vue-router";
import Guide from "../views/guide";
Vue.use(VueRouter);

// 解决路由重复点击问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

const routes = [
  {
    path: "/",
    name: "Guide",
    component: Guide,
  },
  {
    path: "/reg",
    name: "Reg",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/reg"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/home"),
  },

  {
    path: "/member",
    name: "Member",
    component: () => import("../views/member"),
  },
  {
    path: "/lookRoom",
    name: "lookRoom",
    component: () => import("../views/lookRoom"),
  },
  {
    path: "/lease",
    name: "Lease",
    component: () => import("../views/lease"),
  },
  {
    path: "/city",
    name: "City",
    component: () => import("../views/city"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../views/detail"),
  },
  {
    path: "/follow",
    name: "Follow",
    component: () => import("../views/follow"),
  },
  {
    path: "/opinion",
    name: "Opinion",
    component: () => import("../views/opinion"),
  },
  {
    path: "/location",
    name: "Location",
    component: () => import("../views/location"),
  },
  {
    path: "/infor",
    name: "Infor",
    component: () => import("../views/infor"),
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/order"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

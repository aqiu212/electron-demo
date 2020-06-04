import Vue from "vue";
import Router from "vue-router";

const homePage = () => import("../views/home");
Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "home",
      component: homePage
    }
  ]
});

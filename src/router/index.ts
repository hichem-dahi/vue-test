import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/HomeView.vue";
import Contact from "@/views/ContactView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contact/:seed",
    name: "Contact",
    component: Contact,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

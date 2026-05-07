import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/HomePage.vue"),
  },
  {
    path: "/details/:id",
    name: "show-details",
    component: () => import("../pages/ShowDetailsPage.vue"),
    props: true,
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../pages/SearchPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

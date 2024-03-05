import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Step1",
    name: "Step1",
    component: () => import("../views/Step1.vue"),
  },
  {
    path: "/Step2",
    name: "Step2",
    component: () => import("../views/Step2.vue"),
  },
  {
    path: "/Step3",
    name: "Step3",
    component: () => import("../views/Step3.vue"),
  },
  {
    path: "/Step4",
    name: "Step4",
    component: () => import("../views/Step4.vue"),
  },
  {
    path: "/Step5",
    name: "Step5",
    component: () => import("../views/Step5.vue"),
  },
  {
    path: "/Step6",
    name: "Step6",
    component: () => import("../views/Step6.vue"),
  },
  {
    path: "/Step7",
    name: "Step7",
    component: () => import("../views/Step7.vue"),
  },
  {
    path: "/Step8",
    name: "Step8",
    component: () => import("../views/Step8.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

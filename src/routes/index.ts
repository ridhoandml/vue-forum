import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

// Import Page
import PageHome from "@/components/PageHome.vue";
import PageThreadView from "@/components/PageThreadView.vue";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
  },
  {
    path: "/thread/:id",
    name: "ThreadView",
    component: PageThreadView,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

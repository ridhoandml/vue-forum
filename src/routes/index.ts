import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

// Import Page
import PageHome from "@/pages/PageHome.vue";
import PageThreadView from "@/pages/PageThreadView.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import PageForum from "@/pages/PageForum.vue";
import PageCategory from "@/pages/PageCategory.vue";
import PageProfile from "@/pages/PageProfile.vue";
import { useStore } from "@/stores";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
  },
  {
    path: "/me",
    name: "Profile",
    component: PageProfile,
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: PageProfile,
    props: { edit: true },
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: PageForum,
    props: true,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: PageCategory,
    props: true,
  },
  {
    path: "/thread/:id",
    name: "ThreadView",
    component: PageThreadView,
    props: true,
    beforeEnter: (to, from, next) => {
      const { threads } = useStore();
      const threadExists = threads.find((t) => t.id === to.params.id);

      if (threadExists) {
        next();
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: PageNotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

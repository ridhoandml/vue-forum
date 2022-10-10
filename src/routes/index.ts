import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import dataSources from "@/data/data.json";

// Import Page
import PageHome from "@/pages/PageHome.vue";
import PageThreadView from "@/pages/PageThreadView.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import PageForum from "@/pages/PageForum.vue";
import Category from "@/pages/PageCategory.vue";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
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
    component: Category,
    props: true,
  },
  {
    path: "/thread/:id",
    name: "ThreadView",
    component: PageThreadView,
    props: true,
    beforeEnter: (to, from, next) => {
      const threadExists = dataSources.threads.find(
        (t) => t.id === to.params.id
      );

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

import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

// Import Page
import PageHome from "@/components/PageHome.vue";
import PageThreadView from "@/components/PageThreadView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
  ],
});

const forumApp = createApp(App);
forumApp.use(router);

// forumApp.component("NiceButton", {});
// forumApp.use(SomePlugin);
forumApp.mount("#app");

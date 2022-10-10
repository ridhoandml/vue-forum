import { createApp } from "vue";
import App from "@/App.vue";
import AppDate from "@/components/AppDate.vue";
import { router } from "@/routes";
import { createPinia } from "pinia";

const forumApp = createApp(App);
const pinia = createPinia();

forumApp.use(pinia);
forumApp.component("AppDate", AppDate);
forumApp.use(router);
forumApp.mount("#app");

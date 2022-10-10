import { defineStore } from "pinia";
import dataSources from "@/datas/data.json";
import type {
  Category,
  DataForum,
  Forum,
  Post,
  Thread,
  User,
} from "@/assets/types";
import { computed, ref, type Ref } from "vue";

export const useStore = defineStore("main", () => {
  const data: Ref<DataForum> = ref(dataSources);

  const forums: Ref<Forum[]> = ref(dataSources.forums);
  const categories: Ref<Category[]> = ref(dataSources.categories);
  const threads: Ref<Thread[]> = ref(dataSources.threads);
  const users: Ref<User[]> = ref(dataSources.users);
  const posts: Ref<Post[]> = ref(dataSources.posts);

  return { data, forums, categories, threads, users, posts };
});

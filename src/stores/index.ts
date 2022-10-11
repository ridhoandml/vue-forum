import { defineStore } from "pinia";
import dataSources from "@/datas/data.json";
import type {
  AuthUser,
  Category,
  DataForum,
  Forum,
  Post,
  Thread,
  User,
} from "@/types";
import { computed, ref, type Ref } from "vue";

export const useStore = defineStore("main", () => {
  const data: Ref<DataForum> = ref(dataSources);

  const forums: Ref<Forum[]> = ref(dataSources.forums);
  const categories: Ref<Category[]> = ref(dataSources.categories);
  const threads: Ref<Thread[]> = ref(dataSources.threads);
  const users: Ref<User[]> = ref(dataSources.users);
  const posts: Ref<Post[]> = ref(dataSources.posts);

  const user: Ref<AuthUser> = ref({
    authId: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
  });

  const getAuthUser = computed(() =>
    users.value.find((u) => u.id === user.value.authId)
  );

  const createPost = ({ text, id }: { text: string; id: string }) => {
    const thread = threads.value.find((t) => t.id === id);

    const postId = `qqqq` + Math.random();
    const post: Post = {
      edited: null,
      id: postId,
      text: text,
      threadId: id,
      publishedAt: Math.floor(Date.now() / 1000),
      userId: `38St7Q8Zi2N1SPa5ahzssq9kbyp1`,
    };

    posts.value.push(post);
    thread?.posts.push(post.id);
  };

  return {
    data,
    forums,
    categories,
    threads,
    users,
    posts,
    createPost,
    getAuthUser,
  };
});

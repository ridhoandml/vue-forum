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

  const findUser = (id: string) => users.value.find((u) => u.id === id);

  const getPosts = computed(() => {
    const userData = findUser(user.value.authId);
    return posts.value.filter((p) => p.userId === userData?.id);
  });

  const getThreads = computed(() => {
    const userData = findUser(user.value.authId);
    return threads.value.filter((t) => t.userId === userData?.id);
  });

  const getAuthUser = computed(() => {
    const userData = findUser(user.value.authId);
    if (!userData) return null;
    return {
      ...userData,
    };
  });

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

  const updateUser = ({ user, userId }: { user: User; userId: string }) => {
    const findIndex = users.value.findIndex((u) => u.id === userId);
    users.value[findIndex] = user;
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
    getThreads,
    getPosts,
    updateUser,
  };
});

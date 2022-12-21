import { defineStore } from "pinia";
import type {
  AuthUser,
  Category,
  Forum,
  Post,
  Thread,
  ThreadView,
  User,
} from "@/types";
import { computed, onMounted, ref } from "vue";
import { findById } from "@/helper";
import { collection, query, onSnapshot } from "firebase/firestore";
import { database } from "@/firebase";

export const useStore = defineStore("main", () => {
  const forums = ref<Forum[]>([]);
  const categories = ref<Category[]>([]);
  const threads = ref<Thread[]>([]);
  const users = ref<User[]>([]);
  const posts = ref<Post[]>([]);

  onMounted(() => {
    const queryCategories = query(collection(database, "categories"));
    onSnapshot(queryCategories, (querySnapshot) => {
      const resCategories: Category[] = [];
      querySnapshot.forEach((doc) => {
        const category: Category = {
          forums: doc.data().forums,
          name: doc.data().name,
          slug: doc.data().slug,
          id: doc.id,
        };
        resCategories.push(category);
      });
      categories.value = resCategories;
    });
  });

  const setThreads = (getThreads: Thread[]) => {
    threads.value = getThreads;
  };

  const user = ref<AuthUser>({
    authId: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
  });

  const findUser = findById({
    resources: users.value,
    id: user.value.authId,
  });

  const publishedAt = Math.floor(Date.now() / 1000);

  const getPosts = computed(() =>
    posts.value.filter((p) => p.userId === findUser?.id)
  );

  const getThreads = computed(() =>
    threads.value.filter((t) => t.userId === findUser?.id)
  );

  const getAuthUser = computed(() => {
    if (!findUser) return null;
    return {
      ...findUser,
    };
  });

  const getUser = (id: string) => {
    const user = findById({ resources: users.value, id });
    if (!user) return null;
    return {
      user: users.value.find((u) => u.id === user.id)!,
      posts: posts.value.filter((p) => p.userId === user.id),
      threads: threads.value.filter((t) => t.userId === user.id),
    };
  };

  const getThreadView = (id: string) => {
    const findThread = findById({ resources: threads.value, id });
    return {
      ...findThread,
      author: findById({ resources: users.value, id: findThread.userId }),
      repliesCount: findThread.posts.length - 1,
      contributorsCount: findThread.contributors?.length,
    } as ThreadView;
  };

  const postData = ({ text, id }: { text: string; id: string }) => {
    const postId = `qqqq` + Math.random();
    return {
      edited: null,
      id: postId,
      text: text,
      threadId: id,
      publishedAt,
      userId: user.value.authId,
    } as Post;
  };

  const threadData = ({
    title,
    forumId,
  }: {
    title: string;
    forumId: string;
  }) => {
    const threadId = `tttt` + Math.random();
    return {
      contributors: [],
      firstPostId: "",
      forumId,
      lastPostAt: publishedAt,
      lastPostId: "",
      posts: [],
      publishedAt: publishedAt,
      slug: "",
      title: title,
      userId: user.value.authId,
      id: threadId,
    } as Thread;
  };

  const createPost = ({
    text,
    threadId,
  }: {
    text: string;
    threadId: string;
  }) => {
    const thread = findById({ resources: threads.value, id: threadId });
    const newPost = postData({ text, id: threadId });
    posts.value.push(newPost);
    thread.posts.push(newPost.id);
  };

  const createThread = async ({
    title,
    content,
    forumId,
  }: {
    title: string;
    content: string;
    forumId: string;
  }) => {
    const forum = findById({ resources: forums.value, id: forumId });
    const newThread = threadData({ title, forumId: forum.id });

    if (content != "".trim()) {
      const newPost = postData({ text: content, id: newThread.id });
      posts.value.push(newPost);
      newThread.posts.push(newPost.id);
      newThread.contributors?.push(newPost.userId);
      threads.value.push(newThread);
      forum.threads?.push(newThread.id);
    } else {
      threads.value.push(newThread);
      forum.threads?.push(newThread.id);
    }
    return findById({ resources: threads.value, id: newThread.id });
  };

  const updateThread = async ({
    title,
    content,
    id,
  }: {
    title: string;
    content: string;
    id: string;
  }) => {
    const thread = findById({ resources: threads.value, id });
    const post = posts.value.find((t) => t.id === thread?.posts[0]);

    const updateThread = { ...(thread as Thread), title };
    const updatePost = { ...(post as Post), text: content };

    const indexThread = threads.value.findIndex((t) => t.id === thread?.id);
    if (thread!.id && indexThread !== -1) {
      threads.value[indexThread] = updateThread;
    } else {
      threads.value.push(updateThread);
    }

    const indexPost = posts.value.findIndex((p) => p.id === post?.id);
    if (post!.id && indexPost !== -1) {
      posts.value[indexPost] = updatePost;
    } else {
      posts.value.push(updatePost);
    }

    return findById({ resources: threads.value, id });
  };

  const updateUser = ({ user, userId }: { user: User; userId: string }) => {
    const findIndex = users.value.findIndex((u) => u.id === userId);
    users.value[findIndex] = user;
  };

  return {
    forums,
    categories,
    threads,
    users,
    posts,
    setThreads,
    getUser,
    getThreadView,
    createPost,
    getAuthUser,
    getThreads,
    getPosts,
    createThread,
    updateThread,
    updateUser,
  };
});

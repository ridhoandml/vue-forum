<script setup lang="ts">
import { computed, ref } from "vue";
import dataSources from "@/data/data.json";
import type { Post, Thread } from "@/assets/types";
import PostList from "@/components/PostList.vue";
import PostEditor from "../components/PostEditor.vue";

const threads = ref<Thread[]>(dataSources.threads);
const posts = ref<Post[]>(dataSources.posts);

const props = defineProps<{
  id: string;
}>();

const thread = computed(() => {
  return threads.value.find((t) => t.id === props.id);
});

const threadPosts = computed(() => {
  return posts.value.filter((p) => p.threadId === props.id);
});

const addPost = (eventData: any) => {
  const post: Post = {
    ...eventData,
    threadId: props.id,
  };

  posts.value.push(post);
  thread.value?.posts.push(post.id);
};
</script>

<template>
  <div class="col-large push-top">
    <h1>{{ thread?.title }}</h1>
    <PostList :posts="threadPosts"></PostList>
    <PostEditor @save="addPost" />
  </div>
</template>

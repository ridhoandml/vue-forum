<script setup lang="ts">
import { computed } from "vue";
import PostList from "@/components/PostList.vue";
import PostEditor from "../components/PostEditor.vue";
import type { Post } from "@/assets/types";
import { useStore } from "@/stores";

const { threads, posts } = useStore();

const props = defineProps<{
  id: string;
}>();

const thread = computed(() => {
  return threads.find((t) => t.id === props.id);
});

const threadPosts = computed(() => {
  return posts.filter((p) => p.threadId === props.id);
});

const addPost = (eventData: any) => {
  const post: Post = {
    ...eventData,
    threadId: props.id,
  };
  posts.push(post);
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

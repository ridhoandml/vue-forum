<script setup lang="ts">
import { computed } from "vue";
import PostList from "@/components/PostList.vue";
import PostEditor from "../components/PostEditor.vue";
import { useStore } from "@/stores";
import { findById } from "@/helper";

const { threads, posts, createPost } = useStore();

const props = defineProps<{
  id: string;
}>();

const thread = computed(() => findById({ resources: threads, id: props.id }));

const threadPosts = computed(() => {
  return posts.filter((p) => p.threadId === props.id);
});

const getValue = (eventData: string) => {
  createPost({ text: eventData, threadId: props.id });
};
</script>

<template>
  <div class="col-large push-top">
    <h1>
      {{ thread?.title }}
      <RouterLink
        :to="{ name: 'ThreadEdit', params: { id: thread?.id } }"
        class="btn-green btn-small"
        >Edit</RouterLink
      >
    </h1>
    <PostList :posts="threadPosts"></PostList>
    <PostEditor @@get-value="getValue" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PostList from "@/components/PostList.vue";
import PostEditor from "../components/PostEditor.vue";
import { useStore } from "@/stores";

const { posts, createPost, getThreadView } = useStore();

const props = defineProps<{
  id: string;
}>();

const threadPosts = computed(() => {
  return posts.filter((p) => p.threadId === props.id);
});

const thread = computed(() => getThreadView(props.id));

const getValue = (eventData: string) => {
  createPost({ text: eventData, threadId: props.id });
};
</script>

<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <RouterLink
        :to="{
          name: 'ThreadEdit',
          params: { id: thread.id },
        }"
        class="btn-green btn-small"
        >Edit</RouterLink
      >
    </h1>
    <p>
      By
      <a href="#" class="link-unstyled">{{ thread.author.name }}</a>
      <span
        class="hide-mobile text-faded text-small"
        style="float: right; margin-top: 2px"
      >
        {{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributor
      </span>
    </p>
    <PostList :posts="threadPosts"></PostList>
    <PostEditor @@get-value="getValue" />
  </div>
</template>

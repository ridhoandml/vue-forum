<script setup lang="ts">
import ThreadList from "../components/ThreadList.vue";
import dataSources from "@/data/data.json";
import { computed, ref } from "vue";
import type { Forum, Thread } from "@/assets/types";
const props = defineProps<{
  id: string;
}>();

const forums = ref<Forum[]>(dataSources.forums);
const threads = ref<Thread[]>(dataSources.threads);

const forum = computed(() => forums.value.find((f) => f.id === props.id));
const threadsList = computed(() =>
  threads.value.filter((t) => t.forumId === props.id)
);
</script>

<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum?.name }}</h1>
        <p class="text-lead">{{ forum?.description }}</p>
      </div>
      <a class="btn-green btn-small" href="">Start a thread</a>
    </div>
  </div>
  <div class="col-full push-top">
    <ThreadList :threads="threadsList" />
  </div>
</template>

<script setup lang="ts">
import ThreadList from "../components/ThreadList.vue";
import { computed } from "vue";
import { useStore } from "@/stores";
import { findById } from "@/helper";

const props = defineProps<{
  id: string;
}>();

const { forums, threads } = useStore();

const forum = computed(() => findById({ resources: forums, id: props.id }));
const threadsList = computed(() =>
  threads.filter((t) => t.forumId === props.id)
);
</script>

<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum?.name }}</h1>
        <p class="text-lead">{{ forum?.description }}</p>
      </div>
      <RouterLink
        class="btn-green btn-small"
        :to="{ name: 'ThreadCreate', params: { forumId: forum!.id } }"
        >Start a thread</RouterLink
      >
    </div>
  </div>
  <div class="col-full push-top">
    <ThreadList :threads="threadsList" />
  </div>
</template>

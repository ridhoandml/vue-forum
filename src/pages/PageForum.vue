<script setup lang="ts">
import ThreadList from "../components/ThreadList.vue";
import { computed } from "vue";
import { findById } from "@/helper";
import { useFetchForums } from "@/composables";

const props = defineProps<{
  id: string;
}>();

const { isError, isLoading, isReady, forums, errorMessage } = useFetchForums();

// const { forums, getThreadView } = useStore();

const forum = computed(() =>
  findById({ resources: forums.value, id: props.id })
);
// const threadsList = computed(() =>
//   forum.value.threads!.map((threadId) => getThreadView(threadId))
// );
</script>

<template>
  <p class="text-center" v-if="isLoading">Loading</p>
  <div v-else-if="isReady" class="col-full push-top">
    <div>
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
  </div>
  <p v-else-if="isError">{{ errorMessage }}</p>
</template>

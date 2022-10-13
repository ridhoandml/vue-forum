<script setup lang="ts">
import type { Forum } from "@/types";

const props = withDefaults(
  defineProps<{
    forums: Forum[];
    title: string;
    categoryId?: string;
  }>(),
  {
    title: "Forum",
  }
);
</script>

<template>
  <div class="col-full">
    <div class="forum-list">
      <div class="list-title">
        <RouterLink
          v-if="categoryId"
          :to="{ name: 'Category', params: { id: categoryId } }"
          >{{ props.title }}</RouterLink
        >
        <span v-else>Forums</span>
      </div>

      <div v-for="forum in props.forums" :key="forum.id" class="forum-listing">
        <div class="forum-details">
          <RouterLink
            class="text-xlarge"
            :to="{ name: 'Forum', params: { id: forum.id } }"
            >{{ forum.name }}</RouterLink
          >
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length ?? 0 }}</span>
            {{ forum.threads?.length! > 1 ? "threads" : "thread" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

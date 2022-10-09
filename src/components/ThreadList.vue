<script setup lang="ts">
import { ref } from "vue";
import dataSources from "@/data/data.json";
import type { Thread } from "@/assets/types/Index";

defineProps<{
  threads: Thread[];
}>();

const users = ref(dataSources.users);

const userById = (userId: string) => users.value.find((u) => u.id === userId);
</script>

<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <RouterLink
              :to="{ name: 'ThreadView', params: { id: thread.id } }"
              >{{ thread.title }}</RouterLink
            >
          </p>
          <p>
            By
            <a href="">{{ userById(thread.userId)?.name }}</a>
            {{ thread.publishedAt }}
          </p>
        </div>
        <div class="activity">
          <p class="replies-count">{{ thread.posts.length }} replies</p>
          <img
            :src="userById(thread.userId)?.avatar"
            :alt="userById(thread.userId)?.name"
            class="avatar"
          />
          <span>
            <a class="text-xsmall" href="">{{
              userById(thread.userId)?.name
            }}</a>
            <p class="text-faded text-xsmall">{{ thread.publishedAt }}</p>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

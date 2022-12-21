<script setup lang="ts">
import type { Category } from "@/types";
import ForumList from "./ForumList.vue";
import { useFetchForums } from "@/composables";

const { isError, isLoading, isReady, forums, errorMessage } = useFetchForums();

const props = defineProps<{
  categories: Category[];
}>();

const getForumsCategory = (category: Category) =>
  forums.value.filter((f) => f.categoryId === category.id);
</script>

<template>
  <p class="text-center" v-if="isLoading">Loading</p>
  <ForumList
    v-else-if="isReady"
    v-for="category in props.categories"
    :key="category.id"
    :forums="getForumsCategory(category)"
    :title="category.name"
    :category-id="category.id"
  />
  <p v-else-if="isError">{{ errorMessage }}</p>
</template>

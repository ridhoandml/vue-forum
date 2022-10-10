<script setup lang="ts">
import type { Category } from "@/assets/types";
import ForumList from "./ForumList.vue";
import { useDataSources } from "@/composables/useDataSources";

const { forums } = useDataSources();

const props = defineProps<{
  categories: Category[];
}>();

const getForumsCategory = (category: Category) =>
  forums.filter((f) => f.categoryId === category.id);
</script>

<template>
  <ForumList
    v-for="category in props.categories"
    :key="category.id"
    :forums="getForumsCategory(category)"
    :title="category.name"
    :category-id="category.id"
  />
</template>

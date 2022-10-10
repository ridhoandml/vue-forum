<script setup lang="ts">
import type { Category } from "@/assets/types";
import ForumList from "./ForumList.vue";
import dataSources from "@/data/data.json";
import { ref } from "vue";
import type { Forum } from "@/assets/types";

const forums = ref<Forum[]>(dataSources.forums);

const props = defineProps<{
  categories: Category[];
}>();

const getForumsCategory = (category: Category) =>
  forums.value.filter((f) => f.categoryId === category.id);
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

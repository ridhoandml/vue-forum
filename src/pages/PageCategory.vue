<script setup lang="ts">
import dataSources from "@/data/data.json";
import { computed, ref } from "vue";
import type { Category, Forum } from "@/assets/types";
import ForumList from "../components/ForumList.vue";

const props = defineProps<{
  id: string;
}>();

const categories = ref<Category[]>(dataSources.categories);
const forums = ref<Forum[]>(dataSources.forums);

const category = computed(() =>
  categories.value.find((c) => c.id === props.id)
);

const getForumsCategory = (category: Category | undefined) =>
  forums.value.filter((f) => f.categoryId === category?.id);
</script>

<template>
  <ForumList
    :title="category?.name"
    :category-id="category?.id"
    :forums="getForumsCategory(category)"
  />
</template>

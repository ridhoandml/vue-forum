<script setup lang="ts">
import { computed } from "vue";
import type { Category } from "@/assets/types";
import ForumList from "../components/ForumList.vue";
import { useDataSources } from "@/composables/useDataSources";

const props = defineProps<{
  id: string;
}>();

const { forums, categories } = useDataSources();

const category = computed(() => categories.find((c) => c.id === props.id));

const getForumsCategory = (category: Category | undefined) =>
  forums.filter((f) => f.categoryId === category?.id);
</script>

<template>
  <ForumList
    :title="category?.name"
    :category-id="category?.id"
    :forums="getForumsCategory(category)"
  />
</template>

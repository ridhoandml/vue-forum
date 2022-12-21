<script setup lang="ts">
import { computed } from "vue";
import ForumList from "../components/ForumList.vue";
import { findById } from "@/helper";
import { useFetchCategories, useFetchForums } from "@/composables";
import type { Category } from "@/types";

const props = defineProps<{
  id: string;
}>();

const { forums } = useFetchForums();
const { isError, isLoading, isReady, categories, errorMessage } =
  useFetchCategories();

const category = computed(() =>
  findById({ resources: categories.value, id: props.id })
);

const getForumsCategory = (category: Category) =>
  forums.value.filter((f) => f.categoryId === category.id);
</script>

<template>
  <p class="text-center" v-if="isLoading">Loading</p>
  <ForumList
    v-else-if="isReady"
    :title="category.name"
    :category-id="category.id"
    :forums="getForumsCategory(category)"
  />
  <p v-else-if="isError">{{ errorMessage }}</p>
  <RouterLink
    :to="{
      name: 'ForumCreate',
    }"
    class="btn-green btn-small"
    >New Forum</RouterLink
  >
</template>

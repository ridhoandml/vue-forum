<script setup lang="ts">
import { ref } from "vue";

const title = ref<string>("");
const content = ref<string>("");

const emit = defineEmits<{
  (
    event: "@save",
    { title, content }: { title: string; content: string }
  ): void;
  (event: "@cancel"): void;
}>();
</script>

<template>
  <form @submit.prevent="emit('@save', { title, content })">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>
    <div class="form-group">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="content"
        class="form-input"
      ></textarea>
    </div>
    <div class="btn-group">
      <button @click="emit('@cancel')" class="btn btn-ghost">Cancel</button>
      <button
        :disabled="!title"
        class="btn btn-blue"
        type="submit"
        name="Publish"
      >
        Publish
      </button>
    </div>
  </form>
</template>

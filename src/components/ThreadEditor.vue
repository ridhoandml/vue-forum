<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    content: string;
  }>(),
  {
    title: "",
    content: "",
  }
);

const title = ref<string>(props.title);
const content = ref<string>(props.content);

const existing = computed(() => {
  if (props.title != "") {
    return false;
  } else {
    return true;
  }
});

const emit = defineEmits<{
  (e: "@save", { title, content }: { title: string; content: string }): void;
  (e: "@cancel"): void;
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
      <label for="thread_content">Content:</label>
      <textarea
        v-model="content"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>
    <div class="btn-group">
      <button @click.prevent="emit('@cancel')" class="btn btn-ghost">
        Cancel
      </button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ existing ? "Publish" : "Update" }}
      </button>
    </div>
  </form>
</template>

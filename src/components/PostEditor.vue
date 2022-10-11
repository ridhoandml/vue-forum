<script setup lang="ts">
import { ref } from "vue";

const textarea = ref("");

const emit = defineEmits<{
  (e: "@get-value", post: any): void;
}>();

const save = () => {
  emit("@get-value", textarea.value);

  textarea.value = "";
};
</script>

<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="textarea"
          class="form-input"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit Post</button>
      </div>
    </form>
  </div>
</template>

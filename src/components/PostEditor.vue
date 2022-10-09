<script setup lang="ts">
import { ref } from "vue";

const textarea = ref("");

const emit = defineEmits<{
  (e: "save", post: any): void;
}>();

const save = () => {
  const postId = `qqqq` + Math.random();
  const post: any = {
    edited: null,
    id: postId,
    text: textarea.value,
    publishedAt: Math.floor(Date.now() / 1000),
    userId: `38St7Q8Zi2N1SPa5ahzssq9kbyp1`,
  };

  emit("save", post);

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

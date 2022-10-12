<script setup lang="ts">
import { useStore } from "@/stores";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  forumId: string;
}>();

const title = ref<string>("");
const content = ref<string>("");

const { createThread, forums } = useStore();
const router = useRouter();

const forum = computed(() => forums.find((f) => f.id === props.forumId));

const save = async () => {
  const thread = await createThread({
    title: title.value,
    content: content.value,
    id: props.forumId,
  });
  console.log(thread);
  router.push({ name: "ThreadView", params: { id: thread!.id } });
};

const cancel = () => {
  router.push({ name: "Forum", params: { id: forum.value!.id } });
};
</script>

<template>
  <div class="container">
    <div class="col-full push-top">
      <h1>
        Create new thread in <i>{{ forum?.name }}</i>
      </h1>
      <form @submit.prevent="save">
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
          <button @click="cancel" class="btn btn-ghost">Cancel</button>
          <button class="btn btn-blue" type="submit" name="Publish">
            Publish
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { computed } from "vue";
import { useRouter } from "vue-router";
import ThreadEditor from "../components/ThreadEditor.vue";

const props = defineProps<{
  forumId: string;
}>();

const { createThread, forums } = useStore();
const router = useRouter();

const forum = computed(() => forums.find((f) => f.id === props.forumId));

const save = async ({ title, content }: { title: string; content: string }) => {
  const thread = await createThread({
    title,
    content,
    id: props.forumId,
  });
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
      <ThreadEditor @@save="save" @@cancel="cancel" />
    </div>
  </div>
</template>

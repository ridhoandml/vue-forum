<script setup lang="ts">
import { useStore } from "@/stores";
import { computed } from "vue";
import { useRouter } from "vue-router";
import ThreadEditor from "../components/ThreadEditor.vue";

const props = defineProps<{
  id: string;
}>();

const { updateThread, threads, posts } = useStore();
const router = useRouter();

const thread = computed(() => threads.find((t) => t.id === props.id));
const content = computed(
  () => posts.find((p) => p.id === thread.value?.posts[0])?.text
);

const save = async ({ title, content }: { title: string; content: string }) => {
  const updatedThread = await updateThread({
    title,
    content,
    id: props.id,
  });
  console.log(updatedThread);
  router.push({ name: "ThreadView", params: { id: updatedThread?.id } });
};

const cancel = () => {
  router.push({ name: "ThreadView", params: { id: thread.value?.id } });
};
</script>

<template>
  <div class="container">
    <div class="col-full push-top">
      <h1>
        Editing <i>{{ thread?.title }}</i>
      </h1>
      <ThreadEditor
        :title="thread?.title"
        :content="content"
        @@save="save"
        @@cancel="cancel"
      />
    </div>
  </div>
</template>

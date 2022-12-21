<script setup lang="ts">
import type { Forum } from "@/types";
import { collection, addDoc } from "firebase/firestore";
import { database } from "@/firebase";
import { useRouter } from "vue-router";
import ForumEditor from "../components/ForumEditor.vue";
import { SendDataError } from "@/helper";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();

const save = async ({ title, content }: { title: string; content: string }) => {
  const forum = {
    categoryId: props.id,
    description: content,
    name: title,
    slug: title.replace(/\W+/g, "-"),
  } as unknown as Forum;

  try {
    const success = await addDoc(collection(database, "forums"), forum);
    if (success.id === undefined || success.id === null)
      throw new SendDataError("Error send database categories");
    router.push({ name: "Category" });
  } catch (error) {
    console.error(error);
  }
};

const cancel = () => {
  router.push({ name: "Category" });
};
</script>
<template>
  <div class="col-full push-top">
    <h1>Create new forum</h1>
    <ForumEditor @@save="save" @@cancel="cancel" />
  </div>
</template>

<script setup lang="ts">
import CategoryEditor from "../components/CategoryEditor.vue";
import type { Category } from "@/types";
import { collection, addDoc } from "firebase/firestore";
import { database } from "@/firebase";
import { useRouter } from "vue-router";
import { SendDataError } from "@/helper";

const router = useRouter();

const save = async ({ title }: { title: string }) => {
  const category = {
    forums: [],
    name: title,
    slug: title.replace(/\W+/g, "-"),
  } as unknown as Category;

  try {
    const success = await addDoc(collection(database, "categories"), category);
    if (success.id === undefined || success.id === null)
      throw new SendDataError("Error send database categories");
    router.push({ name: "Home" });
  } catch (error) {
    console.error(error);
  }
};

const cancel = () => {
  router.push({ name: "Home" });
};
</script>
<template>
  <div class="col-full push-top">
    <h1>Create new category</h1>
    <CategoryEditor @@save="save" @@cancel="cancel" />
  </div>
</template>

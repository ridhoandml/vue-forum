<script setup lang="ts">
import { useFetchForums } from "@/composables";
import { database } from "@/firebase";
import { findById, SendDataError } from "@/helper";
import { useStore } from "@/stores";
import type { Thread } from "@/types";
import { addDoc, collection } from "@firebase/firestore";
import { useRouter } from "vue-router";
import ThreadEditor from "../components/ThreadEditor.vue";

const props = defineProps<{
  forumId: string;
}>();

const router = useRouter();

const { forums } = useFetchForums();

// const createThread = async ({
//   title,
//   content,
//   forumId,
// }: {
//   title: string;
//   content: string;
//   forumId: string;
// }) => {
//   const forum = findById({ resources: forums.value, id: forumId });
//   const newThread = threadData({ title, forumId: forum.id });

//   if (content != "".trim()) {
//     const newPost = postData({ text: content, id: newThread.id });
//     posts.value.push(newPost);
//     newThread.posts.push(newPost.id);
//     newThread.contributors?.push(newPost.userId);
//     threads.value.push(newThread);
//     forum.threads?.push(newThread.id);
//   } else {
//     threads.value.push(newThread);
//     forum.threads?.push(newThread.id);
//   }
//   return findById({ resources: threads.value, id: newThread.id });
// };

const save = async ({ title, content }: { title: string; content: string }) => {
  const forum = findById({ resources: forums.value, id: props.forumId });
  const newThread = threadData({ title, forumId: forum.id });

  const thread = {
    firstPostId: "",
    forumId: forum.id,
    lastPostAt: 0,
    lastPostId: "",
    posts: [],
    publishedAt: 0,
    slug: title.replace(/\W+/g, "-"),
    title: title,
    userId: "",
  } as unknown as Thread;

  try {
    const success = await addDoc(collection(database, "threads"), thread);
    if (success.id === undefined || success.id === null)
      throw new SendDataError("Error send database threads");
    router.push({ name: "Forum" });
  } catch (error) {
    console.error(error);
  }
};

const cancel = () => {
  router.push({ name: "Forum", params: { id: forum.value.id } });
};

// const { createThread, forums } = useStore();
// const router = useRouter();

// const forum = computed(() =>
//   findById({ resources: forums, id: props.forumId })
// );

// const save = async ({ title, content }: { title: string; content: string }) => {
//   const thread = await createThread({
//     title,
//     content,
//     forumId: props.forumId,
//   });
//   router.push({ name: "ThreadView", params: { id: thread.id } });
// };

// const cancel = () => {
//   router.push({ name: "Forum", params: { id: forum.value.id } });
// };
</script>

<template>
  <div class="container">
    <div class="col-full push-top">
      <h1>
        Create new thread in <i>{{ forum?.name }}</i>
      </h1>
      <ThreadEditor title="" content="" @@save="save" @@cancel="cancel" />
    </div>
  </div>
</template>

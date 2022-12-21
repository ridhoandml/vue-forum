import { database } from "@/firebase";
import { FetchDataError } from "@/helper/Error";
import type { Thread } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { ref } from "vue";

export const useFetchThreads = () => {
  const threads = ref<Thread[]>([]);
  const isLoading = ref(true);
  const isReady = ref(false);
  const isError = ref(false);
  const errorMessage = ref("");

  try {
    const queryThreads = collection(database, "Threads");
    onSnapshot(queryThreads, (querySnapshot) => {
      const resThreads: Thread[] = [];
      querySnapshot.forEach((doc) => {
        const thread: Thread = {
          firstPostId: "",
          forumId: "",
          lastPostAt: 0,
          lastPostId: "",
          posts: [],
          publishedAt: 0,
          slug: "",
          title: "",
          userId: "",
          id: "",
        };
        resThreads.push(thread);
      });
      threads.value = resThreads;
      if (threads.value.length == 0)
        throw new FetchDataError("Failed fetching threads");
      isLoading.value = false;
      isReady.value = true;
    });
  } catch (error) {
    isLoading.value = false;
    isError.value = true;
    errorMessage.value = error as string;
    console.error(error);
  }

  return { isLoading, isError, isReady, threads, errorMessage };
};

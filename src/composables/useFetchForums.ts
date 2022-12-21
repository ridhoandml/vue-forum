import { database } from "@/firebase";
import { FetchDataError } from "@/helper/Error";
import type { Forum } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { ref } from "vue";

export const useFetchForums = () => {
  const forums = ref<Forum[]>([]);
  const isLoading = ref(true);
  const isReady = ref(false);
  const isError = ref(false);
  const errorMessage = ref("");

  try {
    const queryForums = collection(database, "forums");
    onSnapshot(queryForums, (querySnapshot) => {
      const resForums: Forum[] = [];
      querySnapshot.forEach((doc) => {
        const forum: Forum = {
          categoryId: doc.data().categoryId,
          description: doc.data().description,
          name: doc.data().name,
          slug: doc.data().slug,
          id: doc.id,
        };
        resForums.push(forum);
      });
      forums.value = resForums;
      if (forums.value.length == 0)
        throw new FetchDataError("Failed fetching forums");
      isLoading.value = false;
      isReady.value = true;
    });
  } catch (error) {
    isLoading.value = false;
    isError.value = true;
    errorMessage.value = error as string;
    console.error(error);
  }

  return { isLoading, isError, isReady, forums, errorMessage };
};

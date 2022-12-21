import { database } from "@/firebase";
import { FetchDataError } from "@/helper/Error";
import type { Category } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { ref } from "vue";

export const useFetchCategories = () => {
  const categories = ref<Category[]>([]);
  const isLoading = ref(true);
  const isReady = ref(false);
  const isError = ref(false);
  const errorMessage = ref("");

  try {
    const queryCategories = collection(database, "categories");
    onSnapshot(queryCategories, (querySnapshot) => {
      const resCategories: Category[] = [];
      querySnapshot.forEach((doc) => {
        const category: Category = {
          forums: doc.data().forums,
          name: doc.data().name,
          slug: doc.data().slug,
          id: doc.id,
        };
        resCategories.push(category);
      });
      categories.value = resCategories;
      if (categories.value.length == 0)
        throw new FetchDataError("Failed fetching categories");
      isLoading.value = false;
      isReady.value = true;
    });
  } catch (error) {
    isLoading.value = false;
    isError.value = true;
    errorMessage.value = error as string;
    console.error(error);
  }

  return { isLoading, isError, isReady, categories, errorMessage };
};

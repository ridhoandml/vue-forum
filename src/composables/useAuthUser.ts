import { database } from "@/firebase";
import { FetchDataError } from "@/helper";
import type { User } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { ref } from "vue";

export const useAuthUser = async (id: string) => {
  const isLoading = ref(true);
  const isReady = ref(false);
  const isError = ref(false);

  try {
    const docRef = doc(database, "users", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new FetchDataError("User not found");

    const user = ref<User>({
      avatar: docSnap.data().avatar,
      email: docSnap.data().email,
      lastVisitAt: docSnap.data().lastVisitAt,
      name: docSnap.data().name,
      isModerator: undefined,
      registeredAt: docSnap.data().registeredAt,
      username: docSnap.data().username,
      usernameLower: docSnap.data().usernameLower,
      id: docSnap.id,
      bio: undefined,
      postsCount: undefined,
      threads: [],
      twitter: undefined,
      website: undefined,
    });
    isLoading.value = false;
    isReady.value = true;

    return { isLoading, isError, isReady, user };
  } catch (error) {
    isLoading.value = false;
    isError.value = true;
    console.error(error);
  }
};

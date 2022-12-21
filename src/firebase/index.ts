import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

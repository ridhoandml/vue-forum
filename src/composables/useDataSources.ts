import type { Category, Forum, Post, Thread, User } from "@/assets/types";
import json from "@/datas/data.json";

export const useDataSources = () => {
  const forums: Forum[] = json.forums;
  const categories: Category[] = json.categories;
  const threads: Thread[] = json.threads;
  const users: User[] = json.users;
  const posts: Post[] = json.posts;

  return { forums, categories, threads, users, posts };
};

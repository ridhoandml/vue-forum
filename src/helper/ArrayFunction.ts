import type { Category, Forum, Post, Thread, User } from "@/types";

export const findById = <A extends Forum | Post | Thread | User | Category>({
  resources,
  id,
}: {
  resources: A[];
  id: string;
}) => resources.find((r) => r.id === id) as A;

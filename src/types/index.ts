export interface DataForum {
  categories: Category[];
  forums: Forum[];
  posts: Post[];
  stats: Stats;
  threads: Thread[];
  users: User[];
}

export interface Category {
  forums: string[];
  name: string;
  slug: string;
  id: string;
}

export interface Forum {
  categoryId: string;
  description: string;
  lastPostId?: string;
  name: string;
  slug: string;
  threads?: string[];
  id: string;
}

export interface Post {
  edited: Edited | null;
  publishedAt: number;
  text: string;
  threadId: string;
  userId: string;
  id: string;
}

export interface Edited {
  at: number;
  by: string;
  moderated: boolean;
}

export interface Stats {
  postsCount: number;
  threadsCount: number;
  usersCount: number;
  usersOnline: number;
}

export interface Thread {
  contributors?: string[];
  firstPostId: string;
  forumId: string;
  lastPostAt: number;
  lastPostId: string;
  posts: string[];
  publishedAt: number;
  slug: string;
  title: string;
  userId: string;
  id: string;
}

export interface User {
  avatar: string;
  email: string;
  lastVisitAt: number;
  name: string;
  isModerator?: boolean;
  registeredAt: number;
  username: string;
  usernameLower: string;
  id: string;
  bio?: string;
  postsCount?: number;
  threads?: string[];
  twitter?: string;
  website?: string;
}

export interface AuthUser {
  authId: string;
}

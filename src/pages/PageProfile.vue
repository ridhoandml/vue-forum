<script setup lang="ts">
import { useStore } from "@/stores";
import { computed } from "vue";
import PostList from "../components/PostList.vue";
import ThreadList from "../components/ThreadList.vue";

const { posts, threads, getAuthUser } = useStore();

const getPosts = computed(() =>
  posts.filter((p) => p.userId === getAuthUser!.id)
);

const getThreads = computed(() =>
  threads.filter((t) => t.userId === getAuthUser!.id)
);
</script>
<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <div class="profile-card">
          <p class="text-center">
            <img
              :src="getAuthUser?.avatar"
              :alt="`${getAuthUser?.name} profile picture`"
              class="avatar-xlarge"
            />
          </p>
          <h1 class="title">{{ getAuthUser?.username }}</h1>
          <p class="text-lead">{{ getAuthUser?.name }}</p>
          <p class="text-justify">
            {{ getAuthUser?.bio ?? "No bio specified" }}
          </p>
          <span class="online">{{ getAuthUser?.username }} is online</span>
          <div class="stats">
            <span>{{ getPosts.length }} posts</span>
            <span>{{ getThreads.length }} threads</span>
          </div>
          <hr />
          <p v-if="getAuthUser?.website" class="text-large text-center">
            <i class="fa fa-globe"></i>
            <a :href="getAuthUser.website">{{ getAuthUser.website }}</a>
          </p>
        </div>
        <p class="text-xsmall text-faded text-center">
          Member since june 2003, last visited 4 hours ago
        </p>
        <div class="text-center">
          <hr />
          <a href="edit-profile.html" class="btn-green btn-small"
            >Edit Profile</a
          >
        </div>
      </div>
      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> Joker's recent activity </span>
          <a href="#">See only started threads?</a>
        </div>
        <hr />
        <PostList :posts="getPosts" />
        <hr />
        <ThreadList :threads="getThreads" />
      </div>
    </div>
  </div>

  <div class="forum-stats desktop-only">
    <hr />
    <ul>
      <li><i class="fa fa-user-circle-o"></i>47 users online</li>
      <li><i class="fa fa-user-o"></i>497 users registered</li>
      <li><i class="fa fa-comments-o"></i>49 threads</li>
      <li><i class="fa fa-comment-o"></i>763 posts</li>
    </ul>
  </div>
</template>

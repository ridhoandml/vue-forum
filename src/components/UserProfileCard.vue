<script setup lang="ts">
import type { Post, Thread, User } from "@/types";

const props = defineProps<{
  user: User;
  posts: Post[];
  threads: Thread[];
}>();
</script>

<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img
          :src="props.user.avatar"
          :alt="`${props.user.name} profile picture`"
          class="avatar-xlarge"
        />
      </p>
      <h1 class="title">{{ props.user.username }}</h1>
      <p class="text-lead">{{ props.user.name }}</p>
      <p class="text-justify">
        {{ props.user.bio ?? "No bio specified" }}
      </p>
      <span class="online">{{ props.user.username }} is online</span>
      <div class="stats">
        <span>{{ props.posts.length }} posts</span>
        <span>{{ props.threads.length }} threads</span>
      </div>
      <hr />
      <p v-if="props.user.website" class="text-large text-center">
        <i class="fa fa-globe"></i>
        <a :href="props.user.website">{{ props.user.website }}</a>
      </p>
    </div>
    <p class="text-xsmall text-faded text-center">
      Member since june 2003, last visited 4 hours ago
    </p>
    <div class="text-center">
      <hr />
      <RouterLink :to="{ name: 'ProfileEdit' }" class="btn-green btn-small"
        >Edit Profile</RouterLink
      >
    </div>
  </div>
</template>

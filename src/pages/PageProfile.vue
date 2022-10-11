<script setup lang="ts">
import { useStore } from "@/stores";
import PostList from "../components/PostList.vue";
import ThreadList from "../components/ThreadList.vue";
import UserProfileCard from "../components/UserProfileCard.vue";
import UserProfileCardEditor from "../components/UserProfileCardEditor.vue";

const { getAuthUser, getPosts, getThreads } = useStore();

const props = withDefaults(
  defineProps<{
    edit?: boolean;
  }>(),
  {
    edit: false,
  }
);
</script>
<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard
          v-if="!props.edit"
          :user="getAuthUser!"
          :posts="getPosts"
          :threads="getThreads"
        />
        <UserProfileCardEditor
          v-else
          :user="getAuthUser!"
          :posts="getPosts"
          :threads="getThreads"
        />
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

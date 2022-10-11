<script setup lang="ts">
import { useStore } from "@/stores";
import type { Post, Thread, User } from "@/types";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  user: User;
  posts: Post[];
  threads: Thread[];
}>();

const { updateUser } = useStore();
const router = useRouter();

const activeUser = ref(props.user);

const save = () => {
  updateUser({ user: { ...activeUser.value }, userId: props.user.id });
  router.push({ name: "Profile" });
};

const cancel = () => router.push({ name: "Profile" });
</script>
<template>
  <div class="profile-card">
    <form @submit.prevent="save">
      <p class="card-center">
        <img
          :src="props.user.avatar"
          :alt="`${props.user.name} profile picture`"
          class="avatar-xlarge img-update"
        />
      </p>
      <div class="form-group">
        <input
          type="text"
          v-model="activeUser.username"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>
      <div class="form-group">
        <input
          v-model="activeUser.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="userBio">Bio</label>
        <textarea
          v-model="activeUser.bio"
          type="text"
          placeholder="Write few word about yourself"
          id="userBio"
          class="form-input text-lead"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="userWebsite">Website</label>
        <input
          v-model="activeUser.website"
          autocomplete="off"
          type="text"
          placeholder="Write few word about yourself"
          id="userWebsite"
          class="form-input text-lead"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="userEmail">Email</label>
        <input
          v-model="activeUser.email"
          type="email"
          placeholder="Email"
          id="userEmail"
          class="form-input text-lead"
        />
      </div>
      <div class="btn-group space-between">
        <button class="btn-ghost" @click="cancel">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>

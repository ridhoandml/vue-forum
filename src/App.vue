<script setup lang="ts">
import TheNavbar from "./components/TheNavbar.vue";
</script>

<template>
  <TheNavbar />
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/assets/css/style.css";
</style>

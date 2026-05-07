<script setup lang="ts">
import AppHeader from "./components/common/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <div class="layout">
    <router-view />
  </div>
</template>
<style>
.layout {
  padding-top: 2.5rem;
}
</style>

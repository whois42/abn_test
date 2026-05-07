<script setup lang="ts">
import type { Show } from "../../modules/types/show.types";
import ShowCard from "./ShowCard.vue";

defineProps<{
  title: string;
  shows: Show[];
}>();
</script>

<template>
  <section v-if="shows.length" class="shows_row">
    <h2 class="shows_row__title">
      {{ title }}
    </h2>
    <div class="shows_row__list">
      <ShowCard v-for="show in shows" :key="show.id" :show="show" />
    </div>
  </section>
</template>

<style scoped>
.shows_row {
  margin-bottom: 1.5rem;
}

.shows_row__title {
  margin-bottom: 0.75rem;
}

.shows_row__list {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.shows_row__list::-webkit-scrollbar {
  display: none;
}

.shows_row__list {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

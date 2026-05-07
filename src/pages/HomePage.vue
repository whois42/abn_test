<script setup lang="ts">
import { computed } from "vue";

import { useShows } from "../modules/composables/shows";
import { groupAndSortShows } from "../utils/shows";

import ShowsRow from "../components/show/ShowsRow.vue";

const { data, isPending, isError, error } = useShows();

const groupedShows = computed(() => {
  const shows = data.value?.pages.flat() ?? [];
  return groupAndSortShows(shows ?? []);
});

const emptyStateText = computed(() => {
  if (isPending.value) return "Loading...";
  if (isError.value) return error.value?.message ?? "Failed to load shows";
  return "";
});
</script>

<template>
  <div class="home_page">
    <section class="home_page__intro">
      <h1>Browse TV Shows</h1>

      <p>Discover top rated shows across genres.</p>
    </section>
    <div v-if="isPending || isError" class="home_page__state">
      {{ emptyStateText }}
    </div>
    <section v-if="groupedShows" class="home_page__rows">
      <div
        v-for="[genre, genreShows] in groupedShows"
        :key="genre"
        class="home_page__row"
      >
        <ShowsRow :title="genre" :shows="genreShows" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.home_page {
  min-height: 100%;
}

.home_page__intro {
  padding: 2.5rem 3rem 1.5rem;
}

.home_page__intro h1 {
  margin: 0 0 0.75rem;
  font-size: 3rem;
  line-height: 1.1;
}

.home_page__intro p {
  margin: 0;
  opacity: 0.7;
}

.home_page__state {
  padding: 2rem;
  text-align: center;
}

.home_page__rows {
  padding: 0 3rem 3rem;
}

.home_page__row {
  margin-bottom: 2.5rem;
}

@media (max-width: 768px) {
  .home_page__intro {
    padding: 1.5rem 1rem 1.25rem;
  }

  .home_page__intro h1 {
    font-size: 2rem;
  }
  .home_page__rows {
    padding: 0 1rem 2rem;
  }
  .home_page__row {
    margin-bottom: 2rem;
  }
}
</style>

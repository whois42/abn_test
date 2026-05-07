<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { searchShows } from "../modules/api/shows";
import type { Show } from "../modules/types/show.types";

import ShowCard from "../components/show/ShowCard.vue";

const DEBOUNCE_TIME = 800;

const query = ref("");
const results = ref<Show[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const emptyStateText = computed(() => {
  if (loading.value) {
    return "Searching...";
  } else if (error.value) {
    return error.value;
  } else if (query.value && !results.value.length) {
    return "No results found";
  }
  return "";
});

let timeout: number | null = null;

watch(query, (newQuery) => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(async () => {
    if (!newQuery.trim()) {
      results.value = [];
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      results.value = await searchShows(newQuery);
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }, DEBOUNCE_TIME);
});
</script>

<template>
  <div class="search_page">
    <div class="search_page__input_wrapper">
      <input
        v-model="query"
        placeholder="Search TV shows..."
        class="search_page__input"
      />
    </div>

    <div v-if="query && results.length" class="search_page__results">
      <ShowCard v-for="show in results" :key="show.id" :show="show" />
    </div>

    <div v-else class="search_page__state">
      {{ emptyStateText }}
    </div>
  </div>
</template>

<style scoped>
.search_page {
  min-height: 100%;
  padding: 2rem 2.5rem;
}

.search_page__hero {
  margin-bottom: 40px;
}

.search_page__title {
  font-size: 56px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
}

.search_page__input_wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search_page__input {
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  border-radius: 12px;
  border: 1px solid #2a2d36;
  background: #181b22;
  color: white;
  font-size: 16px;
  outline: none;
}

.search_page__state {
  text-align: center;
  opacity: 0.7;
  margin-bottom: 32px;
}

.search_page__results {
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(11.25rem, 1fr));

  gap: 24px;
}

@media (max-width: 768px) {
  .search_page {
    padding: 1.5rem 1rem;
  }

  .search_page__title {
    font-size: 2rem;
  }

  .search_page__input_wrapper {
    max-width: 240px;
  }

  .search_page__results {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1rem;
  }
}
</style>

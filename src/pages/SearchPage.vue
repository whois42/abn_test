<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from "vue";
import { useSearchShows } from "../modules/composables/shows";
import ShowCard from "../components/show/ShowCard.vue";

const DEBOUNCE_TIME = 500;
let timeout: ReturnType<typeof setTimeout> | undefined;
const query = ref("");

const debouncedQuery = ref("");

const { data, isError, isPending, isFetching, error } =
  useSearchShows(debouncedQuery);

const emptyStateText = computed(() => {
  if (!query.value) return "";
  if (isPending.value || isFetching.value) return "Searching...";
  if (isError.value) return error.value?.message ?? "Something went wrong";
  if (data.value?.length === 0) return "No results found";
  return "";
});

watch(query, (newValue) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    debouncedQuery.value = newValue;
  }, DEBOUNCE_TIME);
});

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

<template>
  <div class="search_page">
    <div class="search_page__input_wrapper">
      <input
        v-model="query"
        type="search"
        placeholder="Search TV shows..."
        autocomplete="off"
        aria-label="Search TV shows"
        class="search_page__input"
      />
    </div>

    <div v-if="query && data && data.length" class="search_page__results">
      <ShowCard v-for="show in data" :key="show.id" :show="show" />
    </div>

    <div v-else-if="emptyStateText" class="search_page__state">
      {{ emptyStateText }}
    </div>
  </div>
</template>

<style scoped>
.search_page {
  min-height: 100%;
  padding: 2rem 2.5rem;
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

  .search_page__input_wrapper {
    max-width: 240px;
  }

  .search_page__results {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1rem;
  }
}
</style>

import { ref } from "vue";
import { fetchShows } from "../api/shows";
import type { Show } from "../types/show.types";

export function useShows() {
  const shows = ref<Show[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAllShows() {
    loading.value = true;
    error.value = null;

    try {
      const results = await fetchShows();
      shows.value = results;
    } catch (err: unknown) {
      error.value = (err as Error).message || "Failed to fetch shows";
    } finally {
      loading.value = false;
    }
  }

  return {
    shows,
    loading,
    error,
    fetchAllShows,
  };
}

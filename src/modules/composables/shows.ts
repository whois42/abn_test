import { useQuery } from "@tanstack/vue-query";
import { fetchShowById, fetchShows, searchShows } from "../api/shows";
import { computed, type Ref } from "vue";

export function useShows() {
  return useQuery({
    queryKey: ["shows"],
    queryFn: () => fetchShows(),
  });
}

export function useShow(id: number) {
  return useQuery({
    queryKey: ["show", id],
    queryFn: () => fetchShowById(id),
  });
}

export function useSearchShows(query: Ref<string>) {
  return useQuery({
    queryKey: ["searchShows", query.value],
    queryFn: () => searchShows(query.value),
    enabled: computed(() => query.value.trim().length > 0),
  });
}

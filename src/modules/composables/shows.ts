import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import { fetchShowById, fetchShows, searchShows } from "../api/shows";
import { computed, type Ref } from "vue";

export function useShows() {
  return useInfiniteQuery({
    queryKey: ["shows"],
    queryFn: ({ pageParam }) => fetchShows(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page came back empty, stop fetching.
      return lastPage.length === 0 ? undefined : allPages.length;
    },
  });
}

export function useShow(id: Ref<number>) {
  return useQuery({
    queryKey: ["show", id],
    queryFn: () => fetchShowById(id.value),
  });
}

export function useSearchShows(query: Ref<string>) {
  return useQuery({
    queryKey: ["searchShows", query],
    queryFn: () => searchShows(query.value),
    enabled: computed(() => query.value.trim().length > 0),
  });
}

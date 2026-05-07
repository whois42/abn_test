import type { TVMazeShow, Show } from "../modules/types/show.types";

export function normalizeShow(show: TVMazeShow): Show {
  return {
    id: show.id,
    title: show.name,
    genres: show.genres || [],
    rating: show.rating?.average ?? null,
    image: show.image?.medium ?? null,
    summary: show.summary ?? null,
    status: show.status ?? null,
    premiered: show.premiered ?? null,
    language: show.language ?? null,
    runtime: show.runtime ?? null,
  };
}

export function groupAndSortShows(shows: Show[]): Record<string, Show[]> {
  const map: Record<string, Show[]> = {};

  for (const show of shows) {
    if (!show.genres || show.genres.length === 0) continue;
    for (const genre of show.genres) {
      if (!map[genre]) {
        map[genre] = [];
      }
      map[genre].push(show);
    }
  }

  for (const genre in map) {
    map[genre] = map[genre].sort((a, b) => {
      const ratingA = a.rating ?? -1;
      const ratingB = b.rating ?? -1;

      return ratingB - ratingA;
    });
  }

  return map;
}

import type { TVMazeShow, Show } from "../modules/types/show.types";
const RATING_FALLBACK = Number.NEGATIVE_INFINITY;

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

export function groupShowsByGenre(shows: Show[]): Map<string, Show[]> {
  const grouped = new Map<string, Show[]>();
  if (!shows) {
    return grouped;
  }
  for (const show of shows) {
    if (show.genres.length === 0) continue;

    for (const genre of show.genres) {
      const bucket = grouped.get(genre);
      if (bucket) {
        bucket.push(show);
      } else {
        grouped.set(genre, [show]);
      }
    }
  }

  return grouped;
}

export function sortShowsByRating(shows: readonly Show[]): Show[] {
  return [...shows].sort((a, b) => {
    const ratingA = a.rating ?? RATING_FALLBACK;
    const ratingB = b.rating ?? RATING_FALLBACK;
    return ratingB - ratingA;
  });
}

export function groupAndSortShows(shows: Show[]): Map<string, Show[]> {
  const grouped = groupShowsByGenre(shows);
  const sorted = new Map<string, Show[]>();
  const genresInOrder = [...grouped.keys()].sort((a, b) => a.localeCompare(b));

  for (const genre of genresInOrder) {
    sorted.set(genre, sortShowsByRating(grouped.get(genre)!));
  }

  return sorted;
}

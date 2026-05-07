import { get } from "../../services/httpService";
import type {
  TVMazeShow,
  TVMazeSearchResponse,
  Show,
} from "../types/show.types";
import { normalizeShow } from "../../utils/shows";

export async function fetchShows(page: number): Promise<Show[]> {
  try {
    const data = await get<TVMazeShow[]>(`/shows?page=${page}`);
    return data.map(normalizeShow);
  } catch (err) {
    // TVMaze returns 404 when the page is past the end. Treat as "no more shows".
    if (err instanceof Error && err.message.includes("404")) {
      return [];
    }
    throw err;
  }
}

export async function fetchShowById(id: number): Promise<Show> {
  const data = await get<TVMazeShow>(`/shows/${id}`);

  return normalizeShow(data);
}

export async function searchShows(query: string): Promise<Show[]> {
  if (!query.trim()) {
    return [];
  }
  const data = await get<TVMazeSearchResponse[]>(
    `/search/shows?q=${encodeURIComponent(query)}`,
  );

  return data.map((item) => normalizeShow(item.show));
}

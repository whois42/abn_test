import { get } from "../../services/httpService";
import type {
  TVMazeShow,
  TVMazeSearchResponse,
  Show,
} from "../types/show.types";
import { normalizeShow } from "../../utils/shows";

export async function fetchShows(): Promise<Show[]> {
  const data = await get<TVMazeShow[]>(`/shows`);

  return data.map(normalizeShow);
}

export async function fetchShowById(id: number): Promise<Show> {
  const data = await get<TVMazeShow>(`/shows/${id}`);

  return normalizeShow(data);
}

export async function searchShows(query: string): Promise<Show[]> {
  if (!query.trim()) return [];

  const data = await get<TVMazeSearchResponse[]>(
    `/search/shows?q=${encodeURIComponent(query)}`,
  );

  return data.map((item) => normalizeShow(item.show));
}

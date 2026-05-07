export interface TVMazeShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string | null;
  officialSite: string | null;
  schedule: { time: string; days: string[] };
  rating: { average: number | null };
  weight: number;
  network: {
    id: number;
    name: string;
    country: { name: string; code: string; timezone: string };
    officialSite: string;
  } | null;
  webChannel: null;
  dvdCountry: null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  image: { medium: string; original: string } | null;
  summary: string | null;
  updated: number;
  _links: Record<string, { href: string; name?: string }>;
}

export interface TVMazeSearchResponse {
  score: number;
  show: TVMazeShow;
}

// Normalized show type
export interface Show {
  id: number;
  title: string;
  genres: string[];
  rating: number | null;
  image: string | null;
  summary: string | null;
  status?: string | null;
  premiered?: string | null;
  language?: string | null;
  runtime?: number | null;
}

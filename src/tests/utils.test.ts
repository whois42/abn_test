import { describe, it, expect } from "vitest";

import {
  normalizeShow,
  groupShowsByGenre,
  sortShowsByRating,
  groupAndSortShows,
} from "../utils/shows";
import type { Show, TVMazeShow } from "../modules/types/show.types";

describe("normalizeShow", () => {
  it("normalizes a fully populated TVMaze show", () => {
    const rawShow = {
      id: 1,
      name: "Breaking Bad",
      genres: ["Drama"],
      rating: { average: 9.5 },
      image: { medium: "image.jpg" },
      summary: "<p>Summary</p>",
      status: "Ended",
      premiered: "2008-01-20",
      language: "English",
      runtime: 60,
    };

    expect(normalizeShow(rawShow as TVMazeShow)).toEqual({
      id: 1,
      title: "Breaking Bad",
      genres: ["Drama"],
      rating: 9.5,
      image: "image.jpg",
      summary: "<p>Summary</p>",
      status: "Ended",
      premiered: "2008-01-20",
      language: "English",
      runtime: 60,
    });
  });

  it("falls back to safe defaults for missing optional fields", () => {
    const rawShow = {
      id: 2,
      name: "Unknown Show",
    };

    expect(normalizeShow(rawShow as TVMazeShow)).toEqual({
      id: 2,
      title: "Unknown Show",
      genres: [],
      rating: null,
      image: null,
      summary: null,
      status: null,
      premiered: null,
      language: null,
      runtime: null,
    });
  });

  it("handles partially populated rating and image objects", () => {
    const rawShow = {
      id: 3,
      name: "Partial",
      rating: { average: null },
      image: {},
    };

    const result = normalizeShow(rawShow as unknown as TVMazeShow);

    expect(result.rating).toBeNull();
    expect(result.image).toBeNull();
  });
});

describe("groupShowsByGenre", () => {
  it("groups shows under each of their genres", () => {
    const shows = [
      { id: 1, title: "A", genres: ["Drama"], rating: 8 },
      { id: 2, title: "B", genres: ["Comedy"], rating: 7 },
      { id: 3, title: "C", genres: ["Drama", "Comedy"], rating: 6 },
    ] as Show[];

    const result = groupShowsByGenre(shows);

    expect(result.get("Drama")).toHaveLength(2);
    expect(result.get("Comedy")).toHaveLength(2);
  });

  it("returns an empty map for empty, undefined, or null input", () => {
    expect(groupShowsByGenre([]).size).toBe(0);
    expect(groupShowsByGenre(undefined as unknown as Show[]).size).toBe(0);
    expect(groupShowsByGenre(null as unknown as Show[]).size).toBe(0);
  });

  it("does not mutate the input array", () => {
    const shows = [
      { id: 1, title: "A", genres: ["Drama"], rating: 5 },
      { id: 2, title: "B", genres: ["Drama"], rating: 9 },
    ] as Show[];
    const snapshot = JSON.stringify(shows);

    groupShowsByGenre(shows);

    expect(JSON.stringify(shows)).toBe(snapshot);
  });
});

describe("sortShowsByRating", () => {
  it("sorts by rating descending", () => {
    const shows = [
      { id: 1, title: "Low", rating: 5 },
      { id: 2, title: "High", rating: 9 },
      { id: 3, title: "Mid", rating: 7 },
    ] as Show[];

    const result = sortShowsByRating(shows);

    expect(result.map((s) => s.title)).toEqual(["High", "Mid", "Low"]);
  });

  it("places null ratings at the end", () => {
    const shows = [
      { id: 1, title: "No Rating", rating: null },
      { id: 2, title: "Rated", rating: 7 },
    ] as Show[];

    const result = sortShowsByRating(shows);

    expect(result[0].title).toBe("Rated");
    expect(result[1].title).toBe("No Rating");
  });

  it("does not mutate the input array", () => {
    const shows = [
      { id: 1, title: "A", rating: 5 },
      { id: 2, title: "B", rating: 9 },
    ] as Show[];
    const originalOrder = shows.map((s) => s.id);

    sortShowsByRating(shows);

    expect(shows.map((s) => s.id)).toEqual(originalOrder);
  });
});

describe("groupAndSortShows", () => {
  it("groups by genre and sorts each bucket by rating descending", () => {
    const shows = [
      { id: 1, title: "Drama Low", genres: ["Drama"], rating: 5 },
      { id: 2, title: "Drama High", genres: ["Drama"], rating: 9 },
      { id: 3, title: "Comedy Mid", genres: ["Comedy"], rating: 7 },
    ] as Show[];

    const result = groupAndSortShows(shows);

    expect(result.get("Drama")?.map((s) => s.title)).toEqual([
      "Drama High",
      "Drama Low",
    ]);
    expect(result.get("Comedy")?.map((s) => s.title)).toEqual(["Comedy Mid"]);
  });

  it("orders genres alphabetically for stable rendering", () => {
    const shows = [
      { id: 1, title: "A", genres: ["Sci-Fi"], rating: 8 },
      { id: 2, title: "B", genres: ["Action"], rating: 7 },
      { id: 3, title: "C", genres: ["Drama"], rating: 6 },
    ] as Show[];

    const result = groupAndSortShows(shows);

    expect([...result.keys()]).toEqual(["Action", "Drama", "Sci-Fi"]);
  });

  it("places a multi-genre show into every matching bucket", () => {
    const shows = [
      { id: 1, title: "Hybrid", genres: ["Drama", "Sci-Fi"], rating: 8 },
    ] as Show[];

    const result = groupAndSortShows(shows);

    expect(result.get("Drama")).toHaveLength(1);
    expect(result.get("Sci-Fi")).toHaveLength(1);
    expect(result.get("Drama")?.[0]).toBe(result.get("Sci-Fi")?.[0]);
  });

  it("returns an empty map when input is empty or undefined", () => {
    expect(groupAndSortShows([]).size).toBe(0);
    expect(groupAndSortShows(undefined as unknown as Show[]).size).toBe(0);
  });
});

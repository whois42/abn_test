import { describe, it, expect } from "vitest";

import { normalizeShow, groupAndSortShows } from "../utils/shows";
import type { Show, TVMazeShow } from "../modules/types/show.types";

describe("normalizeShow", () => {
  it("should normalize TVMaze show correctly", () => {
    const rawShow = {
      id: 1,
      name: "Breaking Bad",
      genres: ["Drama"],
      rating: {
        average: 9.5,
      },
      image: {
        medium: "image.jpg",
      },
      summary: "<p>Summary</p>",
      status: "Ended",
      premiered: "2008-01-20",
      language: "English",
      runtime: 60,
    };

    const result = normalizeShow(rawShow as TVMazeShow);

    expect(result).toEqual({
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

  it("should fallback nullable fields correctly", () => {
    const rawShow = {
      id: 2,
      name: "Unknown Show",
    };

    const result = normalizeShow(rawShow as TVMazeShow);

    expect(result).toEqual({
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
});

describe("groupAndSortShows", () => {
  it("should group shows by genre", () => {
    const shows = [
      {
        id: 1,
        title: "Show A",
        genres: ["Drama"],
        rating: 8,
      },
      {
        id: 2,
        title: "Show B",
        genres: ["Comedy"],
        rating: 7,
      },
    ];

    const result = groupAndSortShows(shows as Show[]);

    expect(result.Drama).toHaveLength(1);
    expect(result.Comedy).toHaveLength(1);
  });

  it("should place show into multiple genres", () => {
    const shows = [
      {
        id: 1,
        title: "Show A",
        genres: ["Drama", "Sci-Fi"],
        rating: 8,
      },
    ];

    const result = groupAndSortShows(shows as Show[]);

    expect(result.Drama).toHaveLength(1);
    expect(result["Sci-Fi"]).toHaveLength(1);
  });

  it("should sort shows by rating descending", () => {
    const shows = [
      {
        id: 1,
        title: "Low Rated",
        genres: ["Drama"],
        rating: 5,
      },
      {
        id: 2,
        title: "High Rated",
        genres: ["Drama"],
        rating: 9,
      },
    ];

    const result = groupAndSortShows(shows as Show[]);

    expect(result.Drama[0].title).toBe("High Rated");
    expect(result.Drama[1].title).toBe("Low Rated");
  });

  it("should skip shows without genres", () => {
    const shows = [
      {
        id: 1,
        title: "No Genre",
        genres: [],
        rating: 8,
      },
    ];

    const result = groupAndSortShows(shows as any);

    expect(result).toEqual({});
  });

  it("should handle null ratings", () => {
    const shows = [
      {
        id: 1,
        title: "No Rating",
        genres: ["Drama"],
        rating: null,
      },
      {
        id: 2,
        title: "Rated",
        genres: ["Drama"],
        rating: 7,
      },
    ];

    const result = groupAndSortShows(shows as any);

    expect(result.Drama[0].title).toBe("Rated");
  });
});

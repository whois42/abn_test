import { describe, it, expect, vi, beforeEach } from "vitest";

import { useShows } from "../modules/composables/useShows";
import * as showsApi from "../modules/api/shows";

vi.mock("../modules/api/shows");

describe("useShows", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch shows successfully", async () => {
    const mockShows = [
      {
        id: 1,
        title: "Breaking Bad",
      },
    ];

    vi.spyOn(showsApi, "fetchShows").mockResolvedValue(mockShows as any);

    const { shows, loading, error, fetchAllShows } = useShows();

    expect(loading.value).toBe(false);
    expect(shows.value).toEqual([]);

    await fetchAllShows();

    expect(showsApi.fetchShows).toHaveBeenCalled();

    expect(shows.value).toEqual(mockShows);

    expect(error.value).toBe(null);
    expect(loading.value).toBe(false);
  });

  it("should handle fetch error", async () => {
    vi.spyOn(showsApi, "fetchShows").mockRejectedValue(new Error("API Error"));

    const { shows, loading, error, fetchAllShows } = useShows();

    await fetchAllShows();

    expect(shows.value).toEqual([]);

    expect(error.value).toBe("API Error");

    expect(loading.value).toBe(false);
  });

  it("should set loading state during request", async () => {
    vi.spyOn(showsApi, "fetchShows").mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 10)) as any,
    );

    const { loading, fetchAllShows } = useShows();

    const promise = fetchAllShows();

    expect(loading.value).toBe(true);

    await promise;

    expect(loading.value).toBe(false);
  });
});

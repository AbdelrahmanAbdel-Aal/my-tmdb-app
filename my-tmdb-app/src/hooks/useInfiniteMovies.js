// src/hooks/useInfiniteMovies.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb";

export function useInfiniteMovies() {
  return useInfiniteQuery({
    queryKey: ["infiniteMovies"],
    queryFn: ({ pageParam = 1 }) =>
      fetchFromApi("/discover/movie", {
          page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      // Use TMDB's pagination info to determine the next page
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
}
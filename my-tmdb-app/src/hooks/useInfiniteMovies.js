import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb";

export function useInfiniteMovies() {
  return useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }) =>
      fetchFromApi("/trending/movie/week", {
        page: pageParam,
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
}

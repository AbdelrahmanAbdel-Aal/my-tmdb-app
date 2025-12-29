import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../api/tmdb";

export function useTrendingMoviesInfinite() {
  return useInfiniteQuery({
    queryKey: ["trending-movies"],
    queryFn: ({ pageParam = 1 }) => fetchTrendingMovies(pageParam), 
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}

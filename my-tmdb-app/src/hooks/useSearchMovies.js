import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/tmdb";

export function useSearchMovies(query) {
  return useQuery({
    queryKey: ["search-movies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });
}

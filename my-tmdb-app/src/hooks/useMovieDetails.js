import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../api/tmdb";

export function useMovieDetails(id) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });
}

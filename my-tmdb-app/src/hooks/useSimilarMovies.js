import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb.js";

export function useSimilarMovies(movieId) {
  return useQuery({
    queryKey: ["similar-movies", movieId],
    queryFn: () =>
      fetchFromApi(`/movie/${movieId}/similar`),
    enabled: !!movieId,
  });
}

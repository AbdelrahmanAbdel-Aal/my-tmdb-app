import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb";

export function useMovieVideos(movieId) {
  return useQuery({
    queryKey: ["movie-videos", movieId],
    queryFn: () =>
      fetchFromApi(`/movie/${movieId}/videos`),
    enabled: !!movieId,
  });
}
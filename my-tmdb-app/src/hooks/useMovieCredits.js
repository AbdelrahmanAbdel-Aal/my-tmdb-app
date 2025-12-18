import { useQuery } from "@tanstack/react-query";
import { fetchMovieCredits } from "../api/tmdb";

export function useMovieCredits(id) {
  return useQuery({
    queryKey: ["movie-credits", id],
    queryFn: () => fetchMovieCredits(id),
  });
}

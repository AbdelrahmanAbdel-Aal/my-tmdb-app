// src/hooks/useActorMovieCredits.js
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb"; // تأكد من أن fetchFromApi موجودة هنا

export function useActorMovieCredits(personId) {
  return useQuery({
    queryKey: ["actor-movie-credits", personId],
    queryFn: () =>
      fetchFromApi(`/person/${personId}/movie_credits`), 
    enabled: !!personId,
  });
}
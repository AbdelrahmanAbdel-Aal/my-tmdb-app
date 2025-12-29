// src/hooks/useTrendingMovies.js

import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../api/tmdb";

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["trendingMoviesCarousel"],
    queryFn: () => fetchTrendingMovies(), 
  });
}
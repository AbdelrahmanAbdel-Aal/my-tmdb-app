import {useQuery} from '@tanstack/react-query'
import { fetchTrendingMovies } from '../api/tmdb'

export function useTrendingMovies() {
  return useQuery({
    queryKey: ['trending-movies'],
    queryFn: fetchTrendingMovies,
  })
}
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { useSimilarMovies } from "../hooks/useSimilarMovies";

export default function SimilarMovies({ movieId }) {
  const { data, isLoading } = useSimilarMovies(movieId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data?.results?.length) return null;

  return (
    <>
      <h2 className="text-xl text-white mt-10 mb-4">
        Similar Movies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

import MovieCard from "./MovieCard";

export default function SimilarMovies({ movies }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Similar Movies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

import MovieCard from "../components/MovieCard";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function Home() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMovies();

  const loadMoreRef = useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetching: isFetchingNextPage,
});


  const movies =
    data?.pages.flatMap(page => page.results) || [];

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl mb-6">
        Trending Movies
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && (
        <p className="text-center text-gray-400 mt-4">
          Loading more...
        </p>
      )}
    </div>
  );
}

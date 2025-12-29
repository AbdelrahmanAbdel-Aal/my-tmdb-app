import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { getFavoritesList } = useFavorites();

  const favoriteMovies = getFavoritesList();

  if (favoriteMovies.length === 0) {
    return (
      <div className="p-6 text-white text-center mt-20">
        <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
        <p className="text-gray-400">
          You haven't added any movies to your favorites yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b border-blue-500 pb-2">
        Your Favorites ({favoriteMovies.length})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favoriteMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

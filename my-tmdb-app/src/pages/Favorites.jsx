import MovieCard from "../components/MovieCard";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        <h2 className="text-xl mb-2">No favorites yet ❤️</h2>
        <p>Add some movies to your favorites</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl mb-6">
        Your Favorites
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

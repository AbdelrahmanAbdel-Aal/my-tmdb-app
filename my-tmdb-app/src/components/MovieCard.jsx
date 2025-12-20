import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <div className="relative">
      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(movie)}
        className="absolute top-2 right-2 z-10 text-2xl cursor-pointer hover:scale-110 transition"
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      <Link to={`/movie/${movie.id}`}>
        <div className="bg-gray-800 text-white rounded overflow-hidden hover:scale-105 transition">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />

          <div className="p-3">
            <h3 className="text-sm font-semibold">
              {movie.title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

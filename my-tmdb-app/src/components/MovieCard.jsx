
import { memo } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";


function MovieCard({ movie, isTVShow = false }) { 
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);


  const detailPath = isTVShow ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  const title = isTVShow ? movie.name : movie.title;

  return (
    <div className="relative">
      <button
        onClick={() => toggleFavorite(movie)}
        className="absolute top-2 right-2 z-10 text-2xl cursor-pointer hover:scale-110 transition"
      >
        {favorite ? "❤️" : "🤍"}
      </button>


      <Link to={detailPath}> 
        <div className="bg-gray-800 text-white rounded overflow-hidden hover:scale-105 transition">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-poster.png" 
            }
            alt={title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />

          <div className="p-3">
            <h3 className="text-sm font-semibold">
              {title} 
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(MovieCard);
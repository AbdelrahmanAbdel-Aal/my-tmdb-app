// src/components/MovieCard.jsx (التعديل المقترح)
import { memo } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

// إضافة isTVShow كخاصية
function MovieCard({ movie, isTVShow = false }) { 
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  // تحديد مسار التفاصيل (إما /movie/:id أو /tv/:id)
  const detailPath = isTVShow ? `/tv/${movie.id}` : `/movie/${movie.id}`;
  // اسم العنوان يختلف بين الأفلام (title) والمسلسلات (name)
  const title = isTVShow ? movie.name : movie.title;

  return (
    <div className="relative">
      <button
        onClick={() => toggleFavorite(movie)}
        className="absolute top-2 right-2 z-10 text-2xl cursor-pointer hover:scale-110 transition"
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      {/* استخدام المسار الصحيح */}
      <Link to={detailPath}> 
        <div className="bg-gray-800 text-white rounded overflow-hidden hover:scale-105 transition">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-poster.png" // صورة بديلة في حالة عدم وجود بوستر
            }
            alt={title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />

          <div className="p-3">
            {/* استخدام العنوان الصحيح */}
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
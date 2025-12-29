import { useParams, Link, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { useFavorites } from "../hooks/useFavorites";

import CastList from "../components/CastList";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";
import SimilarMovies from "../components/SimilarMovies";
import MovieTrailer from "../components/MovieTrailer";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const { data: movie, isLoading, error } = useMovieDetails(id);
  const { data: credits } = useMovieCredits(id);
  const { data: videos } = useMovieVideos(id);

  const isCurrentlyFavorite = movie ? isFavorite(movie.id) : false;

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (error || !movie) {
    return (
      <p className="text-red-500 p-6">
        Error loading movie or movie not found.
      </p>
    );
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const formatRuntime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  // back button handler
  const handleGoBack = () => {
    navigate(-1); // back to previous page
  };

  return (
    <div className="p-6 text-white">
      {/* back button */}
      <button
        onClick={handleGoBack}
        className="text-blue-400 underline hover:text-blue-300 transition flex items-center mb-6"
      >
        <span className="mr-1">←</span> Back
      </button>

      <div className="flex gap-6 flex-col md:flex-row">
        {/*Poster and favorite button*/}
        <div className="relative w-full md:w-64 flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded shadow-xl"
          />
          <button
            onClick={() => toggleFavorite(movie)}
            className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-75 rounded-full z-10 text-2xl cursor-pointer hover:scale-110 transition"
          >
            {isCurrentlyFavorite ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Movie details*/}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-2">
            {movie.title} ({releaseYear})
          </h1>

          <p className="text-gray-400 italic mb-4">{movie.tagline}</p>

          <div className="flex flex-wrap gap-3 mb-4 text-sm">
            <span className="bg-blue-600 px-3 py-1 rounded-full">
              {movie.vote_average.toFixed(1)} / 10 ⭐
            </span>
            <span className="bg-gray-700 px-3 py-1 rounded-full">
              {formatRuntime(movie.runtime)}
            </span>
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-700 px-3 py-1 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Overview</h3>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <p className="text-sm">
              <span className="font-semibold text-gray-400">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold text-gray-400">Budget:</span> $
              {movie.budget.toLocaleString()}
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold text-gray-400">Revenue:</span> $
              {movie.revenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {credits?.cast?.length > 0 && <CastList cast={credits.cast} />}

      {videos?.results?.length > 0 && <MovieTrailer videos={videos.results} />}

      {id && <SimilarMovies movieId={id} />}
    </div>
  );
}

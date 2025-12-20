import { useParams, Link } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieCredits } from "../hooks/useMovieCredits";
import CastList from "../components/CastList";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";
import { useSimilarMovies } from "../hooks/useSimilarMovies";
import SimilarMovies from "../components/SimilarMovies";
import { useMovieVideos } from "../hooks/useMovieVideos";
import MovieTrailer from "../components/MovieTrailer";

export default function MovieDetails() {
  const { id } = useParams();

  const { data: movie, isLoading, error } = useMovieDetails(id);
  const { data: credits } = useMovieCredits(id);
    const { data: similar  } = useSimilarMovies(id);
    const { data: videos } = useMovieVideos(id);
    
  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (error) {
    return <p className="text-red-500 p-6">Error loading movie</p>;
  }
  
  {similar?.results && (
    
  <SimilarMovies movies={similar.results} />
)}


  return (
    <div className="p-6 text-white">
      <Link to="/" className="text-blue-400 underline">
        ← Back
      </Link>

      <div className="mt-4 flex gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 rounded"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">
            {movie.title}
          </h1>

          <p className="text-gray-300 mb-4">
            {movie.overview}
          </p>

          <p>⭐ Rating: {movie.vote_average}</p>
        </div>
      </div>
      {/* Trailer */}
      {videos?.results && <MovieTrailer videos={videos.results} />}
      {/* Cast */}
      {credits?.cast && <CastList cast={credits.cast} />}
       <SimilarMovies movieId={id} />
    </div>
  );
}

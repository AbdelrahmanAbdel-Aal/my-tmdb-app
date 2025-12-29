import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb";
import { useActorMovieCredits } from "../hooks/useActorMovieCredits";
import MovieCard from "../components/MovieCard";

export default function ActorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: actor, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["actor", id],
    queryFn: () => fetchFromApi(`/person/${id}`),
    enabled: !!id,
  });

  const { data: credits, isLoading: isLoadingCredits } =
    useActorMovieCredits(id);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoadingDetails)
    return <p className="p-6 text-white">Loading actor details...</p>;

  if (!actor) return <p className="p-6 text-red-500">Actor not found.</p>;

  const moviesCast =
    credits?.cast
      ?.filter((movie) => movie.poster_path && movie.media_type === "movie")
      .sort((a, b) => b.vote_count - a.vote_count)
      .slice(0, 20) || [];

  return (
    <div className="p-6 text-white">
      <button
        onClick={handleGoBack}
        className="text-blue-400 underline hover:text-blue-300 transition flex items-center mb-6"
      >
        <span className="mr-1">←</span> Back
      </button>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full md:w-64 flex-shrink-0">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : "/no-avatar.png"
            }
            className="rounded mb-4 w-full shadow-lg"
            loading="lazy"
            alt={actor.name}
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-4">{actor.name}</h1>

          <h3 className="text-xl font-semibold mt-6 mb-2">Biography</h3>
          <p className="text-gray-300 leading-relaxed">
            {actor.biography || "No biography available for this actor."}
          </p>
        </div>
      </div>

      {isLoadingCredits && (
        <p className="mt-10 text-gray-400">Loading filmography...</p>
      )}

      {moviesCast.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
            Known For (Top {moviesCast.length} Movies)
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {moviesCast.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

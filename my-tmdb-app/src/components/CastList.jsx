export default function CastList({ cast }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl mb-4">Cast</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cast.slice(0, 8).map(actor => (
          <div key={actor.id} className="text-center">
            {actor.profile_path ? (
              <img
                className="rounded"
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <div className="h-45 bg-gray-700 rounded" />
            )}

            <p className="mt-2 text-sm">{actor.name}</p>
            <p className="text-xs text-gray-400">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

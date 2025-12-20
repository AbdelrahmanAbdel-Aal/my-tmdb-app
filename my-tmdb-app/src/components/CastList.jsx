import { Link } from "react-router-dom";

export default function CastList({ cast }) {
  return (
    <>
      <h2 className="text-xl text-white mt-10 mb-4">
        Cast
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {cast.slice(0, 12).map(actor => (
          <Link
            key={actor.id}
            to={`/actor/${actor.id}`}
            className="text-center"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : "/no-avatar.png"
              }
              alt={actor.name}
              className="rounded mb-2"
            />
            <p className="text-sm text-white">
              {actor.name}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

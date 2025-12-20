import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb";

export default function ActorDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["actor", id],
    queryFn: () => fetchFromApi(`/person/${id}`),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 text-white">
      <img
        src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
        className="rounded mb-4"
      />
      <h1 className="text-2xl mb-2">{data.name}</h1>
      <p className="text-gray-300">{data.biography}</p>
    </div>
  );
}

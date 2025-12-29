import React from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const fetchPopularPeople = ({ pageParam = 1 }) => {
  return fetchFromApi("/person/popular", { page: pageParam });
};

export default function Actors() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["popular-actors"],
      queryFn: fetchPopularPeople,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
    });

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
  });

  const actors = data?.pages.flatMap((page) => page.results) || [];

  if (isLoading) {
    return <p className="p-6 text-white">Loading popular actors...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl mb-6">Popular Actors</h1>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {actors.map((actor) => (
          <Link
            key={actor.id}
            to={`/actor/${actor.id}`}
            className="text-center hover:scale-105 transition"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : "/no-avatar.png"
              }
              loading="lazy"
              alt={actor.name}
              className="w-full h-36 object-cover rounded-full mb-2"
            />
            <p className="text-sm text-white">{actor.name}</p>
          </Link>
        ))}
      </div>

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && (
        <p className="text-center text-gray-400 mt-4">Loading more actors...</p>
      )}
    </div>
  );
}

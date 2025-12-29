import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchMovies } from "../hooks/useSearchMovies";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const debouncedQuery = useDebounce(query);
  const { data, isLoading } = useSearchMovies(debouncedQuery);

  const handleSearchChange = (value) => {
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // دالة العودة
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleGoBack}
        className="text-blue-400 underline hover:text-blue-300 transition flex items-center mb-6"
      >
        <span className="mr-1">←</span> Back
      </button>

      {/* search bar */}
      <SearchBar value={query} onChange={handleSearchChange} />

      {/* show results */}
      {isLoading && debouncedQuery && (
        <p className="text-white mt-4">Searching for "{debouncedQuery}"...</p>
      )}

      {debouncedQuery && !isLoading && (
        <p className="text-gray-400 mt-4">
          Found {data?.total_results || 0} results for: "{debouncedQuery}"
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* if there's no results */}
      {debouncedQuery && !isLoading && data?.total_results === 0 && (
        <p className="text-white text-center mt-10">
          No results found for "{debouncedQuery}".
        </p>
      )}

      {!debouncedQuery && (
        <p className="text-gray-400 text-center mt-10">
          Start typing to search for movies.
        </p>
      )}
    </div>
  );
}

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchMovies } from "../hooks/useSearchMovies";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const { data, isLoading } = useSearchMovies(debouncedQuery);

  return (
    <div className="p-6">
      <SearchBar value={query} onChange={setQuery} />

      {isLoading && <p className="text-white mt-4">Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {data?.results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

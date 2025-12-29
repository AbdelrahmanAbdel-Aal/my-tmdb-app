// src/pages/Home.jsx
import { useRef } from "react";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { useTrendingMovies } from "../hooks/useTrendingMovies"; // Hook للكاروسيل
import { useInfiniteMovies } from "../hooks/useInfiniteMovies"; // Hook للتمرير اللانهائي
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
// تم إزالة import MovieCarousel لأننا نستخدم MovieCard مباشرة

const SKELETON_COUNT = 18;

export default function Home() {
  const scrollRef = useRef(null); // Reference for the scrolling container

  // trendig movies for the carousel
  const { data: carouselData, isLoading: isLoadingCarousel } = useTrendingMovies();
  const trendingMoviesForCarousel = carouselData?.results || []; 

  console.log("Trending Movies Count:", trendingMoviesForCarousel.length);
  //Get infinite movies for the grid
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // we don't need isLoading here because we have isLoadingCarousel
  } = useInfiniteMovies();

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
  });

  const allMovies = infiniteData?.pages.flatMap((page) => page.results) || [];

  //To avoid duplication between carousel and grid
  const moviesInGrid = allMovies.filter(
    (movie) =>
      !trendingMoviesForCarousel
        .slice(0, 10) // To avoid checking all carousel movies, only the first 10 shown
        .some((tMovie) => tMovie.id === movie.id)
  );

  // Function to handle side scrolling
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  // show skeletons while loading carousel data
  if (isLoadingCarousel && !allMovies.length) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Trending Movies</h2>
        <div className="flex space-x-4 overflow-hidden mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-1/6">
              <MovieCardSkeleton />
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 mt-10">More Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Promotional Image */}
      <div className="mb-12">
        <img
          src="/Promotional_image.png"
          alt="Promotional Image"
          // Making sure the image is responsive
          className="w-lg mb-6 flex mx-auto rounded-lg shadow-lg"
        />
      </div>

      {/* NEW: Horizontal Trending Movies Section (Carousel) */}
      <div className="mb-10 relative group">
        <h2 className="text-2xl font-bold text-white mb-4">Trending Now</h2>
        
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          >
            &#10094; 
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* show first 10 trending movies */}
            {trendingMoviesForCarousel.slice(0, 10).map((movie) => (
              <div key={movie.id} className="min-w-[160px] md:min-w-[200px] flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
            {/*if there are no trending movies, show a message */}
            {!isLoadingCarousel && trendingMoviesForCarousel.length === 0 && (
                <p className="text-gray-400">No trending movies available.</p>
            )}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Browse More Section */}
      <h1 className="text-white text-2xl mb-6 mt-10 border-b border-gray-700 pb-2">
        Browse More
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moviesInGrid.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      )}
      {!hasNextPage && (
        <p className="text-center text-gray-400 mt-10">
          You have reached the end of the list.
        </p>
      )}
    </div>
  );
}
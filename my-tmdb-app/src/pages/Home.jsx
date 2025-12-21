// src/pages/Home.jsx
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import MovieCarousel from "../components/MovieCarousel"; 
import { useTrendingMovies } from "../hooks/useTrendingMovies"; // موجود لديك
import { useInfiniteMovies } from "../hooks/useInfiniteMovies"; // موجود لديك
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"; // موجود لديك

const SKELETON_COUNT = 18; 

export default function Home() {
  
  // 1. جلب بيانات "الأفلام الرائجة" للكاروسيل
  const { data: carouselData, isLoading: isLoadingCarousel } = useTrendingMovies(); //
  const trendingMoviesForCarousel = carouselData?.results || [];

  // 2. جلب بيانات "كل الأفلام" لشبكة التمرير اللانهائي
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMovies(); //

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
  }); //

  const allMovies = infiniteData?.pages.flatMap(page => page.results) || [];
  
  // تصفية الأفلام لتجنب تكرارها بين الكاروسيل والشبكة
  const moviesInGrid = allMovies.filter(movie => 
      !trendingMoviesForCarousel.slice(0, 15).some(tMovie => tMovie.id === movie.id)
  );


  // يتم عرض الهيكل العظمي لجميع المكونات عند التحميل لأول مرة
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
      
      {/* 1. قائمة الأفلام الرائجة القابلة للتمرير (الكاروسيل) */}
      <MovieCarousel 
        title="🔥 Trending Now" 
        movies={trendingMoviesForCarousel.slice(0, 15)} 
      />

      {/* 2. شبكة الأفلام الرئيسية (التمرير اللانهائي) */}
      <h1 className="text-white text-2xl mb-6 mt-10 border-b border-gray-700 pb-2">
        Browse More
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moviesInGrid.map(movie => (
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
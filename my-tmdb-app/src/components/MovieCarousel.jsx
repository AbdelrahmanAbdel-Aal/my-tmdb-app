// src/components/MovieCarousel.jsx
import React, { useRef } from 'react';
import MovieCard from './MovieCard';

// أيقونات الأزرار (Chevron Left and Right)
const ChevronLeft = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRight = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


export default function MovieCarousel({ title, movies }) {
    const scrollRef = useRef(null);

    const scrollByAmount = scrollRef.current ? scrollRef.current.clientWidth / 1.5 : 400;

    // دالة التمرير لليسار
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
        }
    };

    // دالة التمرير لليمين
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="relative mb-12 group">
            
            <h2 className="text-3xl font-bold text-white mb-6 tracking-wide border-b border-blue-500 pb-2">
                {title}
            </h2>

            {/* زر التمرير لليسار - يظهر عند التمرير بالماوس على الحاوية */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800 bg-opacity-70 rounded-r-lg text-white hover:bg-blue-600 transition duration-300 shadow-xl opacity-0 group-hover:opacity-100 hidden md:block"
                aria-label="Scroll left"
            >
                <ChevronLeft />
            </button>

            {/* حاوية الأفلام القابلة للتمرير */}
            <div
                ref={scrollRef}
                className="flex overflow-x-scroll snap-x snap-mandatory space-x-4 p-4 -m-4 scrollbar-hide"
                // هذا الجزء يسمح بالتمرير اللطيف بالماوس
            >
                {movies.map(movie => (
                    <div 
                        key={movie.id} 
                        // عرض 5 كروت على الشاشات الكبيرة و 2 على الصغيرة
                        className="snap-start flex-shrink-0" 
                        style={{ width: 'calc(100% / 5 - 1.5rem)' }} 
                    >
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            {/* زر التمرير لليمين - يظهر عند التمرير بالماوس على الحاوية */}
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800 bg-opacity-70 rounded-l-lg text-white hover:bg-blue-600 transition duration-300 shadow-xl opacity-0 group-hover:opacity-100 hidden md:block"
                aria-label="Scroll right"
            >
                <ChevronRight />
            </button>
            
        </div>
    );
}
// src/pages/Movies.jsx

import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromApi } from '../api/tmdb';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

// دالة جلب الأفلام بناءً على المسار
const fetchMoviesByCategory = async ({ pageParam = 1, queryKey }) => {
    const [_, category, genreId] = queryKey;
    let endpoint = '';

    if (genreId) {
        // إذا كان التنقل عبر النوع (Genre ID)
        endpoint = `/discover/movie?with_genres=${genreId}`;
    } else {
        // إذا كان التنقل عبر التصنيف (popular, top_rated, etc.)
        // نستخدم 'movie' لأنها صفحة الأفلام
        endpoint = `/movie/${category}`; 
    }

    return fetchFromApi(endpoint, { page: pageParam });
};

// **ملاحظة:** تم استخدام hook عام هنا لكي لا نكرر الكود في كل تصنيف.

export default function Movies() {
    const { category, genreId } = useParams();
    
    // يحدد مفتاح الـ Query ونوع الـ Endpoint
    const queryKey = useMemo(() => {
        if (genreId) return ['movies-by-genre', 'genre', genreId];
        // التصنيف الافتراضي لـ /movies هو popular
        return ['movies-by-category', category || 'popular', null]; 
    }, [category, genreId]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: fetchMoviesByCategory,
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

    const movies = data?.pages.flatMap((page) => page.results) || [];

    // تحديد عنوان الصفحة
    const title = useMemo(() => {
        if (genreId) return `Movies by Genre ID: ${genreId}`;
        return category 
            ? category.replace('_', ' ').toUpperCase() + ' MOVIES' 
            : 'POPULAR MOVIES';
    }, [category, genreId]);


    if (isLoading) {
        return (
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
        );
    }
    
    if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>;


    return (
        <div className="p-6">
            <h1 className="text-white text-2xl mb-6">{title}</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={loadMoreRef} className="h-10" />

            {isFetchingNextPage && (
                <p className="text-center text-gray-400 mt-4">
                    Loading more...
                </p>
            )}
        </div>
    );
}
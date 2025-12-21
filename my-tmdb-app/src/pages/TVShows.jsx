// src/pages/TVShows.jsx

import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard'; // سنستخدم نفس الـ Card
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromApi } from '../api/tmdb';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

// دالة جلب المسلسلات بناءً على المسار
const fetchTVShowsByCategory = async ({ pageParam = 1, queryKey }) => {
    const [_, category, genreId] = queryKey;
    let endpoint = '';

    if (genreId) {
        // التنقل عبر النوع
        endpoint = `/discover/tv?with_genres=${genreId}`;
    } else {
        // التنقل عبر التصنيف (popular, top_rated, etc.)
        // نستخدم 'tv'
        endpoint = `/tv/${category}`;
    }

    return fetchFromApi(endpoint, { page: pageParam });
};

export default function TVShows() {
    const { category, genreId } = useParams();

    const queryKey = useMemo(() => {
        if (genreId) return ['tv-shows-by-genre', 'genre', genreId];
        // التصنيف الافتراضي لـ /tv هو popular
        return ['tv-shows-by-category', category || 'popular', null]; 
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
        queryFn: fetchTVShowsByCategory,
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

    const shows = data?.pages.flatMap((page) => page.results) || [];
    
    const title = useMemo(() => {
        if (genreId) return `TV Shows by Genre ID: ${genreId}`;
        return category 
            ? category.replace('_', ' ').toUpperCase() + ' TV SHOWS' 
            : 'POPULAR TV SHOWS';
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
                {shows.map((show) => (
                    // نستخدم MovieCard لأنها تعرض بوستر وعنوان، وسيكون التوجيه صحيحاً لصفحة تفاصيل المسلسل
                    <MovieCard 
                        key={show.id} 
                        movie={show} 
                        isTVShow={true} // يمكن تمرير خاصية للتمييز بين الأفلام والمسلسلات إذا أردت
                    />
                ))}
            </div>

            <div ref={loadMoreRef} className="h-10" />

            {isFetchingNextPage && (
                <p className="text-center text-gray-400 mt-4">
                    Loading more...
                </p>
            )}
        </div>
    );
}
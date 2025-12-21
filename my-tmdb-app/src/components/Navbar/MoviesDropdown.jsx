// src/components/Navbar/MoviesDropdown.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFromApi } from '../../api/tmdb';

// Hook مخصص لجلب الأنواع
function useMovieGenres() {
    return useQuery({
        queryKey: ['movie-genres'],
        queryFn: () => fetchFromApi('/genre/movie/list'),
        staleTime: Infinity, // لا تتغير الأنواع، لذا يمكن تخزينها للأبد
    });
}

const moviesCategories = [
    { title: 'Popular', route: '/movies/popular' },
    { title: 'Top Rated', route: '/movies/top_rated' },
    { title: 'Upcoming', route: '/movies/upcoming' },
];

export default function MoviesDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: genresData } = useMovieGenres();
    const dropdownRef = useRef(null);

    // لإغلاق القائمة عند النقر خارجها
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-lg hover:text-blue-400 transition flex items-center"
            >
                Movies 
                <span className="ml-1 text-sm">▼</span>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-20 p-2">
                    <div className="border-b border-gray-700 pb-2 mb-2">
                        <h4 className="text-gray-400 text-sm mb-1">Categories</h4>
                        {moviesCategories.map((item) => (
                            <Link
                                key={item.route}
                                to={item.route}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-1 text-white hover:bg-gray-700 rounded transition"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    <h4 className="text-gray-400 text-sm mb-1">Genres</h4>
                    <div className="max-h-60 overflow-y-auto">
                        {genresData?.genres.map((genre) => (
                            <Link
                                key={genre.id}
                                to={`/movies/genre/${genre.id}`} // استخدام المسار الديناميكي الجديد
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-1 text-white hover:bg-gray-700 rounded transition"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
// src/hooks/useInfiniteMovies.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/tmdb";

export function useInfiniteMovies() {
  return useInfiniteQuery({
    queryKey: ["infiniteMovies"], // مفتاح فريد
    queryFn: ({ pageParam = 1 }) =>
      fetchFromApi("/discover/movie", { // 💡 تغيير المسار إلى discover/movie أو أي مسار آخر غير trending
        page: pageParam,
        // يمكنك إضافة معلمات أخرى هنا مثل sort_by أو language
      }),
    getNextPageParam: (lastPage) => {
      // 💡 استخدام lastPage مباشرةً بدلاً من lastPage.page
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
}
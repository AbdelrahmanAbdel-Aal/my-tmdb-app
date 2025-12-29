// src/hooks/useTrendingMovies.js

import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../api/tmdb";

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["trendingMoviesCarousel"],
    // 💡 الحل: قم بإنشاء دالة سهمية (Arrow Function) لا تستقبل أي معلمات 
    // وتستدعي fetchTrendingMovies بدون معلمات، لكي تستخدم القيمة الافتراضية page=1
    queryFn: () => fetchTrendingMovies(), 
    // يمكنك كتابتها أيضاً كالتالي:
    // queryFn: ({ queryKey }) => fetchTrendingMovies(), 
    // ولكن الطريقة الأولى أنظف وأكثر وضوحًا لهذا الاستخدام.
  });
}
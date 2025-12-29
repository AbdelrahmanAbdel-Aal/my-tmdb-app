const handleGenreSelect = (genreId) => {
  // استخدم الـ API لجلب الأفلام حسب النوع المحدد
  fetchFromApi(`/discover/movie?with_genres=${genreId}`)
    .then((data) => setMovies(data.results));
};

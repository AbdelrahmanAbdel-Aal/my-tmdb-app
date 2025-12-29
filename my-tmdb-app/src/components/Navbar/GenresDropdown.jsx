const handleGenreSelect = (genreId) => {
  fetchFromApi(`/discover/movie?with_genres=${genreId}`)
    .then((data) => setMovies(data.results));
};

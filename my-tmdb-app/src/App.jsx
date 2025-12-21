// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import ActorDetails from "./pages/ActorDetails";
import Navbar from "./components/Navbar/Navbar";

// 👈 استدعاء الصفحات الجديدة التي تم إنشاؤها
import Movies from "./pages/Movies";     
import TVShows from "./pages/TVShows";   
import Actors from "./pages/Actors";     


export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* مسارات الأفلام - تدعم التصنيف والأنواع */}
        <Route path="/movies/:category" element={<Movies />} /> 
        <Route path="/movies/genre/:genreId" element={<Movies />} /> 
        <Route path="/movie/:id" element={<MovieDetails />} />
        
        {/* مسارات المسلسلات - تدعم التصنيف والأنواع */}
        <Route path="/tv/:category" element={<TVShows />} />
        <Route path="/tv/genre/:genreId" element={<TVShows />} /> 
        
        {/* مسارات الممثلين */}
        <Route path="/actors" element={<Actors />} />
        <Route path="/actor/:id" element={<ActorDetails />} />

        {/* المسارات العامة الأخرى */}
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* مسار احتياطي لـ 404 */}
        <Route path="*" element={<h1 className="p-6 text-3xl text-red-500">404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}
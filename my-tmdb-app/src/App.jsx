import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import ActorDetails from "./pages/ActorDetails";
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/actor/:id" element={<ActorDetails />} />
      </Routes>
    </div>
  );
}

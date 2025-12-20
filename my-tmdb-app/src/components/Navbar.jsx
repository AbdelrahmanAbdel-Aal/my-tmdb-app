import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="bg-black text-white px-6 py-4 flex gap-6">
        
      <Link to="/" className="font-bold text-xl">
        TMDB
      </Link>

      <Link to="/" className="hover:text-gray-300">
        Home
      </Link>
      <Link to="/search">Search</Link>
      
        <Link
    to="/favorites"
    className="text-white hover:text-red-400"
    >
    ❤️ Favorites
    </Link>

    </nav>
  );
}

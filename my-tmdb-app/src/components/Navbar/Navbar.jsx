
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MoviesDropdown from './MoviesDropdown'; 
import SearchBar from '../SearchBar';


const NavLink = ({ to, children }) => (
    <Link 
        to={to} 
        className="text-lg relative group transition duration-300"
    >
        {children}
       
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

export default function Navbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term.trim()) {
            navigate(`/search?q=${term}`);
        } else if (location.pathname.startsWith('/search')) {
            navigate('/');
        }
    };

    return (
        <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
            
            
            <Link to="/" className="text-3xl font-extrabold text-blue-400 hover:text-blue-300 transition tracking-wider">
                🎬 TMDB App
            </Link>

         
            <div className="flex gap-8 items-center text-gray-300">
                
               
                <MoviesDropdown />
                
                
                
                <NavLink to="/actors">Actors</NavLink>
                
                <NavLink to="/favorites">
                    Favorites <span className="text-red-400">❤️</span>
                </NavLink>
            </div>

            
            <div className="w-80">
                <SearchBar 
                    value={searchTerm} 
                    onChange={handleSearch} 
                />
            </div>
        </nav>
    );
}
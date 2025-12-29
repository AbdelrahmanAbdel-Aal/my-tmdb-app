
import { useState, useCallback } from 'react'; 

const FAVORITES_STORAGE_KEY = 'tmdb_favorites';

const getInitialFavorites = () => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
       
        if (storedFavorites) {
            const parsedData = JSON.parse(storedFavorites);
           
            if (Array.isArray(parsedData)) {
                return Object.fromEntries(parsedData);
            }
           
            return parsedData;
        }
        return {}; 
    } catch (error) {
        console.error("Error reading favorites from localStorage", error);
        return {};
    }
};

export function useFavorites() {
    
    
    const [favorites, setFavorites] = useState(getInitialFavorites);

   
    const toggleFavorite = useCallback((movie) => {
        const movieId = movie.id.toString(); 
        
        
        setFavorites(prevFavorites => {
          
            const newFavorites = { ...prevFavorites }; 
            
            if (newFavorites.hasOwnProperty(movieId)) {
                
                delete newFavorites[movieId]; 
            } else {
               
                newFavorites[movieId] = {
                    id: movie.id,
                    title: movie.title || movie.name, 
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                };
            }

        
            try {
                localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
            } catch (error) {
                console.error("Error saving favorites instantly", error);
            }
            
           
            return newFavorites; 
        });
    }, []); 


    const isFavorite = useCallback((movieId) => {
      
        return favorites.hasOwnProperty(movieId.toString());
    }, [favorites]); 

    const getFavoritesList = useCallback(() => {

        return Object.values(favorites);
    }, [favorites]); 

    return {
        isFavorite,
        toggleFavorite,
        getFavoritesList, 
        favoritesCount: Object.keys(favorites).length, 
    };
}
import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Load favorites from local storage on initial mount
  const loadFavoritesFromStorage = () => {
    try {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      return storedFavorites;
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error);
      return [];
    }
  };

  const [favorites, setFavorites] = useState(loadFavoritesFromStorage);

  // Function to toggle a movie's favorite status
  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === movie.id)) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        // Store only essential attributes to minimize localStorage usage
        const essentialAttributes = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
        };
        return [...prevFavorites, essentialAttributes];
      }
    });
    // console.log("Added to Favorites:", movie);
  };

  // Save favorites to local storage whenever the favorites state changes
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;

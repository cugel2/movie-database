import React, { useContext } from "react";
import { FavoritesContext } from "./FavoritesProvider";

const FavoriteButton = ({ movie }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorited = favorites.some((fav) => fav.id === movie.id);

  return (
    <button
      onClick={() => toggleFavorite(movie)}
      className={`fav-icon ${isFavorited ? "favorited" : ""}`}
      aria-label="Toggle favorite"
    >
      {isFavorited ? (
        // Filled Heart SVG
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 3H16.9C16.1775 2.99817 15.4621 3.14052 14.7946 3.41708C14.1271 3.69364 13.5207 4.099 13.01 4.61L12 5.62L10.99 4.61C9.47043 3.09039 7.26001 2.73599 5.27 3.61C3.27999 4.48301 2.00004 6.23 2.42 8.04C2.60998 8.72497 3.00003 9.34892 3.55 9.89L12 18.28L20.45 9.89C20.7393 9.59836 20.981 9.25407 21.1538 8.8791C21.3266 8.50412 21.4254 8.10237 21.442 7.7C21.8378 5.95601 21.0009 4.17601 20.05 3.18L20.84 4.61Z"
            fill="#dc3545"
            stroke="#dc3545"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Empty Heart SVG
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.04L12 21.35Z"
            stroke="#dc3545"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;

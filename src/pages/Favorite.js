import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import HoverSummary from "../components/HoverSummary";
import { FavoritesContext } from "../components/FavoritesProvider";

const Favorite = () => {
  const [page, setPage] = useState(1);
  const [movieDetails, setMovieDetails] = useState({});
  const { favorites } = useContext(FavoritesContext);
  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

  const fetchMovieDetails = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    async function fetchMovieDetailsForAllMovies() {
      const movieDetailsArray = await Promise.all(
        favorites.map((movie) => fetchMovieDetails(movie.id))
      );
      setMovieDetails(movieDetailsArray);
    }

    fetchMovieDetailsForAllMovies();
  }, [favorites, fetchMovieDetails]);

  const MOVIES_PER_PAGE = 12;
  const start = (page - 1) * MOVIES_PER_PAGE;
  const end = start + MOVIES_PER_PAGE;
  const paginatedFavorites = favorites.slice(start, end);

  if (favorites.length === 0) {
    return (
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold head d-flex justify-content-center align-items-center">
            <h4 className="fs-2 no-fav">
              You have no favourited movies.Return to the
              <Link to="/"> home page</Link> to add a favourite movie.
            </h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row py-5 my-5">
        <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
          <i className="fas fa-fire mx-4 text-danger"></i>
          <h4 className="fs-2">Favorite Movies</h4>
          <i className="fas fa-fire mx-4 text-danger"></i>
        </div>
        {paginatedFavorites.map((movie, index) => {
          const movieDetail = movieDetails[start + index];
          if (!favorites.length) return null; // Don't render if no details
          return (
            <div className="col-md-3 col-sm-4 py-3" id="card" key={movie.id}>
              <HoverSummary movie={movie} movieDetail={movieDetail} />
            </div>
          );
        })}
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Favorite;

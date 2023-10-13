import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import HoverSummary from "../components/HoverSummary"; // Import the HoverSummary component

const Trending = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("popular");
  const [movieDetails, setMovieDetails] = useState({});
  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

  const categories = {
    popular: "Popular",
    top_rated: "Top Rated",
    now_playing: "Now Playing",
    upcoming: "Upcoming",
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`
      https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      setState(data.results);
    };
    fetchMovies();
  }, [page, category, API_KEY]);

  useEffect(() => {
    const fetchMovieDetails = async (id) => {
      const response = await fetch(`
      https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
      const data = await response.json();
      return data;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //   fetchMovies();
    // }, [page, category]);

    // useEffect(() => {
    async function fetchMovieDetailsForAllMovies() {
      const movieDetailsArray = await Promise.all(
        state.map((movie) => fetchMovieDetails(movie.id))
      );
      setMovieDetails(movieDetailsArray);
    }

    fetchMovieDetailsForAllMovies();
  }, [state, API_KEY]);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setPage(1);
  };

  return (
    <div className="container">
      <div className="row py-5 my-5">
        <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
          <i className="fas fa-fire mx-4 text-danger"></i>
          <h4 className="fs-2">{categories[category]} Movies</h4>
          <i className="fas fa-fire mx-4 text-danger"></i>
        </div>

        <div className="col-12 mb-4 d-flex justify-content-between">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              className={`btn ${
                category === key ? "btn-warning" : "btn-outline-warning"
              }`}
              onClick={() => handleCategoryChange(key)}
            >
              {categories[key]}
            </button>
          ))}
        </div>
        {state.slice(0, 12).map((movie, index) => {
          const movieDetail = movieDetails[index];
          return (
            <div
              key={movie.id}
              className="col-md-3 col-sm-4 py-3 d-flex justify-content-center g-4"
              id="card"
            >
              <HoverSummary movie={movie} movieDetail={movieDetail} />
            </div>
          );
        })}
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Trending;

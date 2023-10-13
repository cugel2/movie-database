import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";

import HoverSummary from "../components/HoverSummary"; // Import the HoverSummary component

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  // const [state, setState] = useState([]);
  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

  const fetchSearch = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    const { results } = await data.json();
    setContent(results);
  };

  useEffect(() => {
    fetchSearch();
  }, []);

  const fetchMovieDetails = async (id) => {
    const response = await fetch(`
      https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  };

  const Search = () => {
    fetchSearch();
  };

  const Trigger = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    async function fetchMovieDetailsForAllMovies() {
      const movieDetailsArray = await Promise.all(
        content.map((movie) => fetchMovieDetails(movie.id))
      );
      setMovieDetails(movieDetailsArray);
    }

    fetchMovieDetailsForAllMovies();
  }, [content]);

  return (
    <div className="container">
      <div className="row pt-3 mb-5 pb-5">
        <div className="col-12 pt-5 pb-3 mt-5 d-flex justify-content-center align-items-center">
          <input
            type="text"
            placeholder="Search..."
            onChange={Trigger}
            className="form-control-lg col-6 search bg-dark text-white border border-0"
          />
          <button
            className="btn btn-warning text-black mx-2 col-md-1 col-sm-2 py-2"
            onClick={Search}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {content.map((movie, index) => {
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
        {page > 1 && <Pagination page={page} setPage={setPage} />}
      </div>
    </div>
  );
};

export default Search;

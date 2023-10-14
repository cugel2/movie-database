import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import HoverSummary from "../components/HoverSummary"; // Import the HoverSummary component
import Slider from "react-slick";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import the styles

const Trending = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("popular");
  const [movieDetails, setMovieDetails] = useState({});
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

  const categories = {
    popular: "Popular",
    top_rated: "Top Rated",
    now_playing: "Now Playing",
    upcoming: "Upcoming",
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enables auto sliding
    autoplaySpeed: 5000,
    arrows: true,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`
      https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      setState(data.results);
      setMovies(data.results.sort(() => 0.5 - Math.random()).slice(0, 5));
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

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, [API_KEY]);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name !== null)
      .join(", ");
  };

  return (
    <div className="container">
      <div className="container-of-slider">
        <Slider {...sliderSettings}>
          {movies.map((movie) => {
            // Extract year from the movie's release date
            const year = movie.release_date?.split("-")[0];
            const percentage = movie.vote_average * 10;

            return (
              <div key={movie.id} className="movie-slide">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h1>
                    {movie.title} ({year})
                  </h1>

                  <p>{getGenreNames(movie.genre_ids)}</p>

                  <div style={{ width: "90px" }}>
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        textSize: "36px",
                        pathColor: `rgba(251, 188, 5, ${percentage / 100})`,
                        textColor: "#fff",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="row py-5 my-5">
        <div className="col-12 mb-4 d-flex justify-content-end">
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

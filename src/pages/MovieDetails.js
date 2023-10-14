import React, { useEffect, useState } from "react";
import {
  img_300,
  img_500,
  img_original,
  img_92,
  img_154,
  img_185,
  img_780,
  unavailable,
} from "../components/config";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [certification, setCertification] = useState("");
  const [backdrops, setBackdrops] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cast, setCast] = useState([]);

  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();

        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    const fetchMovieBackdrops = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
        );
        const data = await response.json();
        setBackdrops(data.backdrops);
      } catch (error) {
        console.error("Error fetching backdrops:", error);
      }
    };
    const fetchMovieCertification = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
        );
        const data = await response.json();
        const usReleaseDates = data.results.find(
          (result) => result.iso_3166_1 === "US"
        );
        const usCertification = usReleaseDates.release_dates[0].certification;
        setCertification(usCertification);
      } catch (error) {
        console.error("Error fetching certification:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const data = await response.json();
        const ytTrailer = data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailer(ytTrailer);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieBackdrops();
    fetchMovieCertification();
    fetchMovieTrailer();
    fetchMovieCast();
  }, [id, API_KEY]);

  function convertRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  if (!movie) return <div>Loading...</div>;
  const backdropUrl =
    backdrops.length > 0
      ? `https://image.tmdb.org/t/p/w1280/${backdrops[1].file_path}`
      : unavailable;
  return (
    <div className="movie-details-container">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px 0",
        }}
      >
        <div className="poster-info">
          <img
            src={
              movie.poster_path
                ? `${img_500}/${movie.poster_path}`
                : unavailable
            }
            alt={movie.title}
            style={{
              border: "5px solid white",
              height: "600px",
              width: "450px",
              padding: "0",
              margin: "80px 60px",
            }}
          />
          {/* <img
        src={
          movie.poster_path ? `${img_500}/${movie.poster_path}` : unavailable
        }
        alt={`${movie.title} (500px wide)`}
      />
      <img
        src={
          movie.poster_path
            ? `${img_original}/${movie.poster_path}`
            : unavailable
        }
        alt={`${movie.title} (original wide)`}
      />
      <img
        src={movie.poster_path ? `${img_92}/${movie.poster_path}` : unavailable}
        alt={`${movie.title} (92px wide)`}
      />
      <img
        src={
          movie.poster_path ? `${img_154}/${movie.poster_path}` : unavailable
        }
        alt={`${movie.title} (154px wide)`}
      />
      <img
        src={
          movie.poster_path ? `${img_185}/${movie.poster_path}` : unavailable
        }
        alt={`${movie.title} (185px wide)`}
      />
      <img
        src={
          movie.poster_path ? `${img_780}/${movie.poster_path}` : unavailable
        }
        alt={`${movie.title} (780px wide)`}
      /> */}
          <div className="detail-info">
            <h2>{movie.title.toUpperCase()}</h2>
            <div className="sub-movieName">
              <p className="age-limit">{certification}</p>

              <p>{movie.release_date}</p>
              <span>|</span>
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
              <span>|</span>
              <p>{convertRuntime(movie.runtime)}</p>
            </div>

            <p>Rating: {Math.ceil(movie.vote_average * 10)}%</p>
            <p>{movie.overview}</p>
            {trailer && (
              <button
                className="btn px-3 py-1 m-1 text-center btn-warning"
                onClick={openModal}
              >
                Play Trailer
              </button>
            )}

            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close-button" onClick={closeModal}>
                    &times;
                  </span>
                  <iframe
                    title="Movie Trailer"
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            <h5>Top Cast:</h5>
            <div className="cast-container">
              {cast.slice(0, 6).map((actor) => (
                <div key={actor.cast_id} className="actor">
                  <img
                    src={
                      actor.profile_path
                        ? `${img_300}${actor.profile_path}`
                        : unavailable
                    }
                    alt={actor.name}
                    className="actor-image"
                  />
                  <h6>{actor.name}</h6>
                </div>
              ))}
            </div>
            {/* Add the FavoriteButton here as well */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

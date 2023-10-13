import React, { useState } from "react";
import { img_300, unavailable } from "./config";
import FavoriteButton from "./FavoriteButton";
import { Link } from "react-router-dom";

const HoverSummary = ({ movie, movieDetail }) => {
  // console.log("HoverSummary Props:", movie, movieDetail);

  const [hoveredPosterSize, setHoveredPosterSize] = useState(null);

  const handlePosterHover = (event) => {
    const posterContainer = event.currentTarget;
    const posterWidth = posterContainer.clientWidth;
    const posterHeight = posterContainer.clientHeight;
    setHoveredPosterSize({ width: posterWidth, height: posterHeight });
  };

  const handlePosterLeave = () => {
    setHoveredPosterSize(null);
  };

  const {
    name,
    title,
    poster_path,
    vote_average,
    first_air_date,
    release_date,
    media_type,
  } = movie;

  // Check if vote_average is a number, otherwise display "NA"
  const ratingValue =
    typeof vote_average === "number"
      ? Math.ceil(vote_average * 10) + "%"
      : "NA";

  let overviewText =
    movieDetail && movieDetail.overview
      ? movieDetail.overview
      : "Overview not available";

  // Split the overview text into words
  const words = overviewText.split(" ");

  // Limit the number of words to 50 (adjust as needed)
  const maxWords = 50;
  if (words.length > maxWords) {
    overviewText = words.slice(0, maxWords).join(" ") + " ..."; // Add "..." if text is truncated
  }
  return (
    <div
      className="card bg-dark summary-container poster-container"
      onMouseEnter={handlePosterHover}
      onMouseLeave={handlePosterLeave}
      onFocus={handlePosterHover}
      onBlur={handlePosterLeave}
    >
      <img
        src={poster_path ? `${img_300}/${poster_path}` : unavailable}
        className="card-img-top pt-3 pb-0 px-3 poster-image"
        alt={title || name}
      />

      <Link to={`/movie/${movie.id}`}>
        {hoveredPosterSize && (
          <div
            className="short-summary"
            style={{
              width: `${hoveredPosterSize.width}px`,
              height: `${hoveredPosterSize.height}px`,
              maxHeight: `${hoveredPosterSize.height}px`,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "pre-wrap",
            }}
          >
            {overviewText}
          </div>
        )}
      </Link>

      <div className="rating-circle">{ratingValue}</div>
      <FavoriteButton movie={movie} />
      <div className="card-body">
        <h5 className="card-title text-center fs-5">{title || name}</h5>
        <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
          <div>{media_type === "tv" ? "TV Show" : "Movie"}</div>
          <div>{first_air_date || release_date}</div>
        </div>
      </div>
    </div>
  );
};

export default HoverSummary;

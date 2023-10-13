import React, { useState, useEffect } from "react";
import { img_300, unavailable } from "../components/config";
import Pagination from "../components/Pagination";
import Genre from "../components/Genre";
import useGenre from "../useGenre";

const Movies = () => {
  const [state, setState] = useState([]); //store the fetched data
  const [page, setPage] = useState(1); //keep a track of the page numbers
  const [genre, setGenre] = useState([]); //used to store the origional genre values
  const [value, setValue] = useState([]); //used to store the selected genre values
  const genreURL = useGenre(value);

  const fetchTrending = async () => {
    const data = await fetch(`
    https://api.themoviedb.org/3/discover/movie?api_key=8bd32e7ff2d47ddecbfa45ed0c4f1186&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
    const dataJ = await data.json();
    setState(dataJ.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page, genreURL]);

  return (
    <div className="container">
      <div className="row py-5 my-5">
        <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline"></div>
        <Genre
          genre={genre}
          setGenre={setGenre}
          setPage={setPage}
          type="movie"
          value={value}
          setValue={setValue}
        />
        {state.map((Val) => {
          const {
            name,
            title,
            poster_path,
            first_air_date,
            release_date,
            media_type,
            vote_average,
            id,
          } = Val;
          return (
            <div className="col-md-3 col-sm-4 py-3" id="card" key={id}>
              <div className="card bg-dark">
                <img
                  src={poster_path ? `${img_300}/${poster_path}` : unavailable}
                  className="card-img-top pt-3 pb-0 px-3"
                  alt={title || name}
                />
                <div className="rating-circle">
                  {Math.ceil(vote_average * 10)}%
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center fs-5">
                    {title || name}
                  </h5>
                  <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                    <div>{media_type === "tv" ? "TV Series" : "Movie"}</div>
                    <div>{first_air_date || release_date}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Movies;

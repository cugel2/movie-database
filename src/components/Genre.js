import React, { useEffect } from "react";

const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

const Genre = ({ genre, setGenre, setPage, type, value, setValue }) => {
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
        );
        const { genres } = await data.json();

        setGenre(genres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenre();
  }, [type, setGenre]);

  const handleCategoryToggle = (selectedGenre) => {
    if (value.some((g) => g.id === selectedGenre.id)) {
      // Remove the category
      setValue(value.filter((g) => g.id !== selectedGenre.id));
      setGenre([...genre, selectedGenre]);
    } else {
      // Add the category
      setValue([...value, selectedGenre]);
      setGenre(genre.filter((g) => g.id !== selectedGenre.id));
    }
    setPage(1);
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-12 d-flex flex-wrap">
          {value.length > 0 &&
            value.map((val) => (
              <div className="m-2" key={val.id}>
                <button
                  className="bg-dark px-4 py-2 text-center buttons"
                  onClick={() => handleCategoryToggle(val)}
                >
                  {val.name}
                </button>
              </div>
            ))}

          {genre.length > 0 &&
            genre.map((gen) => (
              <div className="m-2" key={gen.id}>
                <button
                  className="bg-dark text-white px-4 py-2 text-center button"
                  onClick={() => handleCategoryToggle(gen)}
                >
                  {gen.name}
                </button>
              </div>
            ))}

          {value.length === 0 && genre.length === 0 && (
            <p>No genres available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Genre;

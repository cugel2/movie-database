import React, { createContext, useState, useEffect, useContext } from "react";
import { useCallback } from "react";

const AppContext = createContext();

const AppProvider = ({ children, media_type, id }) => {
  const [data, setData] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

  const fetchData = useCallback(async () => {
    if (!media_type || !id) {
      setError("Media type or ID is missing.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
      );
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setError(result.message || "An error occurred.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  }, [media_type, id, API_KEY]);

  const fetchVideo = useCallback(async () => {
    if (!media_type || !id) {
      setError("Media type or ID is missing.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const result = await response.json();
      if (response.ok && result.results.length > 0) {
        setVideo(result.results[0]);
      } else {
        setError("No videos found.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  }, [media_type, id, API_KEY]);

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, [fetchData, fetchVideo]); // Dependency array ensures that if media_type or id change, the fetches are re-executed

  return (
    <AppContext.Provider value={{ data, video, error }}>
      {children}
    </AppContext.Provider>
  );
};

//Global Custom Hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };

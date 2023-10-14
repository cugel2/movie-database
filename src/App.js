import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Favorite from "./pages/Favorite";
import Search from "./pages/Search";
import Error from "./pages/Error";
import MovieDetails from "./pages/MovieDetails"; // Import the MovieDetails component
import { FavoritesProvider } from "./components/FavoritesProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import About from "./pages/About";

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <FavoritesProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Trending />} />{" "}
              {/* Your home component */}
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetails />} />{" "}
              {/* Route for individual movie details */}
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<Error />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </FavoritesProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;

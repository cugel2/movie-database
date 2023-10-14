import React from "react";
import TMDbLogo from "../TMDbLogo.svg"; // Import the TMDb logo you downloaded

const About = () => {
  return (
    <div className="container about-page">
      <img className="main-logo" src="./Logo02.png" alt="Website-Logo" />

      <p>
        Filimo is a VOD streaming service that is the ultimate way to watch the
        best movies and TV series for all viewers living all around the world.
        If you consider the social impact of watching movies and series, the
        importance of Filimo could be more than just a VOD platform for you. VOD
        service of Filimo has started providing streaming on June 21, 2023.
        Notably, up-to-date streaming of movies and along with different
        languages subtitles are among the most important features of the
        service.Filimo with more than 2000 movies and TV shows has a large
        number of animated features and series for all the children. Other
        advantages of this platform include secure and easy payment methods
        through Paypal.
      </p>

      <hr />

      <div className="tmdb-attribution">
        <img src={TMDbLogo} alt="TMDb Logo" className="tmdb-logo" />
        <p>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
      </div>

      <p>
        For further information and inquiries, feel free to{" "}
        <a href="mailto:support@movieapp.com">contact us</a>.
      </p>
    </div>
  );
};

export default About;

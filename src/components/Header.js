import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

const logoImage = process.env.PUBLIC_URL + "/Logo02.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data = [
    {
      icon: "fas fa-home",
      name: "Home",
      link: "/",
      id: 1,
    },

    {
      icon: "fa-regular fa-heart",
      name: "My Favorite",
      link: "/Favorite",
      id: 2,
    },
    {
      icon: "fa-solid fa-circle-info",
      name: "About",
      link: "/about",
      id: 3,
    },
    {
      icon: "fas fa-search",
      name: "Search",
      link: "/search",
      id: 4,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center bg-dark header">
          <NavLink to="/" className="logo-link">
            <img src={logoImage} alt="Your Logo" className="logo" />
          </NavLink>

          {isMobileView ? (
            <HamburgerMenu
              data={data}
              toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
              isMenuOpen={isMenuOpen}
            />
          ) : (
            <>
              {data.map((Val) => (
                <NavLink to={`${Val.link}`} key={Val.id}>
                  <button className="col-sm-2 col-md-2 btn btn-dark">
                    <i className={`${Val.icon}`}></i>
                    <br />
                    <h5 className="pt-1 fs-6">{Val.name}</h5>
                  </button>
                </NavLink>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

// HamburgerMenu.js

import React from "react";
import { NavLink } from "react-router-dom";

const HamburgerMenu = ({ data, toggleMenu, isMenuOpen }) => {
  return (
    <div>
      <div
        className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`slide-down-menu ${isMenuOpen ? "open" : "close"}`}>
        {data.map((Val) => (
          <NavLink to={`${Val.link}`} key={Val.id}>
            <button className="col-sm-2 col-md-2 btn btn-dark">
              <i className={`${Val.icon}`}></i>
              <h5 className="pt-1 fs-6">{Val.name}</h5>
            </button>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HamburgerMenu;

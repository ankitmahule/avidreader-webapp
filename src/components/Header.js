import { Link } from "react-router-dom";
import "../scss/header.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Header = () => {
  const [headerBackground, setHeaderBackground] =
    useState("header-transparent");

  const location = useLocation();

  const listenScrollEvent = () => {
    if (window.scrollY < 73) {
      return setHeaderBackground("header-transparent");
    } else if (window.scrollY > 70) {
      return setHeaderBackground("header-background");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  return (
    <header
      className={
        location.pathname === "/"
          ? headerBackground
          : "static-position header-background"
      }
    >
      <nav className="container">
        <Link to="/">
          <h2>Avid Reader</h2>
        </Link>

        <div className="right">
          <ul>
            <li>
              <Link to="/about">About us</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

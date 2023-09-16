import { Link } from "react-router-dom";
import "../scss/header.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeLogo from "../assets/images/home.svg";
import DashboardLogo from "../assets/images/dashboard.svg";
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

  const { userInfo } = useSelector((state) => state.auth);

  return location.pathname === "/" ? (
    <header className="header-transparent">
      <nav className="container">
        <Link to="/" className="my-4 w-2/12">
          <img src={HomeLogo} alt="logo" />
        </Link>

        <div className="right">
          <ul>
            {!userInfo && (
              <li>
                <Link to="/about">About us</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  ) : (
    <aside className="aside mx-4 width-[2%]">
      <h2 className="my-4">
        <img src={HomeLogo} alt="logo" />
      </h2>
      <ul className="my-20 ml-10 dashboard-menu">
        <li>
          <Link to="/explore">
            <em className="fa fa-search mr-2"></em>
            Explore
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <em className="fa fa-cog mr-2"></em>
            Settings
          </Link>
        </li>
        <li>
          <Link to="/bookmarks">
            <em className="fa fa-bookmark mr-2"></em>Bookmarks
          </Link>
        </li>

        <li>
          <Link to="/profile">
            <em className="fa fa-user mr-2"></em>Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Header;

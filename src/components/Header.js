import { Link } from "react-router-dom";
import "../scss/header.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardHeader from "./DashboardHeader";
import HomeLogo from "../assets/images/home.svg";
const Header = () => {
  const location = useLocation();

  /* const listenScrollEvent = () => {
    if (window.scrollY < 73) {
      return setHeaderBackground("header-transparent");
    } else if (window.scrollY > 70) {
      return setHeaderBackground("header-background");
    }
  }; */

  /* useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []); */

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
    <DashboardHeader userInfo={userInfo?.data} />
  );
};

export default Header;

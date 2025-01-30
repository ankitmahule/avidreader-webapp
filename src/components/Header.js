import { Link } from "react-router-dom";
import "../scss/header.scss";
import { useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import HomeLogo from "../assets/images/home.svg";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
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
    <DashboardHeader {...userInfo} />
  );
};

export default Header;

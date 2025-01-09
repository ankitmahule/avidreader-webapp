import { Link } from "react-router-dom";
import "../scss/header.scss";
import { useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import HomeLogo from "../assets/images/home.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetAuthState } from "../utils/auth/authSlice";
import { viewProfile } from "../utils/auth/authActions";

const Header = () => {
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  /* const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      dispatch(viewProfile());
    }
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch, userInfo]); */

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
    <DashboardHeader email={userInfo?.email} />
  );
};

export default Header;

import { Link } from "react-router-dom";
import HomeLogo from "../assets/images/home.svg";
import "../scss/layout.scss";
import ProfilePic from "./ProfilePic";
import { viewProfile } from "../utils/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetAuthState } from "../utils/auth/authSlice";

const DashboardHeader = ({ email }) => {
  /*  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewProfile());
    // console.log(success);
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]); */

  return !email ? null : (
    <aside className="aside">
      <div className="my-4 dashboard-logo">
        <Link to="/dashboard">
          <img src={HomeLogo} alt="logo" />
        </Link>
      </div>
      <ul className="dashboard-menu">
        <li>
          <Link to="/explore">
            <p className="fa fa-search mr-2"></p>
            <p>Explore</p>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <p className="fa fa-cog mr-2"></p>
            <p>Settings</p>
          </Link>
        </li>
        <li>
          <Link to="/bookmarks">
            <p className="fa fa-bookmark mr-2"></p>
            <p>Bookmarks</p>
          </Link>
        </li>

        <li>
          <Link to="/profile">
            <p className="fa fa-user mr-2"></p>
            <p>Profile</p>
          </Link>
        </li>
      </ul>
      <div className="profile-section">
        <ProfilePic />
        <p>{email}</p>
      </div>
    </aside>
  );
};

export default DashboardHeader;

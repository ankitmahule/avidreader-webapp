import { Link } from "react-router-dom";
import HomeLogo from "../assets/images/home.svg";
import "../scss/layout.scss";
import ProfilePic from "./ProfilePic";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../utils/auth/authActions";

const DashboardHeader = ({ email }) => {
  const [logoutSection, setLogoutSection] = useState(false);
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
  }

  function toggleLogoutSection(logoutSection) {
    setLogoutSection(logoutSection);
  }

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
        <div
          className="profile-data"
          onClick={() => toggleLogoutSection(!logoutSection)}
        >
          <ProfilePic />
          <p className="email-text">{email}</p>
        </div>
        {logoutSection && (
          <div className="logout-section">
            <p onClick={() => logoutUser()}>Logout</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardHeader;

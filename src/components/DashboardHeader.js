import { Link } from "react-router-dom";
import HomeLogo from "../assets/images/home.svg";
import "../scss/layout.scss";
const DashboardHeader = () => {
  return (
    <aside className="aside">
      <div className="my-4">
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
    </aside>
  );
};

export default DashboardHeader;

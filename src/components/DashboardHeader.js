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

export default DashboardHeader;

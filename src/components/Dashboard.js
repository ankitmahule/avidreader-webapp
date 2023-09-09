import "../scss/dashboard.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const quotes = ["First Quotes", "Second Quote", "Third Quote"];
  return (
    <>
      <main className="container flex">
        <aside className="aside">
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
        <section className="read-section">
          <AddQuote></AddQuote>
          <Quotes quotes={quotes}></Quotes>
        </section>
        <aside className="aisde"></aside>
      </main>
    </>
  );
};

export default Dashboard;

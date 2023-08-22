import "../scss/dashboard.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
const Dashboard = () => {
  const quotes = ["First Quotes", "Second Quote", "Third Quote"];
  return (
    <>
      <main className="container flex">
        <aside className="aside">
          <ul className="dashboard-menu">
            <li>
              <em className="fa fa-search mr-2"></em>
              Explore
            </li>
            <li>
              <em className="fa fa-cog mr-2"></em>
              Settings
            </li>
            <li>
              <em className="fa fa-bookmark mr-2"></em>Bookmarks
            </li>
            <li>
              <em className="fa fa-user mr-2"></em>Profile
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

import "../scss/dashboard.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
const Dashboard = () => {
  const quotes = ["First Quotes", "Second Quote", "Third Quote"];
  return (
    <>
      <main className="container flex">
        <aside className="aside">
          <ul>
            <li>Explore</li>
            <li>Settings</li>
            <li>Bookmarks</li>
            <li>Profile</li>
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

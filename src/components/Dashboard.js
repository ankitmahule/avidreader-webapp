import "../scss/dashboard.scss";
import Quotes from "./Quotes";
const Dashboard = () => {
  const quotes = ["First Quotes", "Second Quote", "Third Quote"];
  return (
    <>
      <main className="container flex">
        <aside className="aside">asdasdasdasdasd</aside>
        <section className="read-section">
          <Quotes quotes={quotes}></Quotes>
        </section>
        <aside className="aisde"></aside>
      </main>
    </>
  );
};

export default Dashboard;

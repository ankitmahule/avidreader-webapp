import "../scss/dashboard.scss";
import "../scss/layout.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";

const Dashboard = () => {
  const quotes = ["First Quotes", "Second Quote", "Third Quote"];
  return (
    <>
      <main className="flex">
        <section className="main-layout">
          <AddQuote></AddQuote>
          <Quotes quotes={quotes}></Quotes>
        </section>
        <aside className="aisde"></aside>
      </main>
    </>
  );
};

export default Dashboard;

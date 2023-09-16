import "../scss/dashboard.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const quotes = ["First Quotes", "Second Quote", "Third Quote"];
  return (
    <>
      <main className="container flex">
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

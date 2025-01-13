import { useEffect } from "react";
import "../scss/dashboard.scss";
import "../scss/layout.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
import { viewProfile } from "../utils/auth/authActions";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const quotes = ["First Quotes", "Second Quote", "Third Quote"];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewProfile());
  }, [dispatch]);
  return (
    <>
      <main className="flex">
        <section className="main-layout">
          <AddQuote></AddQuote>
          <Quotes quotes={quotes}></Quotes>
        </section>
        <aside className="right-aside"></aside>
      </main>
    </>
  );
};

export default Dashboard;

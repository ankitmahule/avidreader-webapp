import { useEffect } from "react";
import "../scss/dashboard.scss";
import "../scss/layout.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
import { viewProfile } from "../utils/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const quotes = ["First Quotes", "Second Quote", "Third Quote"];
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(viewProfile());
    // console.log(success);
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

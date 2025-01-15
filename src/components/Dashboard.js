import { useEffect } from "react";
import "../scss/dashboard.scss";
import "../scss/layout.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
import { viewProfile } from "../utils/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthState } from "../utils/auth/authSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewProfile());
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);
  return (
    <>
      <main className="flex">
        <section className="main-layout">
          <AddQuote></AddQuote>
          <Quotes></Quotes>
        </section>
        <aside className="right-aside"></aside>
      </main>
    </>
  );
};

export default Dashboard;

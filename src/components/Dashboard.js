import "../scss/dashboard.scss";
import "../scss/layout.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { quotes } = useSelector((state) => state.quotes);
  return !userInfo ? null : (
    <section className="main-layout">
      <AddQuote></AddQuote>
      <Quotes quotesList={quotes} isBookmarkPage={false}></Quotes>
    </section>
  );
};

export default Dashboard;

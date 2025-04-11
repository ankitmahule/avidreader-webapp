import "../scss/dashboard.scss";
import "../scss/layout.scss";
import AddQuote from "./AddQuote";
import Quotes from "./Quotes";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return !userInfo ? null : (
    <section className="main-layout">
      <AddQuote></AddQuote>
      <Quotes isBookmarkPage={false}></Quotes>
    </section>
  );
};

export default Dashboard;

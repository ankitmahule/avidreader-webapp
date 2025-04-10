import "../scss/layout.scss";
import { useSelector } from "react-redux";
const Bookmark = () => {
  const { quotes } = useSelector((state) => state.quotes);
  return <div className="main-layout"></div>;
};

export default Bookmark;

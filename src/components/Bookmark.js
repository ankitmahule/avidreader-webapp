import "../scss/layout.scss";
import Quotes from "./Quotes";
const Bookmark = () => {
  return (
    <div className="main-layout">
      <Quotes isBookmarkPage={true}></Quotes>
    </div>
  );
};

export default Bookmark;

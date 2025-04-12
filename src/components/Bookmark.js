import { useEffect, useState } from "react";
import "../scss/layout.scss";
import Quotes from "./Quotes";
import "../scss/bookmarks.scss";
import { useSelector } from "react-redux";

const Bookmark = () => {
  const { quotes } = useSelector((state) => state.quotes);
  const { userInfo } = useSelector((state) => state.auth);
  const [bookmarkedQuotes, setBookmarkedQuotes] = useState([]);
  useEffect(() => {
    if (quotes?.length > 0) {
      setBookmarkedQuotes(
        quotes.filter((eachQuote) => {
          return eachQuote.bookmarkedBy.includes(userInfo?.id);
        })
      );
    }
  }, [quotes, userInfo]);
  return (
    <div className="main-layout">
      {bookmarkedQuotes?.length > 0 ? (
        <Quotes quotesList={bookmarkedQuotes} isBookmarkPage={true}></Quotes>
      ) : (
        <div className="no-bookmarks-section">
          This spot's waiting for your favorite quotes to move in. Start
          bookmarking!
        </div>
      )}
    </div>
  );
};

export default Bookmark;

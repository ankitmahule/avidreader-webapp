import { useDispatch, useSelector } from "react-redux";
import "../scss/quotes.scss";
import ProfilePic from "./ProfilePic";
import { useEffect, useState } from "react";
import { getQuotes } from "../utils/quotes/quoteActions";
import { resetQuotesState } from "../utils/quotes/quoteSlice";
import { bookmarkQuote } from "../utils/auth/authActions";

const Quotes = () => {
  const { quotes } = useSelector((state) => state.quotes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuotes());
    return () => {
      dispatch(resetQuotesState());
    };
  }, [dispatch]);

  function bookmark(quoteId) {
    if (quoteId) {
      setIsBookmarked(!isBookmarked);
      dispatch(bookmarkQuote({ quoteId, isBookmarked }));
    }
  }
  return !quotes ? null : (
    <>
      {quotes.quotes.map((eachQuote) => {
        return (
          <section key={eachQuote._id} className="cards">
            <div className="flex items-center">
              <ProfilePic />
              {eachQuote?.firstName} {eachQuote?.lastName}
            </div>
            <div className="card-content">
              {eachQuote?.content && <p>{eachQuote?.content}</p>}
              {eachQuote?.contentImage && (
                <img src={eachQuote?.contentImage} alt="content" />
              )}
            </div>
            <div className="card-footer">
              <ul className="flex justify-between cursor-pointer">
                <li>
                  <i className="fa-regular fa-thumbs-up"></i>
                </li>
                <li>
                  <i className="fa-regular fa-comment"></i>
                </li>
                <li onClick={() => bookmark(eachQuote?._id)}>
                  <i className="fa-regular fa-bookmark"></i>
                </li>
              </ul>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Quotes;

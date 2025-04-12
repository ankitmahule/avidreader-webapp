import { useDispatch, useSelector } from "react-redux";
import "../scss/quotes.scss";
import ProfilePic from "./ProfilePic";
import { useEffect, useState } from "react";
import { getQuotes, bookmarkQuote } from "../utils/quotes/quoteActions";
import { resetQuotesState } from "../utils/quotes/quoteSlice";

const Quotes = ({ quotesList, isBookmarkPage }) => {
  // const isBookmarkPage = isBookmarkPage;
  // const { quotes } = useSelector((state) => state.quotes);
  console.log(quotesList);
  const quotes = quotesList;
  const { userInfo } = useSelector((state) => state.auth);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuotes());

    /* if (isBookmarkPage && quotes?.length > 0) {
      quotes.filter((eachQuote) => {
        return eachQuote._id === userInfo?.id;
      });
    } */
    return () => {
      dispatch(resetQuotesState());
    };
  }, [dispatch]);

  function isQuoteBookmarked(quoteId) {
    const quoteDetails = quotes.filter((eachQuote) => {
      return eachQuote?._id === quoteId;
    });

    return quoteDetails[0]?.bookmarkedBy?.includes(userInfo?.id);
  }

  function bookmark(quoteId) {
    if (quoteId) {
      setIsBookmarked(!isBookmarked);
      dispatch(bookmarkQuote({ quoteId }));
    }
  }

  function removeBookmarkFromPage(quoteId) {
    setIsBookmarked(false);
    dispatch(bookmarkQuote({ quoteId }));
  }

  return !quotes ? null : (
    <>
      {quotes.map((eachQuote) => {
        return (
          <section key={eachQuote._id} className="cards">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ProfilePic />
                {eachQuote?.firstName} {eachQuote?.lastName}
              </div>
              <div>
                {isBookmarkPage && (
                  <i
                    className="fa-solid fa-trash cursor-pointer"
                    onClick={() => removeBookmarkFromPage(eachQuote._id)}
                  ></i>
                )}
              </div>
            </div>
            <div className="card-content">
              {eachQuote?.content && <p>{eachQuote?.content}</p>}
              {eachQuote?.contentImage && (
                <img src={eachQuote?.contentImage} alt="content" />
              )}
            </div>

            {!isBookmarkPage && (
              <div className="card-footer">
                <ul className="flex justify-between cursor-pointer">
                  <li>
                    <i className="fa-regular fa-thumbs-up"></i>
                  </li>
                  <li>
                    <i className="fa-regular fa-comment"></i>
                  </li>

                  <li onClick={() => bookmark(eachQuote?._id)}>
                    <i
                      className={`fa-bookmark ${
                        isQuoteBookmarked(eachQuote?._id)
                          ? "fa-solid"
                          : "fa-regular"
                      }`}
                    ></i>
                  </li>
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
};

export default Quotes;

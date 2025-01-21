import { useDispatch, useSelector } from "react-redux";
import "../scss/quotes.scss";
import ProfilePic from "./ProfilePic";
import { useEffect } from "react";
import { getQuotes } from "../utils/quotes/quoteActions";
import { resetQuotesState } from "../utils/quotes/quoteSlice";

const Quotes = ({ id }) => {
  const { quotes } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!quotes) {
      dispatch(getQuotes(id));
    }
    return () => {
      dispatch(resetQuotesState());
    };
  }, [dispatch, quotes, id]);
  return !quotes ? null : (
    <>
      {quotes.quotes.map((eachQuote, index) => {
        return (
          <section key={index} className="cards">
            <div className="flex items-center">
              <ProfilePic />
              {eachQuote.content}
            </div>
            <div className="card-content"></div>
            <div className="card-footer">
              <ul className="flex justify-between cursor-pointer">
                <li>
                  <i className="fa-regular fa-thumbs-up"></i>
                </li>
                <li>
                  <i className="fa-regular fa-comment"></i>
                </li>
                <li>
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

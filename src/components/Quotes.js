import { useDispatch, useSelector } from "react-redux";
import "../scss/quotes.scss";
import ProfilePic from "./ProfilePic";
import { useEffect } from "react";
import { getQuotes } from "../utils/quotes/quoteActions";
import { resetQuotesState } from "../utils/quotes/quoteSlice";
import { resetAuthState } from "../utils/auth/authSlice";
const Quotes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { quotes } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuotes(userInfo.id));
    return () => {
      dispatch(resetQuotesState());
    };
  }, [dispatch, userInfo]);
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
              <ul className="flex space-between">
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

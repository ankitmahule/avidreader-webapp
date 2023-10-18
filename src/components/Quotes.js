import "../scss/quotes.scss";
import ProfilePic from "./ProfilePic";
const Quotes = ({ quotes }) => {
  return !quotes ? null : (
    <>
      {console.log(quotes)}
      {quotes.map((eachQuote, index) => {
        return (
          <section key={index} className="cards">
            <div className="flex items-center">
              <ProfilePic />
              {eachQuote}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Quotes;

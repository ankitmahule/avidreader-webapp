import "../scss/quotes.scss";
const Quotes = ({ quotes }) => {
  return !quotes ? null : (
    <>
      {console.log(quotes)}
      {quotes.map((eachQuote, index) => {
        return (
          <section key={index} className="cards">
            {eachQuote}
          </section>
        );
      })}
    </>
  );
};

export default Quotes;

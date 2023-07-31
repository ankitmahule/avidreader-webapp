import "../scss/body.scss";
import Login from "./Login";
const Body = () => {
  return (
    <main>
      <section className="upper-section">
        <section className="banner flex">
          <section className="container flex justify-evenly items-center">
            <section className="w-1/2 search-container">
              <h1 className="banner-heading">
                Share, Post, Read Quotes and Excerpts &amp; refresh your day...
              </h1>
            </section>
            <section className="w-1/2">
              <Login></Login>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Body;

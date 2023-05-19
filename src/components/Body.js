import "../scss/body.scss";
const Body = () => {
  return (
    <main>
      <section className="upper-section">
        <section className="banner flex">
          <section className="container search-container">
            <h1 className="banner-heading">
              Quotes and Excerpts from Popular Books and People...
            </h1>
            <div className="search-section">
              <input
                type="text"
                placeholder="So, what are your looking for today?"
                className="search-input text-slate-400 mt-12 text-2xl px-6 py-4"
              />
              <button className="bg-white search-button text-2xl p-4">
                <em className="fa fa-search"></em>
              </button>
            </div>
          </section>
        </section>
      </section>
      <section className="content container">
        <section className="h-96 border border-black">section 1</section>
        <section className="h-96 border border-black">section 1</section>
        <section className="h-96 border border-black">section 1</section>
        <section className="h-96 border border-black">section 1</section>
        <section className="h-96 border border-black">section 1</section>
      </section>
    </main>
  );
};

export default Body;

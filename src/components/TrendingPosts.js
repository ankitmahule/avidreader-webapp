import "../scss/trendingposts.scss";
const TrendingPosts = () => {
  return (
    <div className="trending-section">
      <h1>Trending now</h1>
      <section className="trending-posts mb-10">
        <div className="trending-cards flex justify-between">
          <p>User1 posted this quote</p>
          <a className="view-link" href="/">
            View
          </a>
        </div>
        <div className="trending-cards flex justify-between">
          <p>User1 posted this quote</p>
          <a className="view-link" href="/">
            View
          </a>
        </div>
        <div className="trending-cards flex justify-between">
          <p>User1 posted this quote</p>
          <a className="view-link" href="/">
            View
          </a>
        </div>
        <a href="/trending-posts" className="view-more-link">
          View More...
        </a>
      </section>
      <section>
        <h4>Must Read Books</h4>
        <div className="trending-cards">
          <p>Book 1</p>
        </div>
        <div className="trending-cards">
          <p>Book 1</p>
        </div>
        <div className="trending-cards">
          <p>Book 1</p>
        </div>
        <a href="/trending-posts" className="view-more-link">
          View More...
        </a>
      </section>
    </div>
  );
};

export default TrendingPosts;

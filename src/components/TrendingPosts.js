import "../scss/trendingposts.scss";
const TrendingPosts = () => {
  return (
    <div className="trending-section">
      <h1>Trending now</h1>
      <section className="trending-posts mb-10">
        <h4>These posts might interest you</h4>
        <div className="trending-cards"></div>
        <div className="trending-cards"></div>
        <div className="trending-cards"></div>
        <div className="trending-cards"></div>
        <a href="/trending-posts">View More...</a>
      </section>
      <section>
        <h4>Must Read Books</h4>
        <div className="trending-cards"></div>
        <div className="trending-cards"></div>
        <div className="trending-cards"></div>
        <div className="trending-cards"></div>
        <div className="trending-cards"></div>
        <a href="/trending-posts">View More...</a>
      </section>
    </div>
  );
};

export default TrendingPosts;

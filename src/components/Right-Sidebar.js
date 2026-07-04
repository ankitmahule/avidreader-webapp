import "../scss/layout.scss";
import TrendingPosts from "./TrendingPosts";
const RightSidebar = () => {
  return (
    <div className="aside-right">
      <TrendingPosts></TrendingPosts>
    </div>
  );
};

export default RightSidebar;

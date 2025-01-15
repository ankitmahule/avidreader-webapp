import { useSelector } from "react-redux";
import "../scss/layout.scss";
const Profile = () => {
  const { loading, error, userInfo } = useSelector((state) => state.auth);
  return userInfo && <div className="main-layout">{userInfo.email}</div>;
};

export default Profile;

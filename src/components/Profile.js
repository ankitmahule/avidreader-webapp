import { useSelector } from "react-redux";
import "../scss/layout.scss";
import "../scss/profile.scss";
import ProfilePic from "./ProfilePic";
const Profile = () => {
  const { loading, error, userInfo } = useSelector((state) => state.auth);
  return (
    <section className="main-layout">
      <div className="profile-container">
        <div className="pic">
          <ProfilePic />
        </div>
        <p className="font-bold text-2xl">
          {userInfo?.firstName} {userInfo?.lastName}
        </p>
        <p className="bio-section">
          You don't have any bio, <button className="btn">Add Bio</button>
        </p>
      </div>
    </section>
  );
};

export default Profile;

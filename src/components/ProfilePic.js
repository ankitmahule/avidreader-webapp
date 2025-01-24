import React from "react";
import "../scss/profile-pic.scss";
import { useSelector } from "react-redux";
function ProfilePic() {
  const { loading, error, userInfo } = useSelector((state) => state.auth);
  return userInfo && <div className="avatar">
    <img src={userInfo?.photoUrl} alt="" />
  </div>;
}

export default ProfilePic;

"use client";
import React from "react";
import "../scss/profile-pic.scss";
import { useSelector } from "react-redux";
import Image from "next/image";
function ProfilePic() {
  const { loading, error, userInfo } = useSelector((state) => state.auth);
  return (
    userInfo?.photoUrl && (
      <div className="avatar">
        <Image
          src={userInfo.photoUrl}
          alt={`${userInfo.firstName ?? "User"} profile`}
          width={40}
          height={40}
        />
      </div>
    )
  );
}

export default ProfilePic;

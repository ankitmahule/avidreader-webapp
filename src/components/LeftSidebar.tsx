"use client";
import Link from "next/link";
import HomeLogo from "../../public/images/home.svg";
import "../scss/layout.scss";
import ProfilePic from "./ProfilePic";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../utils/store";
import { useEffect, useState } from "react";
import { logout, viewProfile } from "../utils/auth/authActions";
import { resetAuthState } from "../utils/auth/authSlice";
import Image from "next/image";

const LeftSidebar = (userInfo) => {
  const [logoutSection, setLogoutSection] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  function logoutUser() {
    dispatch(logout());
  }
  useEffect(() => {
    dispatch(viewProfile());
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  function toggleLogoutSection(logoutSection) {
    setLogoutSection(logoutSection);
  }

  return !userInfo ? null : (
    <aside className="aside">
      <div className="my-4 dashboard-logo">
        <Link href="/dashboard">
          <Image
            src={HomeLogo}
            alt="Avid Reader"
            width={200}
            height={49}
            priority
          />
        </Link>
      </div>
      <ul className="dashboard-menu">
        <li>
          <Link href="/dashboard">
            <p className="fa fa-home mr-2"></p>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/notifications">
            <p className="fa fa-bell mr-2"></p>
            <p>Notifications</p>
          </Link>
        </li>
        <li>
          <Link href="/explore">
            <p className="fa fa-search mr-2"></p>
            <p>Explore</p>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <p className="fa fa-cog mr-2"></p>
            <p>Settings</p>
          </Link>
        </li>
        <li>
          <Link href="/bookmarks">
            <p className="fa fa-bookmark mr-2"></p>
            <p>Bookmarks</p>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <p className="fa fa-user mr-2"></p>
            <p>Profile</p>
          </Link>
        </li>
      </ul>
      <div className="profile-section">
        <div
          className="profile-data"
          onClick={() => toggleLogoutSection(!logoutSection)}
        >
          <ProfilePic />

          <p className="email-text">
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
        </div>
        {logoutSection && (
          <div className="logout-section">
            <p onClick={() => logoutUser()}>Logout</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;

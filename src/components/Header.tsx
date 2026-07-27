"use client";
import Link from "next/link";
import "../scss/header.scss";
import { usePathname } from "next/navigation";
import LeftSidebar from "./LeftSidebar";
import HomeLogo from "../../public/images/home.svg";
import { useSelector } from "react-redux";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const { userInfo } = useSelector((state) => state.auth);

  return pathname === "/" ? (
    <header className="header-transparent">
      <nav className="container">
        <Link href="/" className="my-4 w-2/12">
          <Image
            src={HomeLogo}
            alt="Avid Reader"
            width={200}
            height={49}
            priority
          />
        </Link>

        <div className="right">
          <ul>
            {!userInfo && (
              <li>
                <Link href="/about">About us</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  ) : (
    <LeftSidebar {...userInfo} />
  );
};

export default Header;

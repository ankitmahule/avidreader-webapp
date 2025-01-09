import { useState } from "react";
import "../scss/body.scss";
import Login from "./Login";
import Register from "./Register";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const [toggleLoginRegister, setToggleLoginRegister] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  function toggleView(toggleFlag) {
    setToggleLoginRegister(toggleFlag);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  });

  return (
    <main>
      <section className="upper-section">
        <section className="banner flex">
          <section className="container flex justify-evenly items-center">
            <section className="w-1/2 search-container">
              <h1 className="banner-heading">
                Share, Post, Read Quotes and Excerpts &amp; Refresh Your Day...
              </h1>
            </section>
            <section className="w-1/2">
              {!toggleLoginRegister ? (
                <Login toggleLoginRegisterView={toggleView}></Login>
              ) : (
                <Register toggleLoginRegisterView={toggleView}></Register>
              )}
            </section>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Body;

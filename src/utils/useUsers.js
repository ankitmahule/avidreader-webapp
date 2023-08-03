import { useState } from "react";
import { LOGIN_API, REGISTER_API } from "../shared/constants";
const useUsers = () => {
  const [userResponse, setuserResponse] = useState([]);
  async function submitRequest(reqUser) {
    const response = await fetch(REGISTER_API, {
      method: "POST",
      body: JSON.stringify(reqUser),
      headers: { "content-type": "application/json" },
    });

    const json = await response.json();
    setuserResponse(json);
  }

  async function submitLoginRequest(userDetails) {
    const response = await fetch(LOGIN_API, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "content-type": "application/json" },
    });

    const json = await response.json();
    setuserResponse(json);
  }

  return { userResponse, submitRequest, submitLoginRequest };
};

export default useUsers;

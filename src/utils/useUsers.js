import { useState } from "react";
import { REGISTER_API } from "../shared/constants";
const useUsers = () => {
  const [userRegResponse, setUserRegResponse] = useState([]);

  async function submitRequest(reqUser) {
    const response = await fetch(REGISTER_API, {
      method: "POST",
      body: JSON.stringify(reqUser),
      headers: { "content-type": "application/json" },
    });

    const json = await response.json();
    setUserRegResponse(json);
  }

  return { userRegResponse, submitRequest };
};

export default useUsers;

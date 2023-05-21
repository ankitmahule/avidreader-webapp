import { useEffect, useState } from "react";
import { USERS_API } from "../shared/constants";
const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const response = await fetch(USERS_API);
    const json = await response.json();
    console.table(json);
    setUsers(json);
  }

  return users;
};

export default useUsers;

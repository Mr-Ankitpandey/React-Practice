import { useState } from "react";
import Filter from "../components/Filter";
import User from "../components/User";
import type { userType } from "../Types/userType";

const StatePage = () => {
  const [userData, setUserData] = useState<userType[]>([]);

  const getUserData = (user: userType, isUpdate = false) => {
    if (isUpdate) {
      setUserData((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u)),
      );
    } else {
      setUserData((prevUsers) => [
        ...prevUsers,
        {
          id: Number(new Date()),
          name: user.name.trim(),
          city: user.city.trim(),
          age: user.age,
        },
      ]);
    }
  };

  console.log(userData);

  return (
    <>
      <h1>State Page</h1>
      <User
        passUserData={getUserData}
        userData={userData}
        setUserData = {setUserData}
      />
      <Filter userData={userData} />
    </>
  );
};

export default StatePage;

import { useState } from "react";
import Filter from "../components/Filter";
import User from "../components/User";
import type { userType } from "../Types/userType";
import Table from "../components/Table";

const StatePage = () => {
  const [userData, setUserData] = useState<userType[]>([]);

  const getUserData = (user: userType) => {
    setUserData((prevUser) => [
      ...prevUser,
      {
        id: Number(new Date()),
        name: user?.name?.trim(),
        city: user?.city?.trim(),
        age: user?.age,
      }
    ]);
  };
  console.log(userData);

  return (
    <>
      <h1>State Page</h1>
      <User passUserData={getUserData} userData = {userData}/>
      <Filter userData={userData} />
      <Table userData={userData} />
    </>
  );
};

export default StatePage;

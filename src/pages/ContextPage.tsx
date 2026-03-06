import { useContext } from "react";
import { UserContextProvider } from "../context/UserContextProvider";
import { UserContext } from "../context/context";
import User from "../components/User";
import Filter from "../components/Filter";

const ContextPageInner = () => {
  const { userData, addUser, updateUser, deleteUser, filterUser, allUser, appliedFilter } =
    useContext(UserContext);

  return (
    <>
      <h1>Context Page</h1>
      <User
        userData={userData}
        onAdd={addUser}
        onUpdate={updateUser}
        onDelete={deleteUser}
      />
      <Filter
        userData={userData}
        appliedFilter={appliedFilter}
        onFilter={filterUser}
        onAll={allUser}
      />
    </>
  );
};

const ContextPage = () => {
  return (
    <UserContextProvider>
      <ContextPageInner />
    </UserContextProvider>
  );
};

export default ContextPage;

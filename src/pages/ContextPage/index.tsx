import { useContext, useMemo } from "react";
import { UserContextProvider } from "../../context/UserContextProvider";
import { UserContext } from "../../context/context";
import User from "../../components/User";
import Filter from "../../components/Filter";
import Table from "../../components/ui/Table";
import { displayDataHelper } from "../../utils/displayDataHelper";

const userTableColumns = [
  { key: "name", label: "Name" },
  { key: "city", label: "City" },
  { key: "age", label: "Age" },
];

const ContextPageInner = () => {
  const {
    userData,
    addUser,
    updateUser,
    deleteUser,
    filterUser,
    allUser,
    appliedFilter,
  } = useContext(UserContext);

  const displayData = useMemo(() => {
    return displayDataHelper({ appliedFilter, userData });
  }, [userData, appliedFilter]);

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
      <Table columns={userTableColumns} data={displayData} />
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

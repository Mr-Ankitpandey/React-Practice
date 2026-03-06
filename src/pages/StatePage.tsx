import { useState } from "react";
import Filter from "../components/Filter";
import User from "../components/User";
import type { SelectFieldOptions, userType } from "../Types/userType";
import { createStateHandlers } from "../utils/userStateHandlers";

const StatePage = () => {
  const [userData, setUserData] = useState<userType[]>([]);
  const [appliedFilter, setAppliedFilter] = useState<{
    field: SelectFieldOptions;
    value: string;
  } | null>(null);

  const { handleAdd, handleUpdate, handleDelete, handleFilter, handleAll } =
    createStateHandlers(setUserData, setAppliedFilter);

  return (
    <>
      <h1>State Page</h1>
      <User
        userData={userData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <Filter
        userData={userData}
        appliedFilter={appliedFilter}
        onFilter={handleFilter}
        onAll={handleAll}
      />
    </>
  );
};

export default StatePage;

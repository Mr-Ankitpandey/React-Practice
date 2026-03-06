import { useMemo, useState } from "react";
import Filter from "../../components/Filter";
import User from "../../components/User";
import type { SelectFieldOptions, userType } from "../../Types/userType";
import { StateHandlers } from "../../utils/userStateHandlers";
import { displayDataHelper } from "../../utils/displayDataHelper";
import Table from "../../components/ui/Table";

const userTableColumns = [
  { key: "name", label: "Name" },
  { key: "city", label: "City" },
  { key: "age", label: "Age" },
];


const StatePage = () => {
  const [userData, setUserData] = useState<userType[]>([]);
  const [appliedFilter, setAppliedFilter] = useState<{
    field: SelectFieldOptions;
    value: string;
  } | null>(null);

   const displayData = useMemo(() => {
    return displayDataHelper({ appliedFilter, userData });
  }, [userData, appliedFilter]);

  const { handleAdd, handleUpdate, handleDelete, handleFilter, handleAll } =
    StateHandlers(setUserData, setAppliedFilter);


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
      <Table columns={userTableColumns} data={displayData} />
    </>
  );
};

export default StatePage;

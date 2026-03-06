import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import type { RootState } from "../../redux/store";
import {
  addUser,
  updateUser,
  deleteUser,
  filterUser,
  allUser,
} from "../../redux/userSlice";
import User from "../../components/User";
import Filter from "../../components/Filter";
import type { SelectFieldOptions, userType } from "../../Types/userType";
import Table from "../../components/ui/Table";
import { useMemo } from "react";
import { displayDataHelper } from "../../utils/displayDataHelper";

const userTableColumns = [
  { key: "name", label: "Name" },
  { key: "city", label: "City" },
  { key: "age", label: "Age" },
];

const ReduxPageInner = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user?.userData);
  const appliedFilter = useSelector(
    (state: RootState) => state.user?.appliedFilter,
  );

  const handleAdd = (user: userType) => {
    dispatch(addUser({ name: user?.name, city: user?.city, age: user?.age }));
  };

  const handleUpdate = (user: userType) => {
    dispatch(updateUser(user));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleFilter = ({
    selectedField,
    selectedValue,
  }: {
    selectedField: SelectFieldOptions;
    selectedValue: string;
  }) => {
    dispatch(filterUser({ selectedField, selectedValue }));
  };

  const handleAll = () => {
    dispatch(allUser());
  };

  const displayData = useMemo(() => {
    return displayDataHelper({ appliedFilter, userData });
  }, [userData, appliedFilter]);

  return (
    <>
      <h1>Redux Page</h1>
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

const ReduxPage = () => {
  return (
    <Provider store={store}>
      <ReduxPageInner />
    </Provider>
  );
};

export default ReduxPage;

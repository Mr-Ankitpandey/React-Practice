import {useState } from "react";
import type { filters, SelectFieldOptions, UserContextType, userType } from "../Types/userType";
import { UserContext } from "./context";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<userType[]>([]);
   const [appliedFilter, setAppliedFilter] = useState<{
    field: SelectFieldOptions;
    value: string;
  } | null>(null);

  const addUser = (user:userType) => {
    setUserData((prev) => [
      ...prev,
      {
        id: user?.id,
        name: user?.name.trim(),
        city: user?.city.trim(),
        age: Number(user?.age),
      },
    ]);
  };

  const updateUser = (updatedUser: userType) => {
    setUserData((prevUsers) => prevUsers?.map((u) => (u.id === updatedUser?.id ? updatedUser : u)));
  };

  const deleteUser = (selectedId: number) => {
    setUserData((prevUsers) => prevUsers?.filter((user) => user?.id !== selectedId));
  };

  const filterUser  = (chosenfilter : filters | null) => {
    if(chosenfilter=== null || chosenfilter?.selectedField === null){
      setAppliedFilter(null)
      return;
    }
    setAppliedFilter({
      field: chosenfilter?.selectedField,
      value: chosenfilter?.selectedValue,
    });
  }
  const allUser = ()=> {
    setAppliedFilter(null)
  }

  const ctxValue: UserContextType = {
    userData,
    addUser,
    updateUser,
    deleteUser,
    filterUser,
    allUser,
    appliedFilter
  }

  return (
    <UserContext.Provider value={ctxValue}>
      {children}
    </UserContext.Provider>
  );
};

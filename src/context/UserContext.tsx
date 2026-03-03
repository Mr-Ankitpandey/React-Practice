import { createContext, useState } from "react";
import type { userType } from "../Types/userType";

interface UserContextType {
  userData: userType[];
  addUser: (user: userType) => void;
  updateUser: (user: userType) => void;
  deleteUser: (id: number) => void;
}

export const UserContext = createContext<UserContextType>({
  userData : [],
  addUser : ()=> {},
  updateUser : ()=> {},
  deleteUser : ()=> {}
})
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<userType[]>([]);

  const addUser = (user:userType) => {
    setUserData((prev) => [
      ...prev,
      {
        id: Number(new Date()),
        name: user?.name.trim(),
        city: user?.city.trim(),
        age: Number(user?.age),
      },
    ]);
  };

  const updateUser = (updatedUser: userType) => {
    setUserData((prevUsers) => prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const deleteUser = (selectedId: number) => {
    setUserData((prevUsers) => prevUsers?.filter((user) => user?.id !== selectedId));
  };

  const showAllUsers  = () => {
    
  }

  const ctxValue = {
    userData,
    addUser,
    updateUser,
    deleteUser,
    showAllUsers
  }

  return (
    <UserContext.Provider value={ctxValue}>
      {children}
    </UserContext.Provider>
  );
};

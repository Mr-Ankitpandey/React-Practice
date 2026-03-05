import { createContext } from "react";
import type { UserContextType } from "../Types/userType";

export const UserContext = createContext<UserContextType>({
  userData : [],
  addUser : ()=> {},
  updateUser : ()=> {},
  deleteUser : ()=> {},
  filterUser : ()=> {},
  allUser : ()=> {},
  appliedFilter : null,
})
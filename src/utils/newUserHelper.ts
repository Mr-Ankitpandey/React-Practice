import type { userType } from "../Types/userType";

export const newUser = (fd:FormData) => {
  const user: userType = {
    id: Number(new Date()),
    name: fd.get("name") as string,
    city: fd.get("city") as string,
    age: fd.get("age") as string,
  };

  return user;
};

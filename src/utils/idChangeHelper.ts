import type { userType } from "../Types/userType";

type idChangeHelperType = {
  e: React.ChangeEvent<HTMLSelectElement>;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      city: string;
      age: string;
    }>
  >;
  userData: userType[];
};

export const idChangeHelper = ({
  e,
  setSelectedId,
  setFormData,
  userData,
}: idChangeHelperType) => {
  const value = e.target?.value;
  if (!value) {
    setSelectedId(null);
    setFormData({ name: "", city: "", age: "" });
    return;
  }
  const id = Number(value);
  setSelectedId(id);
  const selectedUser = userData?.find((user) => user?.id === id);
  if (selectedUser) {
    setFormData({
      name: selectedUser?.name,
      city: selectedUser?.city,
      age: String(selectedUser?.age),
    });
  }
};
export interface userType {
  id: number,
  name: string,
  age: string | number,
  city: string,
  [key: string]: unknown,
}

export type SelectFieldOptions = "Name" | "Age" | "City";

export interface filters {
  selectedField: SelectFieldOptions | null,
  selectedValue: string
}

export interface UserContextType {
  userData: userType[];
  addUser: (user: userType) => void;
  updateUser: (user: userType) => void;
  deleteUser: (id: number) => void;
  filterUser: (obj: filters | null) => void;
  allUser: () => void;
  appliedFilter: {
    field: SelectFieldOptions;
    value: string;
  } | null
}

export type reducerStateType = {
  userData: userType[],
  appliedFilter: {
    field: SelectFieldOptions;
    value: string;
  } | null
}

export type reducerActionType =
  | { type: "addUser"; user: userType }
  | { type: "updateUser"; updatedUser: userType }
  | { type: "deleteUser"; selectedId: number }
  | { type: "filterUser"; chosenfilter: filters | null }
  | { type: "allUser" };
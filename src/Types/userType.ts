export interface userType {
    id: number,
    name: string,
    age: string | number,
    city: string
}

export type SelectFieldOptions = "Name" | "Age" | "City";

export interface filters  {
  selectedField : SelectFieldOptions | null,
  selectedValue : string
}

export interface UserContextType {
  userData: userType[];
  addUser: (user: userType) => void;
  updateUser: (user: userType) => void;
  deleteUser: (id: number) => void;
  filterUser : (obj: filters | null) => void;
  allUser : ()=>void;
  appliedFilter : {
    field: SelectFieldOptions;
    value: string;
  } | null
}
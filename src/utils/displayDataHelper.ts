import type { SelectFieldOptions, userType } from "../Types/userType";

const fieldMap = {
  Name: "name",
  Age: "age",
  City: "city",
} as const;

type displayDataHelperType = {
    appliedFilter : {
    field: SelectFieldOptions;
    value: string;
} | null,
userData : userType[]
}

export const displayDataHelper = ({appliedFilter, userData} : displayDataHelperType)=> {
    if (!appliedFilter) return userData;
    const key = fieldMap[appliedFilter?.field];
    const filterVal =
      key === "age" ? Number(appliedFilter?.value) : appliedFilter?.value;

    return userData?.filter((user) => {
      return typeof user[key] === "string" && typeof filterVal === "string"
        ? user[key]?.toLowerCase() === filterVal?.toLowerCase()
        : user[key] === filterVal;
    });
}
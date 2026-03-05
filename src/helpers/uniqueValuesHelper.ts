import type { SelectFieldOptions, userType } from "../Types/userType";

type uniqueValuesHelperType = {
    selectedField : SelectFieldOptions | null,
    userData : userType[]
}

const fieldMap = {
  Name: "name",
  Age: "age",
  City: "city",
} as const;

export const uniqueValuesHelper = ({selectedField, userData}:uniqueValuesHelperType)=> {
    if (!selectedField) return [];
    const key = fieldMap[selectedField];
    const values = userData?.map((user) => user[key]);
    const lowerCaseValues = values?.map((value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        return value?.toLowerCase();
      }
    });

    return [...new Set(lowerCaseValues)];
}
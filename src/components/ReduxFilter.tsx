import { useDispatch, useSelector } from "react-redux";
import type { SelectFieldOptions } from "../Types/userType";
import { useMemo, useState } from "react";
import Table from "./Table";
import { filterUser } from "../redux/userSlice";

const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];

const fieldMap = {
  Name: "name",
  Age: "age",
  City: "city",
} as const;

const ReduxFilter = () => {
  const [selectedField, setSelectedField] = useState<SelectFieldOptions | null>(
    null,
  );
  const [selectedValue, setSelectedValue] = useState<string>("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const appliedFilter = useSelector((state) => state.user.appliedFilter);
  

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "select-field") {
      setSelectedField(null);
    } else {
      setSelectedField(value as SelectFieldOptions);
    }
    setSelectedValue("");
  };

  const handleUniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const uniqueValues = useMemo((): (string | number | undefined)[] => {
    if (!selectedField) return [];
    const key = fieldMap[selectedField];
    const values = userData.map((user) => user[key]);
    const lowerCaseValues = values.map((value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        return value.toLowerCase();
      }
    });

    return [...new Set(lowerCaseValues)];
  }, [selectedField, userData]);

  const displayData = useMemo(() => {
    if (!appliedFilter) return userData;

    const key = fieldMap[appliedFilter.field];
    const filterVal =
      key === "age" ? Number(appliedFilter.value) : appliedFilter.value;

    return userData.filter((user) => user[key] === filterVal);
  }, [userData, appliedFilter]);

  const handleFilter = () => {
    if (!selectedField || !selectedValue) {
      alert("Please select both a field and value.");
      return;
    }
    dispatch(filterUser({ selectedField, selectedValue }));
  };

  const handleAll = () => {
    dispatch(filterUser(null));
    setSelectedField(null);
    setSelectedValue("");
  };
  return (
    <>
      <h1>Filters</h1>
      <label htmlFor="select-field">Select Field : </label>
      <select
        id="select-field"
        value={selectedField ?? "select-field"}
        onChange={handleFieldChange}
      >
        <option value="select-field">Select Field</option>
        {selectFieldOptions.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <br /> <br />
      <label htmlFor="select-unique">Unique Values : </label>
      <select
        id="select-unique"
        value={selectedValue}
        onChange={handleUniqueChange}
      >
        <option value="">Select Value</option>
        {uniqueValues?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <br /> <br />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleAll}>All</button>
      <hr />
      <Table userData={displayData} />
    </>
  );
};

export default ReduxFilter;
